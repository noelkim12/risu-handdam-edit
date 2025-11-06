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
    
    // 이벤트 리스너를 바인딩하여 저장 (removeEventListener를 위해 필요)
    this._boundHandleSelection = this.handleSelection.bind(this);
  }

  /**
   * 텍스트 선택 핸들러 활성화
   */
  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;
    document.addEventListener("mouseup", this._boundHandleSelection);
    document.addEventListener("keyup", this._boundHandleSelection);
    document.addEventListener("dblclick", this._boundHandleSelection);
  }

  /**
   * 텍스트 선택 핸들러 비활성화
   */
  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;
    document.removeEventListener("mouseup", this._boundHandleSelection);
    document.removeEventListener("keyup", this._boundHandleSelection);
    document.removeEventListener("dblclick", this._boundHandleSelection);
    this.clearSelection();
  }

  /**
   * 텍스트 선택 처리
   */
  handleSelection() {
    // 이미 Floating Button이 표시되어 있으면 처리하지 않음
    if (this.editManager.floatingButton) {
      return;
    }

    // 기존 타임아웃 취소
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
    }

    // 짧은 지연 후 처리 (선택이 완료될 때까지 대기)
    this.selectionTimeout = setTimeout(() => {
      // 다시 한 번 체크 (타임아웃 동안 버튼이 표시되었을 수 있음)
      if (this.editManager.floatingButton) {
        return;
      }

      const selection = window.getSelection();
      
      if (!selection || selection.rangeCount === 0) {
        // this.clearSelection();
        return;
      }

      const range = selection.getRangeAt(0);
      const selectedText = selection.toString().trim();

      // 최소 길이 검증
      if (selectedText.length < MIN_SELECTION_LENGTH) {
        // this.clearSelection();
        return;
      }

      // 선택된 텍스트가 있는 경우
      if (selectedText.length > 0) {
        this.processSelection(selectedText, range);
      } else {
        // this.clearSelection();
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
    
    // 텍스트 선택 해제
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }
}

