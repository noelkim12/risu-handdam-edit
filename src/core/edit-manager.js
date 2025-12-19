/**
 * 편집 관리자
 * 편집 기능의 핵심 로직을 관리합니다.
 */

import { RisuAPI } from "./risu-api.js";
import { findOriginalRangeFromHtml } from "../utils/text-matcher.js";
import { TextSelectionHandler } from "./text-selection-handler.js";
import { ElementEditHandler } from "./element-edit-handler.js";
import { PluginArgs } from "./plugin-config.js";
import { editStyles } from "../ui/styles/index.js";
import { DEL_IMG_LEFT, DEL_IMG_RIGHT } from "../ui/components/img/del-img-components.js";

export class EditManager {
  constructor() {
    this.risuAPI = RisuAPI.getInstance();
    this.pluginArgs = new PluginArgs();
    this.textSelectionHandler = new TextSelectionHandler(this);
    this.elementEditHandler = new ElementEditHandler(this);
    this.editMode = "selection"; // 기본값: "selection"
    this.buttonPosition = "top"; // 기본값: "top"
    this.floatingButton = null;
    this.selectionModal = null;
    this.currentSelectionRange = null; // 현재 선택된 텍스트 범위
    this.currentMatches = null; // 현재 매칭된 모든 결과
    this.currentSelectedText = null; // 현재 선택된 텍스트
    this._scrollHandler = null;
    this._clickHandler = null;
    this._modeChangeCallbacks = []; // 모드 변경 콜백 함수들
    this._buttonPositionChangeCallbacks = []; // 버튼 위치 변경 콜백 함수들
    this._ignoreClickUntil = 0; // 더블클릭 후 클릭 이벤트 무시할 시간
    this.isMobileDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Anchoring: 수정 후 스크롤 위치 복원을 위한 정보
    this._anchorInfo = {
      chatIndex: null,
      scrollTop: null,
      scrollContainer: null,
      headText: null,
      tailText: null,
    };
  }

  // ==================== 초기화 ====================

  /**
   * 편집 모드 초기화
   */
  initialize() {
    const savedMode = this.pluginArgs.editMode || "selection";
    this.setEditMode(savedMode, false);

    const savedPosition = this.pluginArgs.buttonPosition || "top";
    this.setButtonPosition(savedPosition, false);
  }

  // ==================== 모드 관리 ====================

  /**
   * 편집 모드 설정
   */
  setEditMode(mode, save = true) {
    if (mode !== "element" && mode !== "selection") {
      console.warn(`[EditManager] 잘못된 편집 모드: ${mode}`);
      return;
    }

    // 이전 모드 비활성화
    if (this.editMode === "element") {
      this.elementEditHandler.disable();
    } else {
      this.textSelectionHandler.disable();
    }

    // 새 모드 활성화
    this.editMode = mode;

    if (mode === "element") {
      this.elementEditHandler.enable();
      console.log("[EditManager] 편집 모드: 요소 기반 모드");
    } else {
      this.textSelectionHandler.enable();
      console.log("[EditManager] 편집 모드: 텍스트 선택 모드");
    }

    if (save) {
      this.pluginArgs.editMode = mode;
    }

    this._invokeCallbacks(this._modeChangeCallbacks, mode);
  }

  toggleEditMode() {
    const newMode = this.editMode === "element" ? "selection" : "element";
    this.setEditMode(newMode, true);
  }

  getEditMode() {
    return this.editMode;
  }

  onModeChange(callback) {
    this._addCallback(this._modeChangeCallbacks, callback);
  }

  offModeChange(callback) {
    this._removeCallback(this._modeChangeCallbacks, callback);
  }

  // ==================== 버튼 위치 관리 ====================

  /**
   * 버튼 위치 설정
   */
  setButtonPosition(position, save = true) {
    if (position !== "top" && position !== "bottom") {
      console.warn(`[EditManager] 잘못된 버튼 위치: ${position}`);
      return;
    }

    this.buttonPosition = position;
    console.log(`[EditManager] 버튼 위치: ${position === "top" ? "상단" : "하단"}`);

    if (save) {
      this.pluginArgs.buttonPosition = position;
    }

    this._invokeCallbacks(this._buttonPositionChangeCallbacks, position);
  }

  toggleButtonPosition() {
    const newPosition = this.buttonPosition === "top" ? "bottom" : "top";
    this.setButtonPosition(newPosition, true);
  }

  getButtonPosition() {
    return this.buttonPosition;
  }

  onButtonPositionChange(callback) {
    this._addCallback(this._buttonPositionChangeCallbacks, callback);
  }

  offButtonPositionChange(callback) {
    this._removeCallback(this._buttonPositionChangeCallbacks, callback);
  }

  // ==================== 편집 시작 ====================

  /**
   * 텍스트 선택으로부터 편집 시작
   */
  startEditFromSelection(match, position, selectionRange = null, allMatches = null, selectedText = null) {
    this.currentSelectionRange = selectionRange;
    this.currentMatches = allMatches;
    this.currentSelectedText = selectedText;
    this._ignoreClickUntil = Date.now() + 300;

    this.showFloatingButton(position, () => {
      this._clearSelection();

      if (match) {
        this.openEditDialog(match);
      } else if (allMatches && allMatches.length > 1) {
        this.showSelectionModal(allMatches, selectedText, position);
      }
    });
  }

  // ==================== Floating Action Button ====================

  /**
   * Floating Action Button 표시
   */
  showFloatingButton(position, onClick) {
    this.hideFloatingButton();

    const s = editStyles;
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
      position: absolute;
      display: flex;
      gap: 8px;
      z-index: 10000;
      align-items: center;
      pointer-events: auto;
    `;

    const editButton = this._createButton("편집", "✏️", "edit");
    const deleteButton = this._createButton("삭제", "🗑️", "delete");

    const buttonWidth = 80;
    const buttonHeight = 32;
    const gap = 8;
    const containerWidth = buttonWidth * 2 + gap;

    const { top, left } = this._calculateButtonPosition(position, buttonHeight, containerWidth);
    buttonContainer.style.top = `${top}px`;
    buttonContainer.style.left = `${left}px`;
    buttonContainer.style.width = `${containerWidth}px`;

    const buttonStyle = `
      position: relative !important;
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      flex-shrink: 0;
      box-sizing: border-box;
    `;
    editButton.style.cssText = buttonStyle;
    deleteButton.style.cssText = buttonStyle;

    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
      this.hideFloatingButton();
    });

    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleDeleteClick();
      this.hideFloatingButton();
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    document.body.appendChild(buttonContainer);
    this.floatingButton = buttonContainer;

    this._attachFloatingButtonHandlers(buttonContainer);
  }

  hideFloatingButton() {
    if (this.floatingButton) {
      // 모든 이벤트 핸들러 제거
      if (this._selectionStartHandler) {
        document.removeEventListener("selectstart", this._selectionStartHandler);
        this._selectionStartHandler = null;
      }
      if (this._selectionChangeHandler) {
        document.removeEventListener("selectionchange", this._selectionChangeHandler);
        this._selectionChangeHandler = null;
      }
      if (this._selectionEndHandler) {
        document.removeEventListener("mouseup", this._selectionEndHandler);
        document.removeEventListener("touchend", this._selectionEndHandler);
        document.removeEventListener("pointerup", this._selectionEndHandler);
        this._selectionEndHandler = null;
      }
      if (this._clickHandler) {
        document.removeEventListener("click", this._clickHandler);
        this._clickHandler = null;
      }
      if (this._blurHandler) {
        window.removeEventListener("blur", this._blurHandler);
        this._blurHandler = null;
      }
      if (this._visibilityChangeHandler) {
        document.removeEventListener("visibilitychange", this._visibilityChangeHandler);
        this._visibilityChangeHandler = null;
      }

      document.body.removeChild(this.floatingButton);
      this.floatingButton = null;
    }
  }

  // ==================== 선택 모달 ====================

  /**
   * 여러 매칭 결과 선택 모달 표시
   */
  showSelectionModal(matches, selectedText, position) {
    this.hideFloatingButton();

    const char = this.risuAPI.getChar();
    const messages = this._getCharMessages();
    const messageData = messages && matches.length > 0 ? messages[matches[0].chatIndex]?.data || "" : "";

    if (this.selectionModal) {
      this.selectionModal.show(matches, selectedText, (selectedMatch) => {
        this.openEditDialog(selectedMatch);
      });
    } else {
      this._showModal(matches, selectedText, messageData, "편집할", "select", (selectedMatch) => {
        this.openEditDialog(selectedMatch);
      });
    }
  }

  /**
   * 삭제 선택 모달 표시
   */
  showDeleteSelectionModal(matches, selectedText) {
    const messages = this._getCharMessages();
    const messageData = messages && matches.length > 0 ? messages[matches[0].chatIndex]?.data || "" : "";

    this._showModal(matches, selectedText, messageData, "삭제할", "delete", (selectedMatch) => {
      setTimeout(() => {
        this.deleteMatch(selectedMatch);
      }, 100);
    });
  }

  // ==================== 편집 다이얼로그 ====================

  /**
   * 편집 다이얼로그 열기
   */
  openEditDialog(match) {
    const messages = this._getCharMessages();
    if (!messages || !messages[match.chatIndex]) {
      return;
    }

    const messageData = messages[match.chatIndex].data;
    const selectedText = messageData.slice(match.start, match.end);
    const s = editStyles;

    const { width, height, textareaHeight } = this._calculateDialogDimensions(selectedText);

    const dialog = document.createElement("div");
    const dialogClasses = this.isMobileDevice
      ? `${s.editDialog} ${s.editDialogMobile}`
      : s.editDialog;
    dialog.className = dialogClasses;
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");

    // 모바일이 아닐 때만 크기 스타일 적용
    if (!this.isMobileDevice) {
      dialog.style.width = `${width.calculated}px`;
      dialog.style.minWidth = `${width.min}px`;
      dialog.style.maxWidth = `${width.max}px`;
      dialog.style.height = `${height.calculated}px`;
      dialog.style.maxHeight = `${height.max}px`;
    }

    const textareaClasses = this.isMobileDevice
      ? `${s.editDialogTextarea} ${s.editDialogTextareaMobile}`
      : s.editDialogTextarea;
    const textareaStyleAttr = this.isMobileDevice
      ? ''
      : `style="min-height: ${textareaHeight.min}px; height: ${textareaHeight.calculated}px; max-height: ${textareaHeight.max}px;"`;
    const buttonsClasses = this.isMobileDevice
      ? `${s.editDialogButtons} ${s.editDialogButtonsMobile}`
      : s.editDialogButtons;

    dialog.innerHTML = `
      <textarea class="${textareaClasses}" data-action="textarea" ${textareaStyleAttr}>${this.escapeHtml(selectedText)}</textarea>
      <div class="${buttonsClasses}">
        <button class="${s.editDialogButton} ${s.editDialogCancelButton}" data-action="cancel">취소</button>
        <button class="${s.editDialogButton} ${s.editDialogSaveButton}" data-action="save">저장</button>
      </div>
    `;

    document.body.appendChild(dialog);
    this._attachEditDialogListeners(dialog, match, selectedText);

    const textarea = dialog.querySelector('[data-action="textarea"]');
    if (textarea) {
      textarea.focus();
      textarea.select();
      this._attachTextareaScrollHandler(textarea);

      // 모바일에서 키보드 표시 감지 및 높이 조정
      if (this.isMobileDevice) {
        this._attachKeyboardResizeHandler(dialog);
      }
    }
  }

  /**
   * 편집 저장
   */
  saveEdit(match, originalText, newText) {
    if (originalText === newText) {
      return;
    }

    try {
      // Anchor 캡처: 저장 전에 현재 위치 정보 저장
      this._captureAnchor(match, originalText);

      const char = this.risuAPI.getChar();
      const chatPage = char.chatPage || 0;
      const messages = char.chats[chatPage].message;
      const messageData = messages[match.chatIndex].data;

      const updated =
        messageData.slice(0, match.start) +
        newText +
        messageData.slice(match.end);

      messages[match.chatIndex].data = updated;
      this.risuAPI.setChar(char);

      // 정규식 적용 완료 후 스크롤 위치 복원
      this._scheduleAnchorRestoration();
    } catch (error) {
      console.error("[EditManager] Error saving edit:", error);
      alert("편집 저장 중 오류가 발생했습니다.");
    }
  }

  // ==================== 삭제 ====================

  /**
   * 삭제 버튼 클릭 핸들러
   */
  handleDeleteClick() {
    if (!this.currentMatches || this.currentMatches.length === 0) {
      return;
    }

    if (this.currentMatches.length === 1) {
      this.deleteMatch(this.currentMatches[0]);
    } else {
      this.showDeleteSelectionModal(this.currentMatches, this.currentSelectedText);
    }
  }

  /**
   * 매칭 항목 삭제
   */
  async deleteMatch(match) {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const messages = this._getCharMessages();
        if (!messages || !messages[match.chatIndex]) {
          return;
        }
  
        const messageData = messages[match.chatIndex].data;
        const updated = messageData.slice(0, match.start) + messageData.slice(match.end);
  
        const targetElement = this.findElementByMatch(match);
        await this.performDeleteAnimation(targetElement || window.document.body);
  
        messages[match.chatIndex].data = updated;
  
        const char = this.risuAPI.getChar();
        this.risuAPI.setChar(char);
      } catch (error) {
        console.error("[EditManager] Error deleting match:", error);
        alert("삭제 중 오류가 발생했습니다.");
      } finally {
        this.hideFloatingButton(); 
      }
    }
  }

  /**
   * 매칭 정보로부터 DOM 요소 찾기
   */
  findElementByMatch(match) {
    try {
      const char = this.risuAPI.getChar();
      const chatPage = char.chatPage || 0;
      const messages = char.chats[chatPage].message;
      const message = messages[match.chatIndex];

      if (!message) return null;

      const chatIndex = match.chatIndex;
      const chatId = message.id;

      const selectors = [
        `[data-chat-index="${chatIndex}"][data-chat-id="${chatId}"]`,
        `[data-chat-index="${chatIndex}"]`,
      ];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          const elementText = element.textContent || element.innerText || "";
          if (elementText.includes(match.context?.substring(0, 50) || "")) {
            return element;
          }
        }
      }

      return null;
    } catch (error) {
      console.error("[EditManager] Error finding element:", error);
      return null;
    }
  }

  /**
   * 삭제 애니메이션 실행
   */
  async performDeleteAnimation(element) {
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const container = document.body;

    const centerX = rect.left + window.scrollX + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2 - 25;

    const s = editStyles;

    const imgLeft = this._createDeleteImage(DEL_IMG_LEFT, centerX - 25, centerY, 'left');
    const imgRight = this._createDeleteImage(DEL_IMG_RIGHT, centerX + 25, centerY, 'right');

    container.appendChild(imgLeft);
    container.appendChild(imgRight);

    // 순차 등장
    requestAnimationFrame(() => {
      imgLeft.classList.add(s.floatingDeleteImgAppear);
    });
    await new Promise(r => setTimeout(r, 400));
    requestAnimationFrame(() => {
      imgRight.classList.add(s.floatingDeleteImgAppear);
    });

    await new Promise(r => setTimeout(r, 800));

    if (imgLeft.parentNode) imgLeft.remove();
    if (imgRight.parentNode) imgRight.remove();

    await new Promise(r => setTimeout(r, 400));

    // // 애니메이션이 완전히 끝난 후 요소 제거
    // if (element.parentNode) {
    //   element.remove();
    // }
  }

  // ==================== Private Helper Methods ====================

  // ==================== Anchoring 메서드 ====================

  /**
   * Anchor 캡처: 저장 전에 현재 위치 정보 저장
   */
  _captureAnchor(match, originalText) {
    const ANCHOR_LENGTH = 30;
    const scrollContainer = this._findScrollContainer();

    this._anchorInfo = {
      chatIndex: match.chatIndex,
      scrollTop: scrollContainer ? scrollContainer.scrollTop : 0,
      scrollContainer: scrollContainer,
      headText: originalText.substring(0, Math.min(ANCHOR_LENGTH, originalText.length)),
      tailText: originalText.slice(-Math.min(ANCHOR_LENGTH, originalText.length)),
    };
    console.log("[EditManager] Anchor captured:", {
      chatIndex: this._anchorInfo.chatIndex,
      scrollTop: this._anchorInfo.scrollTop,
      containerFound: !!scrollContainer,
    });
  }

  /**
   * SPA 스크롤 컨테이너 찾기
   */
  _findScrollContainer() {
    // 1차: data-chat-index가 있는 요소의 스크롤 가능한 부모 찾기
    const chatElement = document.querySelector('[data-chat-index]');
    if (chatElement) {
      let parent = chatElement.parentElement;
      while (parent && parent !== document.body) {
        const style = getComputedStyle(parent);
        const isScrollable =
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          parent.scrollHeight > parent.clientHeight;
        if (isScrollable) {
          return parent;
        }
        parent = parent.parentElement;
      }
    }

    // 2차: 일반적인 스크롤 컨테이너 선택자 시도
    const selectors = [
      '.chat-container',
      '.message-container',
      '.chat-scroll',
      '[class*="scroll"]',
      'main',
    ];

    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el && el.scrollHeight > el.clientHeight) {
        return el;
      }
    }

    // 3차: body나 documentElement가 스크롤 컨테이너인 경우
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      return document.documentElement;
    }

    return null;
  }

  /**
   * 정규식 적용 완료 후 스크롤 위치 복원 스케줄링
   */
  _scheduleAnchorRestoration() {
    // RisuAI 정규식 적용 완료까지 대기 (150ms)
    setTimeout(() => {
      this._restoreScrollPosition();
    }, 500);
  }

  /**
   * 스크롤 위치 복원
   */
  _restoreScrollPosition() {
    const { chatIndex, scrollTop, scrollContainer } = this._anchorInfo;

    if (chatIndex === null) {
      console.log("[EditManager] No anchor info, skipping restoration");
      return;
    }

    try {
      // 1차: 저장된 scrollTop으로 컨테이너 스크롤 복원 (가장 정확)
      const container = scrollContainer || this._findScrollContainer();
      if (container && scrollTop !== null) {
        container.scrollTop = scrollTop;
        console.log("[EditManager] Scroll restored via scrollTop:", scrollTop);
        this._clearAnchorInfo();
        return;
      }

      // 2차: scrollTop 실패 시 data-chat-index로 요소 찾아 스크롤
      const element = document.querySelector(`[data-chat-index="${chatIndex}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'center' });
        console.log("[EditManager] Scroll restored via data-chat-index fallback");
        this._clearAnchorInfo();
        return;
      }

      console.log("[EditManager] Could not restore scroll position");
    } catch (error) {
      console.error("[EditManager] Error restoring scroll position:", error);
    }

    this._clearAnchorInfo();
  }

  /**
   * Anchor 정보 초기화
   */
  _clearAnchorInfo() {
    this._anchorInfo = {
      chatIndex: null,
      scrollTop: null,
      scrollContainer: null,
      headText: null,
      tailText: null,
    };
  }

  /**
   * 콜백 함수 호출
   */
  _invokeCallbacks(callbacks, ...args) {
    callbacks.forEach(callback => {
      try {
        callback(...args);
      } catch (e) {
        console.error("[EditManager] 콜백 오류:", e);
      }
    });
  }

  /**
   * 콜백 추가
   */
  _addCallback(callbacks, callback) {
    if (typeof callback === "function") {
      callbacks.push(callback);
    }
  }

  /**
   * 콜백 제거
   */
  _removeCallback(callbacks, callback) {
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  /**
   * 현재 채팅 메시지 배열 가져오기
   */
  _getCharMessages() {
    const char = this.risuAPI.getChar();
    if (!char || !char.chats) return null;

    const chatPage = char.chatPage || 0;
    if (!char.chats[chatPage]) return null;

    return char.chats[chatPage].message;
  }

  /**
   * 선택 영역 해제
   */
  _clearSelection() {
    if (this.currentSelectionRange) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
      this.currentSelectionRange = null;
    }
  }

  /**
   * Floating 버튼 생성
   */
  _createButton(text, emoji, action) {
    const s = editStyles;
    const button = document.createElement("button");
    button.className = s.floatingActionButton;
    button.title = text;
    button.setAttribute("data-action", action);
    button.innerHTML = `
      <span style="margin-right: 6px; font-size: 14px;">${emoji}</span>
      <span>${text}</span>
    `;
    return button;
  }

  /**
   * Floating 버튼 위치 계산
   */
  _calculateButtonPosition(position, buttonHeight, containerWidth) {
    if (this.isMobileDevice) {
      return this._calculateMobileButtonPosition(position, buttonHeight, containerWidth);
    } else {
      return this._calculateDesktopButtonPosition(position, buttonHeight, containerWidth);
    }
  }

  /**
   * 모바일 버튼 위치 계산
   */
  _calculateMobileButtonPosition(position, buttonHeight, containerWidth) {
    const topSpace = position.viewportTop;
    const bottomSpace = window.innerHeight - position.viewportBottom;
    const toolbarGap = 100;
    const minimumGap = 10;
    const preferTop = topSpace > bottomSpace;

    let top;
    if (preferTop && topSpace > buttonHeight + toolbarGap) {
      top = position.top - buttonHeight - toolbarGap;
    } else if (!preferTop && bottomSpace > buttonHeight + toolbarGap) {
      top = position.bottom + toolbarGap;
    } else if (preferTop && topSpace > buttonHeight + minimumGap) {
      top = position.top - buttonHeight - minimumGap;
    } else {
      top = position.bottom + minimumGap;
    }

    const left = position.left + position.width / 2 - containerWidth / 2;
    return { top, left };
  }

  /**
   * 데스크톱 버튼 위치 계산
   */
  _calculateDesktopButtonPosition(position, buttonHeight, containerWidth) {
    const top = position.top - buttonHeight - 8;
    const left = position.left + position.width / 2 - containerWidth / 2;
    return { top, left };
  }

  /**
   * Floating 버튼 핸들러 연결 (개선판 v2)
   * - rAF 폴링으로 매 프레임 위치 추적 (모바일 selectionchange 빈도 낮음 대응)
   * - visibility:hidden 사용하여 레이아웃/측정 유지
   * - getClientRects()로 멀티라인 선택 정확도 향상
   */
  _attachFloatingButtonHandlers(buttonContainer) {
    const END_DEBOUNCE = 100;  // 종료 판정은 느긋하게
    let endTimer = null;
    let selecting = false;
    let rafId = null;

    // rAF 폴링 시작
    const startTrack = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      const loop = () => {
        maybeReposition();  // 프레임마다 회피/재배치
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    // rAF 폴링 중지
    const stopTrack = () => {
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // 선택 상태 토글
    const setSelecting = (on) => {
      selecting = on; 
      if (on) {
        buttonContainer.setAttribute('inert', '');
        buttonContainer.style.pointerEvents = 'none';
        buttonContainer.style.userSelect = 'none';
        buttonContainer.style.touchAction = 'none';
        buttonContainer.style.visibility = 'hidden';  // display:none 금지, 측정 유지
        buttonContainer.classList.add('is-selecting');
        startTrack();  // rAF 시작
      } else {
        stopTrack();   // rAF 중지
        buttonContainer.removeAttribute('inert');
        buttonContainer.style.pointerEvents = 'auto';
        buttonContainer.style.userSelect = '';
        buttonContainer.style.touchAction = '';
        buttonContainer.style.visibility = 'visible';
        buttonContainer.classList.remove('is-selecting');
        buttonContainer.style.transform = '';
      }
    };

    // 선택 영역 Rect 가져오기 (멀티라인 대응)
    const getSelectionRect = () => {
      const sel = window.getSelection?.();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
      const range = sel.getRangeAt(0);

      // 1) 멀티라인은 마지막 rect가 핸들 위치에 가깝다
      const rects = range.getClientRects?.();
      if (rects && rects.length) {
        const last = rects[rects.length - 1];
        if (last.width || last.height) return last;
      }

      // 2) 폴백
      const r = range.getBoundingClientRect();
      if (r && (r.width || r.height)) return r;
      return null;
    };

    // 겹침 감지 후 회피 (버튼 영역 확장 체크)
    const maybeReposition = () => {
      if (!selecting) return;

      const r = getSelectionRect();
      if (!r) return;

      const f = buttonContainer.getBoundingClientRect();
      // rAF 중이라 측정 가능. visibility:hidden이어도 OK

      // 버튼 영역 확장 후 겹침 체크
      const pad = 40;
      const expandedF = {
        left: f.left - pad,
        right: f.right + pad,
        top: f.top - pad,
        bottom: f.bottom + pad
      };

      const overlap = !(expandedF.right < r.left || expandedF.left > r.right ||
        expandedF.bottom < r.top || expandedF.top > r.bottom);
        
      console.log('overlap', overlap);

      if (overlap) {
        // 선택 영역 하단으로 20px 스냅
        const dy = (r.bottom - f.top) + 20;
        buttonContainer.style.transform = `translate3d(0, ${dy}px, 0)`;
      } else {
        buttonContainer.style.transform = '';
      }
    };

    // 이벤트 핸들러들
    const handleSelectionStart = () => setSelecting(true);

    const handleSelectionChange = () => {
      // 종료 판정 디바운스
      clearTimeout(endTimer);
      const sel = window.getSelection?.();
      setSelecting(true)
      maybeReposition();
      const active = sel && sel.rangeCount > 0 && !sel.isCollapsed;
      if (!active) setSelecting(false);
      // endTimer = setTimeout(() => {
      // }, END_DEBOUNCE);
    };

    const handleSelectionEnd = () => {
      // 약간 늦춰 최종 상태 확인
      setTimeout(() => {
        const sel = window.getSelection?.();
        const active = sel && sel.rangeCount > 0 && !sel.isCollapsed;
        if (!active) setSelecting(false);
      }, 50);
    };

    const handleClick = (e) => {
      if (Date.now() < this._ignoreClickUntil) return;
      if (buttonContainer.contains(e.target)) return;
      this.hideFloatingButton();
    };

    // 모바일에서 selectionchange 드물게 올 때 대비용 (rAF가 돌고 있어 별도 처리 불필요)
    const poke = () => { /* no-op */ };

    // 이벤트 연결
    document.addEventListener('selectstart', handleSelectionStart, { passive: true });
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionEnd, { passive: true });
    document.addEventListener('touchend', handleSelectionEnd, { passive: true });
    document.addEventListener('pointerup', handleSelectionEnd, { passive: true });
    document.addEventListener('touchmove', poke, { passive: true });
    document.addEventListener('pointermove', poke, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('blur', handleSelectionEnd);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') handleSelectionEnd();
    });

    // Cleanup 저장
    this._selectionStartHandler = handleSelectionStart;
    this._selectionChangeHandler = handleSelectionChange;
    this._selectionEndHandler = handleSelectionEnd;
    this._pokeHandler = poke;
    this._clickHandler = handleClick;
    this._blurHandler = handleSelectionEnd;
    this._visibilityChangeHandler = () => {
      if (document.visibilityState !== 'visible') handleSelectionEnd();
    };
  }

  /**
   * 모달 표시 (편집/삭제 공통)
   */
  _showModal(matches, selectedText, messageData, actionLabel, actionType, onSelect) {
    const s = editStyles;
    const modal = document.createElement("div");
    modal.className = s.selectionModal;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    if (this.isMobileDevice) {
      modal.style.width = "90vw";
      modal.style.maxWidth = "600px";
    }

    const headerHTML = this._createModalHeader(actionLabel, matches.length, selectedText);
    const itemsHTML = matches
      .map((match, index) => this._createMatchItem(match, index, messageData, actionType))
      .join("");

    modal.innerHTML = `
      ${headerHTML}
      <div class="${s.selectionModalBody}">
        ${itemsHTML}
      </div>
    `;

    document.body.appendChild(modal);
    this._attachModalListeners(modal, matches, actionType, onSelect);
  }

  /**
   * 모달 헤더 HTML 생성
   */
  _createModalHeader(actionLabel, count, selectedText) {
    const s = editStyles;
    return `
      <div class="${s.selectionModalHeader}">
        <div class="${s.selectionModalTitleRow}">
          <h3 class="${s.selectionModalTitle}">
            다음 중 ${actionLabel} 항목을 선택하세요
            <span class="${s.selectionModalTitleCount}">(${count}개)</span>
          </h3>
          <button class="${s.selectionModalCancelBtn}" data-action="close">취소</button>
        </div>
        <div class="${s.selectionModalSelectedTextContainer}">
          <div class="${s.selectionModalSelectedTextLabel}">선택된 텍스트</div>
          <div class="${s.selectionModalSelectedText}">"${this.escapeHtml(selectedText)}"</div>
        </div>
      </div>
    `;
  }

  /**
   * 매칭 항목 HTML 생성
   */
  _createMatchItem(match, index, messageData, actionType) {
    const s = editStyles;
    const contextStart = match.contextStart ?? Math.max(0, match.start - 30);
    const highlightedContext = this.highlightMatchInContext(
      match.context,
      match.start,
      match.end,
      contextStart
    );
    const lineNumber = messageData ? this.calculateLineNumber(messageData, match.start) : null;
    const methodBadge = this.getMethodBadge(match.method, match.distance);

    return `
      <div class="${s.selectionModalItem}" data-action="${actionType}" data-index="${index}">
        <div class="${s.selectionModalItemHeader}">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="${s.selectionModalItemTitle}">매칭 ${index + 1}</div>
            ${methodBadge}
          </div>
          ${lineNumber ? `<div class="${s.selectionModalItemLineNumber}">${lineNumber}번째 줄 부근</div>` : ''}
        </div>
        <div class="${s.selectionModalItemContext}">
          ${highlightedContext || "컨텍스트 없음"}
        </div>
      </div>
    `;
  }

  /**
   * 모달 이벤트 리스너 연결
   */
  _attachModalListeners(modal, matches, actionType, onSelect) {
    const handleClick = (e) => {
      if (e.target === modal) {
        this._closeModal(modal);
        return;
      }

      let target = e.target;
      while (target && target !== modal) {
        const action = target.getAttribute("data-action");
        if (action === "close") {
          this._closeModal(modal);
          return;
        } else if (action === actionType) {
          const index = parseInt(target.getAttribute("data-index"), 10);
          if (!isNaN(index) && matches[index]) {
            this._closeModal(modal);
            onSelect(matches[index]);
            return;
          }
        }
        target = target.parentElement;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        this._closeModal(modal);
      }
    };

    modal.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    modal._cleanup = () => {
      modal.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  /**
   * 모달 닫기
   */
  _closeModal(modal) {
    if (modal._cleanup) {
      modal._cleanup();
    }
    if (modal.parentNode) {
      document.body.removeChild(modal);
    }
  }

  // Alias for backward compatibility
  closeSelectionModal(modal) {
    this._closeModal(modal);
  }

  /**
   * 편집 다이얼로그 크기 계산
   */
  _calculateDialogDimensions(selectedText) {
    const lines = selectedText.split('\n');
    const lineCount = lines.length;
    const maxLineLength = lines.length > 0
      ? Math.max(...lines.map(line => line.length), 0)
      : selectedText.length;

    let minWidth, maxWidth;
    if (this.isMobileDevice) {
      minWidth = 320;
      maxWidth = Math.min(window.innerWidth * 0.9, 600);
    } else {
      minWidth = 400;
      maxWidth = Math.min(window.innerWidth * 0.9, 800);
    }

    const charWidth = 8;
    const dialogPadding = 40;
    const textareaPadding = 16;
    const totalPadding = dialogPadding + textareaPadding;
    const calculatedWidth = Math.max(minWidth, Math.min(maxWidth, maxLineLength * charWidth + totalPadding));

    // 모바일 환경에서는 더 큰 높이 사용
    const minTextareaHeight = this.isMobileDevice ? 250 : 100;
    const viewportHeightRatio = this.isMobileDevice ? 0.85 : 0.7;
    const maxDialogHeight = this.isMobileDevice
      ? Math.min(window.innerHeight * viewportHeightRatio, window.innerHeight - 60)
      : Math.min(window.innerHeight * viewportHeightRatio, 600);
    const lineHeight = 24;
    const textareaVerticalPadding = 16;
    const buttonsHeight = 60;
    const dialogVerticalPadding = 40;

    const calculatedTextareaHeight = Math.max(
      minTextareaHeight,
      Math.min(
        maxDialogHeight - buttonsHeight - dialogVerticalPadding,
        lineCount * lineHeight + textareaVerticalPadding
      )
    );

    const calculatedDialogHeight = calculatedTextareaHeight + buttonsHeight + dialogVerticalPadding;
    const maxTextareaHeight = maxDialogHeight - buttonsHeight - dialogVerticalPadding;

    return {
      width: { min: minWidth, max: maxWidth, calculated: calculatedWidth },
      height: { max: maxDialogHeight, calculated: calculatedDialogHeight },
      textareaHeight: { min: minTextareaHeight, max: maxTextareaHeight, calculated: calculatedTextareaHeight }
    };
  }

  /**
   * 편집 다이얼로그 이벤트 리스너 연결
   */
  _attachEditDialogListeners(dialog, match, originalText) {
    const textarea = dialog.querySelector('[data-action="textarea"]');

    const handleSave = () => {
      const newText = textarea.value;
      this.saveEdit(match, originalText, newText);
      this._closeEditDialog(dialog);
    };

    const handleCancel = () => {
      this._closeEditDialog(dialog);
    };

    const handleClick = (e) => {
      if (e.target === dialog) {
        handleCancel();
        return;
      }

      let target = e.target;
      while (target && target !== dialog) {
        const action = target.getAttribute("data-action");
        if (action === "save") {
          handleSave();
          return;
        } else if (action === "cancel") {
          handleCancel();
          return;
        }
        target = target.parentElement;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCancel();
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSave();
      }
    };

    dialog.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    dialog._cleanup = () => {
      dialog.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  /**
   * 편집 다이얼로그 닫기
   */
  _closeEditDialog(dialog) {
    if (dialog._cleanup) {
      dialog._cleanup();
    }
    if (dialog._cleanupKeyboardHandler) {
      dialog._cleanupKeyboardHandler();
    }
    if (dialog.parentNode) {
      document.body.removeChild(dialog);
    }
  }

  // Alias for backward compatibility
  closeEditDialog(dialog) {
    this._closeEditDialog(dialog);
  }

  /**
   * 삭제 이미지 생성
   */
  _createDeleteImage(src, x, y, direction) {
    const s = editStyles;
    const img = document.createElement('img');
    img.src = src;
    img.width = 100;
    img.height = 100;
    img.className = `${s.floatingDeleteImg} ${direction === 'left' ? s.floatingDeleteImgFromLeft : s.floatingDeleteImgFromRight}`;
    img.style.top = `${y}px`;
    img.style.left = `${x}px`;
    return img;
  }

  // ==================== Utility Methods ====================

  /**
   * 컨텍스트에서 매칭된 텍스트를 하이라이트
   */
  highlightMatchInContext(context, matchStart, matchEnd, contextStart) {
    const relativeStart = matchStart - contextStart;
    const relativeEnd = matchEnd - contextStart;

    if (relativeStart < 0 || relativeEnd > context.length || relativeStart >= relativeEnd) {
      return this.escapeHtml(context);
    }

    const before = this.escapeHtml(context.slice(0, relativeStart));
    const match = this.escapeHtml(context.slice(relativeStart, relativeEnd));
    const after = this.escapeHtml(context.slice(relativeEnd));

    return `${before}<mark style="background: #fef3c7; color: #92400e; padding: 2px 4px; border-radius: 3px; font-weight: 500;">${match}</mark>${after}`;
  }

  /**
   * HTML 이스케이프
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 라인 번호 계산
   */
  calculateLineNumber(messageData, position) {
    const beforeText = messageData.slice(0, position);
    const lineNumber = (beforeText.match(/\n/g) || []).length + 1;
    return lineNumber;
  }

  /**
   * 매칭 방법 배지 생성
   */
  getMethodBadge(method, distance = null) {
    const s = editStyles;
    let badgeText = "";
    let badgeClass = "";
    let badgeTitle = "";

    switch (method) {
      case "exact":
        badgeText = "정확";
        badgeClass = s.selectionModalMethodBadgeExact;
        badgeTitle = "정확한 매칭";
        break;
      case "fuzzy":
        badgeText = distance !== null ? `유사 (${distance})` : "유사";
        badgeClass = s.selectionModalMethodBadgeFuzzy;
        badgeTitle = `Fuzzy 매칭 (편집 거리: ${distance || "N/A"})`;
        break;
      case "anchor":
        badgeText = "앵커";
        badgeClass = s.selectionModalMethodBadgeAnchor;
        badgeTitle = "Head/Tail 앵커 매칭";
        break;
      default:
        badgeText = "알 수 없음";
        badgeClass = s.selectionModalMethodBadge;
        badgeTitle = "알 수 없는 매칭 방법";
    }

    return `<span class="${badgeClass}" title="${badgeTitle}">${badgeText}</span>`;
  }

  /**
   * 모바일 환경에서 textarea 스크롤 활성화
   * 터치 이벤트가 부모로 전파되어 스크롤이 안 되는 문제 해결
   */
  _attachTextareaScrollHandler(textarea) {
    let startY = 0;

    textarea.addEventListener('touchstart', (e) => {
      startY = e.touches[0].pageY;
    }, { passive: true });

    textarea.addEventListener('touchmove', (e) => {
      const currentY = e.touches[0].pageY;
      const deltaY = currentY - startY;

      const scrollTop = textarea.scrollTop;
      const scrollHeight = textarea.scrollHeight;
      const clientHeight = textarea.clientHeight;
      const isScrollable = scrollHeight > clientHeight;

      if (!isScrollable) {
        // 스크롤 불가능하면 부모로 전파
        return;
      }

      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // 위쪽 경계에서 아래로 스크롤하거나, 아래쪽 경계에서 위로 스크롤하는 경우
      const shouldPreventDefault =
        (!isAtTop && !isAtBottom) ||  // 중간에서 스크롤
        (isAtTop && deltaY < 0) ||     // 위쪽 경계에서 아래로 스크롤
        (isAtBottom && deltaY > 0);    // 아래쪽 경계에서 위로 스크롤

      if (shouldPreventDefault) {
        e.stopPropagation();
      }
    }, { passive: false });
  }

  /**
   * 모바일에서 키보드 표시 감지 및 다이얼로그 높이 조정
   */
  _attachKeyboardResizeHandler(dialog) {
    if (!window.visualViewport) {
      return;
    }

    const updateDialogHeight = () => {
      // visualViewport.height는 키보드를 제외한 실제 보이는 영역의 높이
      const availableHeight = window.visualViewport.height;
      dialog.style.maxHeight = `${availableHeight}px`;
      dialog.style.height = `${availableHeight}px`;
    };

    // 초기 높이 설정
    updateDialogHeight();

    // 키보드 표시/숨김 감지
    const handleResize = () => {
      updateDialogHeight();
    };

    window.visualViewport.addEventListener('resize', handleResize);

    // 다이얼로그에 cleanup 함수 저장
    dialog._cleanupKeyboardHandler = () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }

  /**
   * 정리
   */
  destroy() {
    this.textSelectionHandler.disable();
    this.elementEditHandler.disable();
    this.hideFloatingButton();
  }
}
