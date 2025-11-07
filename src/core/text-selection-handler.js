/**
 * 텍스트 선택 핸들러
 * 사용자가 텍스트를 선택했을 때 처리하는 핸들러
 */

import { RisuAPI } from "./risu-api.js";
import { findAllMatches } from "../utils/text-matcher.js";

const MIN_SELECTION_LENGTH = 5;

export class TextSelectionHandler {
  constructor(editManager) {
    this.editManager = editManager;
    this.risuAPI = RisuAPI.getInstance();
    this.isEnabled = false;
    this.currentSelection = null;
    this.selectionTimeout = null;
    this.lastSelectionText = null; // 이전 selection 텍스트 저장 (변경 감지용)
    
    // 이벤트 리스너를 바인딩하여 저장 (removeEventListener를 위해 필요)
    this._boundHandleSelection = this.handleSelection.bind(this);
    this._boundHandleKeyUp = this.handleKeyUp.bind(this);
  }

  /**
   * 텍스트 선택 핸들러 활성화
   */
  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;
    document.addEventListener("mouseup", this._boundHandleSelection);
    document.addEventListener("keyup", this._boundHandleKeyUp);
    document.addEventListener("dblclick", this._boundHandleSelection);
  }

  /**
   * 텍스트 선택 핸들러 비활성화
   */
  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;
    document.removeEventListener("mouseup", this._boundHandleSelection);
    document.removeEventListener("keyup", this._boundHandleKeyUp);
    document.removeEventListener("dblclick", this._boundHandleSelection);
    this.clearSelection();
  }

  /**
   * 키보드 이벤트 처리 (shift+방향키로 selection 확장 감지)
   */
  handleKeyUp(e) {
    // shift+방향키 조합인 경우에만 처리
    const isSelectionKey = e.shiftKey && (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End"
    );

    if (isSelectionKey) {
      // shift+방향키로 selection이 확장된 경우 처리
      this.handleSelection();
    } else {
      // 일반 키 입력의 경우 기존 로직 사용
      this.handleSelection();
    }
  }

  /**
   * 텍스트 선택 처리
   */
  handleSelection() {
    // 기존 타임아웃 취소
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
    }

    // 짧은 지연 후 처리 (선택이 완료될 때까지 대기)
    this.selectionTimeout = setTimeout(() => {
      const selection = window.getSelection();
      
      if (!selection || selection.rangeCount === 0) {
        // selection이 없으면 기존 버튼 제거
        if (this.editManager.floatingButton) {
          this.editManager.hideFloatingButton();
        }
        this.lastSelectionText = null;
        return;
      }

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      // 최소 길이 검증
      if (selectedText.length < MIN_SELECTION_LENGTH) {
        // 최소 길이 미만이면 기존 버튼 제거
        if (this.editManager.floatingButton) {
          this.editManager.hideFloatingButton();
        }
        this.lastSelectionText = null;
        return;
      }

      // selection이 변경되지 않았으면 처리하지 않음 (중복 처리 방지)
      if (selectedText === this.lastSelectionText && this.editManager.floatingButton) {
        return;
      }

      // selection이 변경되었거나 새로 생성된 경우
      // 기존 Floating Button이 있으면 제거 (새로운 selection으로 업데이트)
      if (this.editManager.floatingButton) {
        this.editManager.hideFloatingButton();
      }

      // 선택된 텍스트가 있는 경우
      if (selectedText.length > 0) {
        this.lastSelectionText = selectedText;
        this.processSelection(selectedText, range);
      } else {
        this.lastSelectionText = null;
      }
    }, 100);
  }

  /**
   * 선택된 텍스트 처리
   */
  async processSelection(selectedText, range) {
    try {
      // 이미 Floating Button이 표시되어 있으면 처리하지 않음
      if (this.editManager.floatingButton) {
        return;
      }

      const char = this.risuAPI.getChar();
      if (!char || !char.chats) {
        return;
      }

      const chatPage = char.chatPage || 0;
      if (!char.chats[chatPage]) {
        return;
      }

      const messages = char.chats[chatPage].message;
      if (!messages || messages.length === 0) {
        return;
      }

      // 선택 영역에서 가장 가까운 data-chat-index 찾기
      let targetChatIndex = null;
      
      // range의 시작 컨테이너에서 시작하여 부모 요소들을 탐색
      let currentNode = range.startContainer;
      if (currentNode.nodeType === Node.TEXT_NODE) {
        currentNode = currentNode.parentElement;
      }
      
      // DOM 트리를 올라가면서 data-chat-index를 찾음
      while (currentNode && currentNode !== document.body) {
        // 직접 data-chat-index 속성을 가진 요소 찾기
        if (currentNode.hasAttribute && currentNode.hasAttribute("data-chat-index")) {
          const indexStr = currentNode.getAttribute("data-chat-index");
          const index = parseInt(indexStr, 10);
          if (!isNaN(index)) {
            targetChatIndex = index;
            break;
          }
        }
        
        // chat-message-container 내부에서 data-chat-index 찾기
        const chatContainer = currentNode.closest?.(".chat-message-container");
        if (chatContainer) {
          const dataDiv = chatContainer.querySelector("div[data-chat-index]");
          if (dataDiv) {
            const indexStr = dataDiv.getAttribute("data-chat-index");
            const index = parseInt(indexStr, 10);
            if (!isNaN(index)) {
              targetChatIndex = index;
              break;
            }
          }
        }
        
        // risu-chat 요소에서 data-chat-index 찾기
        const risuChat = currentNode.closest?.("div.risu-chat");
        if (risuChat) {
          const indexStr = risuChat.getAttribute("data-chat-index");
          const index = parseInt(indexStr, 10);
          if (!isNaN(index)) {
            targetChatIndex = index;
            break;
          }
        }
        
        currentNode = currentNode.parentElement;
      }

      // 167번 줄 근처에 로그 추가
      // data-chat-index를 찾지 못한 경우 처리하지 않음
      if (targetChatIndex === null || targetChatIndex < 0 || targetChatIndex >= messages.length) {
        // this.clearSelection();
        return;
      }

      // 해당 메시지에서만 매칭 검색
      const messageData = messages[targetChatIndex].data || "";
      
      // 선택된 텍스트로 검색 (Fuzzy 매칭이 자동으로 처리)
      const allMatches = findAllMatches(messageData, selectedText, {
        contextLength: 30,
      }).map(match => ({
        chatIndex: targetChatIndex,
        ...match,
      }));

      // 매칭 결과가 없는 경우
      if (allMatches.length === 0) {
        // this.clearSelection();
        return;
      }

      // 현재 선택 정보 저장
      this.currentSelection = {
        text: selectedText,
        range: range.cloneRange(),
        matches: allMatches,
      };

      // 매칭이 1개 이상인 경우 Floating Button 표시 (선택 유지)
      // 매칭이 1개면 바로 편집, 2개 이상이면 버튼 클릭 시 Modal 표시
      this.editManager.startEditFromSelection(
        allMatches.length === 1 ? allMatches[0] : null, // 단일 매칭만 전달
        this.getSelectionPosition(range),
        range, // 선택 영역 전달
        allMatches, // 모든 매칭 정보 전달
        selectedText // 선택된 텍스트 전달
      );
      // 선택은 유지 (버튼 클릭 시에만 해제)
    } catch (error) {
      console.error("[TextSelectionHandler] Error processing selection:", error);
      this.clearSelection();
    }
  }

  /**
   * 선택 영역의 위치 계산 (Floating Action Button 위치 결정용)
   */
  getSelectionPosition(range) {
    const rect = range.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    return {
      top: rect.top + scrollY,
      left: rect.left + scrollX,
      right: rect.right + scrollX,
      bottom: rect.bottom + scrollY,
      width: rect.width,
      height: rect.height,
    };
  }

  /**
   * 선택 해제
   */
  clearSelection() {
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = null;
    }
    this.currentSelection = null;
    this.lastSelectionText = null;
    
    // 텍스트 선택 해제
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }
}

