/**
 * 편집 관리자
 * 편집 기능의 핵심 로직을 관리합니다.
 */

import { RisuAPI } from "./risu-api.js";
import { findOriginalRangeFromHtml } from "../utils/text-matcher.js";
import { TextSelectionHandler } from "./text-selection-handler.js";
import { ElementEditHandler } from "./element-edit-handler.js";
import { PluginArgs } from "./plugin-config.js";

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
   * 간단한 선택 모달 (임시 구현)
   */
  showSimpleSelectionModal(matches, selectedText, position, messageData = "") {
    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 600px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    `;

    modal.innerHTML = `
      <div style="
        position: sticky;
        top: 0;
        background: white;
        padding: 20px 20px 16px 20px;
        border-bottom: 1px solid #e5e7eb;
        z-index: 1;
        flex-shrink: 0;
      ">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #111827; line-height: 1.4;">
            다음 중 편집할 항목을 선택하세요
            <span style="color: #6b7280; font-weight: 500; font-size: 14px;">(${matches.length}개)</span>
          </h3>
          <button onclick="window.__editManagerCloseModal__()" 
                  style="
                    padding: 6px 12px;
                    background: #f3f4f6;
                    color: #374151;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.2s;
                    flex-shrink: 0;
                    margin-left: 16px;
                  "
                  onmouseover="this.style.background='#e5e7eb'; this.style.borderColor='#9ca3af'"
                  onmouseout="this.style.background='#f3f4f6'; this.style.borderColor='#d1d5db'">
            취소
          </button>
        </div>
        <div style="
          padding: 12px;
          background: #f9fafb;
          border-radius: 6px;
          border: 1px solid #e5e7eb;
        ">
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px; font-weight: 500;">
            선택된 텍스트
          </div>
          <div style="font-size: 14px; color: #111827; word-break: break-word;">
            "${selectedText}"
          </div>
        </div>
      </div>
      <div style="
        padding: 20px;
        overflow-y: auto;
        flex: 1;
      ">
        ${matches
          .map((match, index) => {
            // 컨텍스트 시작 위치 (findAllMatches에서 제공)
            const contextStart = match.contextStart ?? Math.max(0, match.start - 30);
            
            // 하이라이트된 컨텍스트 생성
            const highlightedContext = this.highlightMatchInContext(
              match.context,
              match.start,
              match.end,
              contextStart
            );
            
            // 라인 번호 계산
            const lineNumber = messageData ? this.calculateLineNumber(messageData, match.start) : null;
            
            return `
          <div style="
            padding: 12px 16px;
            margin-bottom: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s;
            background: white;
          "
               onmouseover="this.style.background='#f9fafb'; this.style.borderColor='#d1d5db'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'"
               onmouseout="this.style.background='white'; this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'"
               onclick="window.__editManagerSelectMatch__(${index})">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
            ">
              <div style="
                font-weight: 600;
                color: #111827;
                font-size: 14px;
              ">
                매칭 ${index + 1}
              </div>
              ${lineNumber ? `
              <div style="
                font-size: 12px;
                color: #6b7280;
                background: #f3f4f6;
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 500;
              ">
                ${lineNumber}번째 줄 부근
              </div>
              ` : ''}
            </div>
            <div style="
              color: #6b7280;
              font-size: 13px;
              line-height: 1.6;
              word-break: break-word;
            ">
              ${highlightedContext || "컨텍스트 없음"}
            </div>
          </div>
        `;
          })
          .join("")}
      </div>
    `;

    document.body.appendChild(modal);

    // 전역 함수로 선택 처리
    window.__editManagerSelectMatch__ = (index) => {
      const selectedMatch = matches[index];
      document.body.removeChild(modal);
      delete window.__editManagerSelectMatch__;
      delete window.__editManagerCloseModal__;
      this.openEditDialog(selectedMatch);
    };

    window.__editManagerCloseModal__ = () => {
      document.body.removeChild(modal);
      delete window.__editManagerSelectMatch__;
      delete window.__editManagerCloseModal__;
    };
  }

  /**
   * Floating Action Button 표시
   */
  showFloatingButton(position, onClick) {
    // 기존 버튼 제거
    this.hideFloatingButton();

    const button = document.createElement("button");
    // 아이콘과 텍스트를 함께 표시
    button.innerHTML = `
      <span style="margin-right: 6px; font-size: 14px;">✏️</span>
      <span>편집</span>
    `;
    button.title = "편집";
    
    // 버튼 너비 계산 (텍스트 길이에 맞춰 동적 조정)
    const buttonWidth = 80; // "편집" 텍스트 기준
    const buttonHeight = 32;
    const buttonLeft = position.left + position.width / 2 - buttonWidth / 2;
    
    button.style.cssText = `
      position: absolute;
      top: ${position.top - buttonHeight - 8}px;
      left: ${buttonLeft}px;
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      border-radius: 8px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
      color: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      padding: 0 12px;
      box-sizing: border-box;
    `;

    button.addEventListener("mouseenter", () => {
      button.style.background = "#f8f9fa";
      button.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.background = "#ffffff";
      button.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)";
    });

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

    // 편집 다이얼로그 표시
    const dialog = document.createElement("div");
    dialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10001;
      min-width: 400px;
    `;

    const textarea = document.createElement("textarea");
    textarea.value = selectedText;
    textarea.style.cssText = `
      width: 100%;
      min-height: 100px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: inherit;
      font-size: 14px;
      box-sizing: border-box;
      resize: vertical;
    `;

    const buttonContainer = document.createElement("div");
    buttonContainer.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: 15px;
      justify-content: flex-end;
    `;

    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.style.cssText = `
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.style.cssText = `
      padding: 8px 16px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;

    saveButton.addEventListener("click", () => {
      const newText = textarea.value;
      this.saveEdit(match, selectedText, newText);
      document.body.removeChild(dialog);
    });

    cancelButton.addEventListener("click", () => {
      document.body.removeChild(dialog); 
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(saveButton);

    dialog.appendChild(textarea);
    dialog.appendChild(buttonContainer);
    document.body.appendChild(dialog);

    textarea.focus();
    textarea.select();
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

