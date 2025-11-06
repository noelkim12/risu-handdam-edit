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

export class EditManager {
  constructor() {
    this.risuAPI = RisuAPI.getInstance();
    this.pluginArgs = new PluginArgs();
    this.textSelectionHandler = new TextSelectionHandler(this);
    this.elementEditHandler = new ElementEditHandler(this);
    this.editMode = "selection"; // 기본값: "selection"
    this.floatingButton = null;
    this.selectionModal = null;
    this.currentSelectionRange = null; // 현재 선택된 텍스트 범위
    this.currentMatches = null; // 현재 매칭된 모든 결과
    this.currentSelectedText = null; // 현재 선택된 텍스트
    this._scrollHandler = null;
    this._clickHandler = null;
    this._modeChangeCallbacks = []; // 모드 변경 콜백 함수들
  }

  /**
   * 편집 모드 초기화
   */
  initialize() {
    // plugin-config에서 editMode 읽어오기
    const savedMode = this.pluginArgs.editMode || "selection";
    this.setEditMode(savedMode, true); // 저장하지 않고 모드만 설정 (이미 저장되어 있음)
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
   * 텍스트 선택으로부터 편집 시작
   */
  startEditFromSelection(match, position, selectionRange = null, allMatches = null, selectedText = null) {
    // 선택 영역 저장 (나중에 해제하기 위해)
    this.currentSelectionRange = selectionRange;
    this.currentMatches = allMatches; // 모든 매칭 정보 저장
    this.currentSelectedText = selectedText; // 선택된 텍스트 저장
    
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
    const button = document.createElement("button");
    button.className = s.floatingActionButton;
    button.title = "편집";
    button.setAttribute("data-action", "edit");
    
    // 아이콘과 텍스트를 함께 표시
    button.innerHTML = `
      <span style="margin-right: 6px; font-size: 14px;">✏️</span>
      <span>편집</span>
    `;
    
    // 버튼 너비 계산 (텍스트 길이에 맞춰 동적 조정)
    const buttonWidth = 80; // "편집" 텍스트 기준
    const buttonHeight = 32;
    const buttonLeft = position.left + position.width / 2 - buttonWidth / 2;
    
    // 위치만 인라인 스타일로 설정 (CSS Modules로는 동적 위치 설정 불가)
    button.style.top = `${position.top - buttonHeight - 8}px`;
    button.style.left = `${buttonLeft}px`;
    button.style.width = `${buttonWidth}px`;
    button.style.height = `${buttonHeight}px`;

    button.addEventListener("click", (e) => {
      e.stopPropagation();
      onClick();
      this.hideFloatingButton();
    });

    document.body.appendChild(button);
    this.floatingButton = button;

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
      // 버튼이나 버튼의 자식 요소 클릭은 무시
      if (button.contains(e.target)) {
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

    window.addEventListener("scroll", handleScroll, { once: true });
    document.addEventListener("click", handleClick, { once: true });
    
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
    
    // 선택 관련 정보 정리
    this.currentSelectionRange = null;
    this.currentMatches = null;
    this.currentSelectedText = null;
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
    
    // 너비 계산: 최소 400px, 최대 90vw, 텍스트 길이에 따라 조정
    const minWidth = 400;
    const maxWidth = Math.min(window.innerWidth * 0.9, 800);
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
      // this.risuAPI.setChar(char);

      // 페이지 새로고침 또는 DOM 업데이트
      // location.reload();
    } catch (error) {
      console.error("[EditManager] Error saving edit:", error);
      alert("편집 저장 중 오류가 발생했습니다.");
    }
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

