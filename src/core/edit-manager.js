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
  }

  /**
   * 편집 모드 초기화
   */
  initialize() {
    // plugin-config에서 editMode 읽어오기
    const savedMode = this.pluginArgs.editMode || "selection";
    this.setEditMode(savedMode, true); // 저장하지 않고 모드만 설정 (이미 저장되어 있음)

    // plugin-config에서 buttonPosition 읽어오기
    const savedPosition = this.pluginArgs.buttonPosition || "top";
    this.setButtonPosition(savedPosition, false); // 저장하지 않고 위치만 설정 (이미 저장되어 있음)
  }

  /**
   * 편집 모드 설정
   * @param {string} mode - "element" | "selection"
   * @param {boolean} save - plugin-config에 저장할지 여부 (기본값: true)
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

    // plugin-config에 저장
    if (save) {
      this.pluginArgs.editMode = mode;
    }

    // 콜백 호출
    this._modeChangeCallbacks.forEach(callback => {
      try {
        callback(mode);
      } catch (e) {
        console.error("[EditManager] 모드 변경 콜백 오류:", e);
      }
    });
  }

  /**
   * 편집 모드 토글
   */
  toggleEditMode() {
    const newMode = this.editMode === "element" ? "selection" : "element";
    this.setEditMode(newMode, true);
  }

  /**
   * 현재 편집 모드 반환
   */
  getEditMode() {
    return this.editMode;
  }

  /**
   * 편집 모드 변경 콜백 등록
   * @param {Function} callback - 모드 변경 시 호출될 함수 (mode: string) => void
   */
  onModeChange(callback) {
    if (typeof callback === "function") {
      this._modeChangeCallbacks.push(callback);
    }
  }

  /**
   * 편집 모드 변경 콜백 제거
   * @param {Function} callback - 제거할 콜백 함수
   */
  offModeChange(callback) {
    const index = this._modeChangeCallbacks.indexOf(callback);
    if (index > -1) {
      this._modeChangeCallbacks.splice(index, 1);
    }
  }

  /**
   * 버튼 위치 설정
   * @param {string} position - "top" | "bottom"
   * @param {boolean} save - plugin-config에 저장할지 여부 (기본값: true)
   */
  setButtonPosition(position, save = true) {
    if (position !== "top" && position !== "bottom") {
      console.warn(`[EditManager] 잘못된 버튼 위치: ${position}`);
      return;
    }

    this.buttonPosition = position;
    console.log(`[EditManager] 버튼 위치: ${position === "top" ? "상단" : "하단"}`);

    // plugin-config에 저장
    if (save) {
      this.pluginArgs.buttonPosition = position;
    }

    // 콜백 호출
    this._buttonPositionChangeCallbacks.forEach(callback => {
      try {
        callback(position);
      } catch (e) {
        console.error("[EditManager] 버튼 위치 변경 콜백 오류:", e);
      }
    });
  }

  /**
   * 버튼 위치 토글
   */
  toggleButtonPosition() {
    const newPosition = this.buttonPosition === "top" ? "bottom" : "top";
    this.setButtonPosition(newPosition, true);
  }

  /**
   * 현재 버튼 위치 반환
   */
  getButtonPosition() {
    return this.buttonPosition;
  }

  /**
   * 버튼 위치 변경 콜백 등록
   * @param {Function} callback - 위치 변경 시 호출될 함수 (position: string) => void
   */
  onButtonPositionChange(callback) {
    if (typeof callback === "function") {
      this._buttonPositionChangeCallbacks.push(callback);
    }
  }

  /**
   * 버튼 위치 변경 콜백 제거
   * @param {Function} callback - 제거할 콜백 함수
   */
  offButtonPositionChange(callback) {
    const index = this._buttonPositionChangeCallbacks.indexOf(callback);
    if (index > -1) {
      this._buttonPositionChangeCallbacks.splice(index, 1);
    }
  }

  /**
   * 텍스트 선택으로부터 편집 시작
   */
  startEditFromSelection(match, position, selectionRange = null, allMatches = null, selectedText = null) {
    // 선택 영역 저장 (나중에 해제하기 위해)
    this.currentSelectionRange = selectionRange;
    this.currentMatches = allMatches; // 모든 매칭 정보 저장
    this.currentSelectedText = selectedText; // 선택된 텍스트 저장
    
    // selection이 방금 생성되었으므로 클릭 이벤트를 일시적으로 무시 (더블클릭 후 selection 보호)
    this._ignoreClickUntil = Date.now() + 300;
    
    // Floating Action Button 표시
    this.showFloatingButton(position, () => {
      // 버튼 클릭 시 선택 해제
      if (this.currentSelectionRange) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
        this.currentSelectionRange = null;
      }
      
      // 매칭이 1개면 바로 편집, 2개 이상이면 Modal 표시
      if (match) {
        // 단일 매칭: 바로 편집 다이얼로그 열기
        this.openEditDialog(match);
      } else if (allMatches && allMatches.length > 1) {
        // 다중 매칭: Modal 표시
        this.showSelectionModal(allMatches, selectedText, position);
      }
    });
  }

  /**
   * 여러 매칭 결과 선택 모달 표시
   */
  showSelectionModal(matches, selectedText, position) {
    // Floating Button 숨기기
    this.hideFloatingButton();
    
    // 원본 메시지 데이터 가져오기 (라인 번호 계산용)
    const char = this.risuAPI.getChar();
    const chatPage = char?.chatPage || 0;
    const messages = char?.chats?.[chatPage]?.message;
    const messageData = matches.length > 0 && messages ? messages[matches[0].chatIndex]?.data || "" : "";
    
    // 모달 컴포넌트가 있으면 사용, 없으면 간단한 confirm 사용
    if (this.selectionModal) {
      this.selectionModal.show(matches, selectedText, (selectedMatch) => {
        this.openEditDialog(selectedMatch);
      });
    } else {
      // 임시: 간단한 선택 UI
      this.showSimpleSelectionModal(matches, selectedText, position, messageData);
    }
  }

  /**
   * 컨텍스트에서 매칭된 텍스트를 하이라이트
   */
  highlightMatchInContext(context, matchStart, matchEnd, contextStart) {
    // 컨텍스트 내에서 매칭된 부분의 상대 위치 계산
    const relativeStart = matchStart - contextStart;
    const relativeEnd = matchEnd - contextStart;
    
    // 범위 검증
    if (relativeStart < 0 || relativeEnd > context.length || relativeStart >= relativeEnd) {
      // 범위가 유효하지 않으면 그냥 컨텍스트 반환
      return this.escapeHtml(context);
    }
    
    // 컨텍스트를 세 부분으로 나눔: 앞부분, 매칭 부분, 뒷부분
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
    // position 이전의 줄바꿈 개수 + 1
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
   * 매칭되는 내용 selection modal
   */
  showSimpleSelectionModal(matches, selectedText, position, messageData = "") {
    const s = editStyles; // 스타일 별칭
    const modal = document.createElement("div");
    modal.className = s.selectionModal;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    
    // 모바일 환경에서 width 조정
    if (this.isMobileDevice) {
      modal.style.width = "90vw";
      modal.style.maxWidth = "600px";
    }

    // 헤더 HTML 생성
    const headerHTML = `
      <div class="${s.selectionModalHeader}">
        <div class="${s.selectionModalTitleRow}">
          <h3 class="${s.selectionModalTitle}">
            다음 중 편집할 항목을 선택하세요
            <span class="${s.selectionModalTitleCount}">(${matches.length}개)</span>
          </h3>
          <button class="${s.selectionModalCancelBtn}" data-action="close">취소</button>
        </div>
        <div class="${s.selectionModalSelectedTextContainer}">
          <div class="${s.selectionModalSelectedTextLabel}">선택된 텍스트</div>
          <div class="${s.selectionModalSelectedText}">"${this.escapeHtml(selectedText)}"</div>
        </div>
      </div>
    `;

    // 매칭 항목 HTML 생성
    const itemsHTML = matches
      .map((match, index) => {
        const contextStart = match.contextStart ?? Math.max(0, match.start - 30);
        const highlightedContext = this.highlightMatchInContext(
          match.context,
          match.start,
          match.end,
          contextStart
        );
        const lineNumber = messageData ? this.calculateLineNumber(messageData, match.start) : null;
        
        // 매칭 방법 표시
        const methodBadge = this.getMethodBadge(match.method, match.distance);
        
        return `
          <div class="${s.selectionModalItem}" data-action="select" data-index="${index}">
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
      })
      .join("");

    modal.innerHTML = `
      ${headerHTML}
      <div class="${s.selectionModalBody}">
        ${itemsHTML}
      </div>
    `;

    document.body.appendChild(modal);

    // 이벤트 리스너 연결
    this.attachSelectionModalListeners(modal, matches);
  }

  /**
   * 선택 모달 이벤트 리스너 연결
   */
  attachSelectionModalListeners(modal, matches) {
    const handleClick = (e) => {
      // 배경 클릭 시 닫기
      if (e.target === modal) {
        this.closeSelectionModal(modal);
        return;
      }

      // data-action 속성을 가진 요소 찾기 (클릭된 요소 또는 부모 요소)
      let target = e.target;
      while (target && target !== modal) {
        const action = target.getAttribute("data-action");
        if (action) {
          if (action === "close") {
            this.closeSelectionModal(modal);
            return;
          } else if (action === "select") {
            const index = target.getAttribute("data-index");
            if (index !== null) {
              const selectedMatch = matches[parseInt(index, 10)];
              this.closeSelectionModal(modal);
              this.openEditDialog(selectedMatch);
              return;
            }
          }
        }
        target = target.parentElement;
      }
    };

    // 클릭 이벤트 (이벤트 위임)
    modal.addEventListener("click", handleClick);

    // ESC 키로 닫기
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        this.closeSelectionModal(modal);
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup 함수 저장
    modal._cleanup = () => {
      modal.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  /**
   * 선택 모달 닫기
   */
  closeSelectionModal(modal) {
    if (modal._cleanup) {
      modal._cleanup();
    }
    if (modal.parentNode) {
      document.body.removeChild(modal);
    }
  }

  /**
   * Floating Action Button 표시
   */
  showFloatingButton(position, onClick) {
    // 기존 버튼 제거
    this.hideFloatingButton();

    const s = editStyles; // 스타일 별칭
    
    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
      position: absolute;
      display: flex;
      gap: 8px;
      z-index: 10000;
      align-items: center;
    `;
    
    // 편집 버튼 생성
    const editButton = document.createElement("button");
    editButton.className = s.floatingActionButton;
    editButton.title = "편집";
    editButton.setAttribute("data-action", "edit");
    editButton.innerHTML = `
      <span style="margin-right: 6px; font-size: 14px;">✏️</span>
      <span>편집</span>
    `;
    
    // 삭제 버튼 생성
    const deleteButton = document.createElement("button");
    deleteButton.className = s.floatingActionButton;
    deleteButton.title = "삭제";
    deleteButton.setAttribute("data-action", "delete");
    deleteButton.innerHTML = `
      <span style="margin-right: 6px; font-size: 14px;">🗑️</span>
      <span>삭제</span>
    `;
    
    // 버튼 너비 계산
    const buttonWidth = 80;
    const buttonHeight = 32;
    const gap = 8;
    const containerWidth = buttonWidth * 2 + gap; // 버튼 2개 + gap
    
    // 모바일/데스크톱에 따른 위치 계산
    let containerTop, containerLeft;

    if (this.isMobileDevice) {
      // 모바일: 상단/하단 여유 공간을 계산하여 최적의 위치 선택
      // 브라우저 기본 selection toolbar(복사/붙여넣기 등)와의 충돌 방지

      // viewport 기준 여유 공간 계산
      const topSpace = position.viewportTop;
      const bottomSpace = window.innerHeight - position.viewportBottom;

      // 브라우저 기본 toolbar 예상 높이 (보통 44-60px, 여유있게 설정)
      const toolbarGap = 100;
      const minimumGap = 10; // 최소 여백

      // 상단과 하단 중 더 넓은 공간 선택
      const preferTop = topSpace > bottomSpace;

      if (preferTop && topSpace > buttonHeight + toolbarGap) {
        // 상단에 충분한 공간: selection 상단에서 충분히 위로 배치
        containerTop = position.top - buttonHeight - toolbarGap;
      } else if (!preferTop && bottomSpace > buttonHeight + toolbarGap) {
        // 하단에 충분한 공간: selection 하단에서 충분히 아래로 배치
        containerTop = position.bottom + toolbarGap;
      } else if (preferTop && topSpace > buttonHeight + minimumGap) {
        // 상단 공간이 더 크지만 toolbar 간격은 부족: 최소 여백으로 상단 배치
        containerTop = position.top - buttonHeight - minimumGap;
      } else {
        // 하단에 배치 (최소 여백)
        containerTop = position.bottom + minimumGap;
      }

      // 좌우 중앙 정렬
      containerLeft = position.left + position.width / 2 - containerWidth / 2;
    } else {
      // 데스크톱: selection 상단에 버튼 표시
      containerTop = position.top - buttonHeight - 8;
      containerLeft = position.left + position.width / 2 - containerWidth / 2;
    }
    
    // 컨테이너 위치 설정
    buttonContainer.style.top = `${containerTop}px`;
    buttonContainer.style.left = `${containerLeft}px`;
    buttonContainer.style.width = `${containerWidth}px`;
    
    // 버튼 스타일 설정 (position: relative로 변경하여 flex 레이아웃 적용)
    editButton.style.cssText = `
      position: relative !important;
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      flex-shrink: 0;
      box-sizing: border-box;
    `;
    deleteButton.style.cssText = `
      position: relative !important;
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      flex-shrink: 0;
      box-sizing: border-box;
    `;

    // 편집 버튼 클릭 이벤트
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
      this.hideFloatingButton();
    });

    // 삭제 버튼 클릭 이벤트
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleDeleteClick();
      this.hideFloatingButton();
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    document.body.appendChild(buttonContainer);
    this.floatingButton = buttonContainer;

    // 스크롤 시 버튼 제거 및 선택 해제
    const handleScroll = () => {
      this.hideFloatingButton();
      if (this.currentSelectionRange) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
        this.currentSelectionRange = null;
      }
    };

    // 다른 곳 클릭 시 버튼 제거 및 선택 해제 (버튼 클릭은 제외)
    const handleClick = (e) => {
      // 더블클릭 직후 클릭 이벤트 무시 (selection 보호)
      if (Date.now() < this._ignoreClickUntil) {
        return;
      }

      // 버튼 컨테이너나 버튼의 자식 요소 클릭은 무시
      if (buttonContainer.contains(e.target)) {
        return;
      }
      this.hideFloatingButton();
      if (this.currentSelectionRange) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
        }
        this.currentSelectionRange = null;
      }
    };

    // 스크롤 이벤트를 캡처링 단계에서 감지 (모든 스크롤 가능한 요소 포함)
    window.addEventListener("scroll", handleScroll, { once: true, capture: true });
    document.addEventListener("click", handleClick, { once: false });
    
    // 이벤트 리스너 정리를 위한 참조 저장
    this._scrollHandler = handleScroll;
    this._clickHandler = handleClick;
  }

  /**
   * Floating Action Button 숨기기
   */
  hideFloatingButton() {
    if (this.floatingButton) {
      // 이벤트 리스너 정리
      if (this._scrollHandler) {
        window.removeEventListener("scroll", this._scrollHandler);
        this._scrollHandler = null;
      }
      if (this._clickHandler) {
        document.removeEventListener("click", this._clickHandler);
        this._clickHandler = null;
      }
      
      document.body.removeChild(this.floatingButton);
      this.floatingButton = null;
    }
    
    // 선택 관련 정보는 유지 (삭제 기능에서 사용)
  }

  /**
   * 편집 다이얼로그 열기
   */
  openEditDialog(match) {
    const char = this.risuAPI.getChar();
    if (!char || !char.chats) {
      return;
    }

    const chatPage = char.chatPage || 0;
    if (!char.chats[chatPage]) {
      return;
    }

    const messages = char.chats[chatPage].message;
    if (!messages || !messages[match.chatIndex]) {
      return;
    }

    const messageData = messages[match.chatIndex].data;
    const selectedText = messageData.slice(match.start, match.end);
    const s = editStyles; // 스타일 별칭

    // 텍스트 길이에 따른 다이얼로그 크기 계산
    const lines = selectedText.split('\n');
    const lineCount = lines.length;
    const maxLineLength = lines.length > 0 
      ? Math.max(...lines.map(line => line.length), 0)
      : selectedText.length;
    
    // 모바일/데스크톱에 따른 너비 계산
    let minWidth, maxWidth;
    if (this.isMobileDevice) {
      // 모바일: 화면 너비의 90% 사용, 최소 320px
      minWidth = 320;
      maxWidth = Math.min(window.innerWidth * 0.9, 600);
    } else {
      // 데스크톱: 기존 로직
      minWidth = 400;
      maxWidth = Math.min(window.innerWidth * 0.9, 800);
    }
    
    const charWidth = 8; // 대략적인 문자 너비 (px)
    const dialogPadding = 40; // 다이얼로그 좌우 패딩 (20px * 2)
    const textareaPadding = 16; // textarea 좌우 패딩 (8px * 2)
    const totalPadding = dialogPadding + textareaPadding;
    const calculatedWidth = Math.max(minWidth, Math.min(maxWidth, maxLineLength * charWidth + totalPadding));
    
    // 높이 계산: 최소 높이, 최대 70vh, 줄 수에 따라 조정
    const minTextareaHeight = 100;
    const maxDialogHeight = Math.min(window.innerHeight * 0.7, 600);
    const lineHeight = 24; // 대략적인 줄 높이 (px)
    const textareaVerticalPadding = 16; // textarea 상하 패딩 (8px * 2)
    const buttonsHeight = 60; // 버튼 영역 높이 (버튼 + 마진)
    const dialogVerticalPadding = 40; // 다이얼로그 상하 패딩 (20px * 2)
    
    // textarea 높이 계산
    const calculatedTextareaHeight = Math.max(
      minTextareaHeight, 
      Math.min(
        maxDialogHeight - buttonsHeight - dialogVerticalPadding,
        lineCount * lineHeight + textareaVerticalPadding
      )
    );
    
    // 전체 다이얼로그 높이 계산
    const calculatedDialogHeight = calculatedTextareaHeight + buttonsHeight + dialogVerticalPadding;

    // 편집 다이얼로그 표시
    const dialog = document.createElement("div");
    dialog.className = s.editDialog;
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    
    // 동적 크기 설정
    dialog.style.width = `${calculatedWidth}px`;
    dialog.style.minWidth = `${minWidth}px`;
    dialog.style.maxWidth = `${maxWidth}px`;
    dialog.style.height = `${calculatedDialogHeight}px`;
    dialog.style.maxHeight = `${maxDialogHeight}px`;

    dialog.innerHTML = `
      <textarea class="${s.editDialogTextarea}" data-action="textarea" style="min-height: ${minTextareaHeight}px; height: ${calculatedTextareaHeight}px; max-height: ${maxDialogHeight - buttonsHeight - dialogVerticalPadding}px;">${this.escapeHtml(selectedText)}</textarea>
      <div class="${s.editDialogButtons}">
        <button class="${s.editDialogButton} ${s.editDialogCancelButton}" data-action="cancel">취소</button>
        <button class="${s.editDialogButton} ${s.editDialogSaveButton}" data-action="save">저장</button>
      </div>
    `;

    document.body.appendChild(dialog);

    // 이벤트 리스너 연결
    this.attachEditDialogListeners(dialog, match, selectedText);

    // 포커스 설정
    const textarea = dialog.querySelector('[data-action="textarea"]');
    if (textarea) {
      textarea.focus();
      textarea.select();
    }
  }

  /**
   * 편집 다이얼로그 이벤트 리스너 연결
   */
  attachEditDialogListeners(dialog, match, originalText) {
    const textarea = dialog.querySelector('[data-action="textarea"]');

    const handleSave = () => {
      const newText = textarea.value;
      this.saveEdit(match, originalText, newText);
      this.closeEditDialog(dialog);
    };

    const handleCancel = () => {
      this.closeEditDialog(dialog);
    };

    const handleClick = (e) => {
      // 배경 클릭 시 닫기
      if (e.target === dialog) {
        handleCancel();
        return;
      }

      // data-action 속성을 가진 요소 찾기
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

    // Cleanup 함수 저장
    dialog._cleanup = () => {
      dialog.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  /**
   * 편집 다이얼로그 닫기
   */
  closeEditDialog(dialog) {
    if (dialog._cleanup) {
      dialog._cleanup();
    }
    if (dialog.parentNode) {
      document.body.removeChild(dialog);
    }
  }

  /**
   * 편집 저장
   */
  saveEdit(match, originalText, newText) {
    if (originalText === newText) {
      return; // 변경사항 없음
    }

    try {
      const char = this.risuAPI.getChar();
      const chatPage = char.chatPage || 0;
      const messages = char.chats[chatPage].message;
      const messageData = messages[match.chatIndex].data;

      // 텍스트 교체
      const updated =
        messageData.slice(0, match.start) +
        newText +
        messageData.slice(match.end);

      messages[match.chatIndex].data = updated;
      this.risuAPI.setChar(char);

      // 페이지 새로고침
      // location.reload();
    } catch (error) {
      console.error("[EditManager] Error saving edit:", error);
      alert("편집 저장 중 오류가 발생했습니다.");
    }
  }

  /**
   * 삭제 버튼 클릭 핸들러
   */
  handleDeleteClick() {
    if (!this.currentMatches || this.currentMatches.length === 0) {
      return;
    }

    // 단일 매칭: 바로 삭제
    if (this.currentMatches.length === 1) {
      this.deleteMatch(this.currentMatches[0]);
    } else {
      // 다중 매칭: Modal 표시
      this.showDeleteSelectionModal(this.currentMatches, this.currentSelectedText);
    }
  }

  /**
   * 삭제 선택 모달 표시
   */
  showDeleteSelectionModal(matches, selectedText) {
    const s = editStyles;
    const modal = document.createElement("div");
    modal.className = s.selectionModal;
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    
    // 모바일 환경에서 width 조정
    if (this.isMobileDevice) {
      modal.style.width = "90vw";
      modal.style.maxWidth = "600px";
    }

    // 헤더 HTML 생성
    const headerHTML = `
      <div class="${s.selectionModalHeader}">
        <div class="${s.selectionModalTitleRow}">
          <h3 class="${s.selectionModalTitle}">
            다음 중 삭제할 항목을 선택하세요
            <span class="${s.selectionModalTitleCount}">(${matches.length}개)</span>
          </h3>
          <button class="${s.selectionModalCancelBtn}" data-action="close">취소</button>
        </div>
        <div class="${s.selectionModalSelectedTextContainer}">
          <div class="${s.selectionModalSelectedTextLabel}">선택된 텍스트</div>
          <div class="${s.selectionModalSelectedText}">"${this.escapeHtml(selectedText)}"</div>
        </div>
      </div>
    `;

    // 매칭 항목 HTML 생성
    const char = this.risuAPI.getChar();
    const chatPage = char.chatPage || 0;
    const messages = char.chats[chatPage].message;
    const messageData = messages[matches[0].chatIndex]?.data || "";

    const itemsHTML = matches
      .map((match, index) => {
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
          <div class="${s.selectionModalItem}" data-action="delete" data-index="${index}">
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
      })
      .join("");

    modal.innerHTML = `
      ${headerHTML}
      <div class="${s.selectionModalBody}">
        ${itemsHTML}
      </div>
    `;

    document.body.appendChild(modal);

    // 이벤트 리스너 연결
    this.attachDeleteSelectionModalListeners(modal, matches);
  }

  /**
   * 삭제 선택 모달 이벤트 리스너 연결
   */
  attachDeleteSelectionModalListeners(modal, matches) {
    const handleClick = (e) => {
      let target = e.target;
      while (target && target !== modal) {
        const action = target.getAttribute("data-action");
        if (action === "delete") {
          const index = parseInt(target.getAttribute("data-index"), 10);
          if (!isNaN(index) && matches[index]) {
            this.closeSelectionModal(modal);
            setTimeout(() => {
              this.deleteMatch(matches[index]);
            }, 100);
          }
          return;
        } else if (action === "close") {
          this.closeSelectionModal(modal);
          return;
        }
        target = target.parentElement;
      }
    };

    modal.addEventListener("click", handleClick);

    // Cleanup 함수 저장
    modal._cleanup = () => {
      modal.removeEventListener("click", handleClick);
    };
  }

  /**
   * 매칭 항목 삭제
   */
  async deleteMatch(match) {
    // 삭제 확인
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      const char = this.risuAPI.getChar();
      if (!char || !char.chats) {
        return;
      }

      const chatPage = char.chatPage || 0;
      if (!char.chats[chatPage]) {
        return;
      }

      const messages = char.chats[chatPage].message;
      if (!messages || !messages[match.chatIndex]) {
        return;
      }

      const messageData = messages[match.chatIndex].data;

      // 텍스트 삭제
      const updated =
        messageData.slice(0, match.start) +
        messageData.slice(match.end);


      // 삭제 애니메이션 실행
      const targetElement = this.findElementByMatch(match);
      await this.performDeleteAnimation(targetElement || window.document.body);

      messages[match.chatIndex].data = updated;
      this.risuAPI.setChar(char);
      // 페이지 새로고침
      // location.reload();
    } catch (error) {
      console.error("[EditManager] Error deleting match:", error);
      alert("삭제 중 오류가 발생했습니다.");
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

      // data-chat-index와 data-chat-id를 사용하여 요소 찾기
      const chatIndex = match.chatIndex;
      const chatId = message.id;

      // 가능한 선택자들
      const selectors = [
        `[data-chat-index="${chatIndex}"][data-chat-id="${chatId}"]`,
        `[data-chat-index="${chatIndex}"]`,
      ];

      for (const selector of selectors) {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          // 요소의 텍스트 내용 확인
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
    
    // 중앙 기준 X, Y 좌표
    const centerX = rect.left + window.scrollX + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2 - 25;
    
    const s = editStyles;
    
    // 좌측 이미지 생성
    const imgLeft = document.createElement('img');
    imgLeft.src = DEL_IMG_LEFT;
    imgLeft.width = 100;
    imgLeft.height = 100;
    imgLeft.className = `${s.floatingDeleteImg} ${s.floatingDeleteImgFromLeft}`;
    imgLeft.style.top = `${centerY}px`;
    imgLeft.style.left = `${centerX - 25}px`;
    container.appendChild(imgLeft);
    
    // 우측 이미지 생성
    const imgRight = document.createElement('img');
    imgRight.src = DEL_IMG_RIGHT;
    imgRight.width = 100;
    imgRight.height = 100;
    imgRight.className = `${s.floatingDeleteImg} ${s.floatingDeleteImgFromRight}`;
    imgRight.style.top = `${centerY}px`;
    imgRight.style.left = `${centerX + 25}px`;
    container.appendChild(imgRight);
    
    // 순차 등장
    requestAnimationFrame(() => {
      imgLeft.classList.add(s.floatingDeleteImgAppear);
    });
    await new Promise(r => setTimeout(r, 400));
    requestAnimationFrame(() => {
      imgRight.classList.add(s.floatingDeleteImgAppear);
    });
    
    // 애니메이션 완료 대기 (이미지들이 중앙으로 모이는 시간)
    await new Promise(r => setTimeout(r, 800));
    
    // 이미지들 제거
    if (imgLeft.parentNode) {
      imgLeft.remove();
    }
    if (imgRight.parentNode) {
      imgRight.remove();
    }
    
    // 이미지 제거 후 추가 대기 (애니메이션 완전 종료)
    await new Promise(r => setTimeout(r, 400));
    
    // // 애니메이션이 완전히 끝난 후 요소 제거
    // if (element.parentNode) {
    //   element.remove();
    // }
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

