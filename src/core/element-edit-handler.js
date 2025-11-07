/**
 * 요소 기반 편집 핸들러
 * 기존 HTML Element 단위 편집 기능
 */

import { RisuAPI } from "./risu-api.js";
import { findOriginalRangeFromHtml } from "../utils/text-matcher.js";
import { PluginArgs } from "./plugin-config.js";
import { elementEditStyles } from "../ui/styles/index.js";

const TARGET_SELECTOR = [
  "span.text > h3",
  "span.text > h2",
  "span.text > h1",
  "span.text > p",
  "span.text > ul",
  "span.text > ol",
  "span.text > div h3",
  "span.text > div h2",
  "span.text > div h1",
  "span.text > div p",
  "span.text > div ul",
  "span.text > div ol",
  "span.text div.x-risu-regex-quote-block",
  "span.text div.x-risu-regex-thought-block",
  "span.text div.x-risu-regex-sound-block",
  "span.text div.x-risu-message",
  "div.x-risu-lb-nai-character-tags",
  "div.x-risu-lb-nai-comp-tags",
];

export class ElementEditHandler {
  constructor(editManager) {
    this.editManager = editManager;
    this.risuAPI = RisuAPI.getInstance();
    this.pluginArgs = new PluginArgs();
    this.intersectionObserver = null;
    this.mutationObserver = null;
    this.createdButtons = [];
    this.excludeBotNames = [];
  }

  // ==================== 활성화/비활성화 ====================

  /**
   * 요소 기반 편집 활성화
   */
  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;

    // 제외할 봇 이름 가져오기
    const excludeBotStr = this.pluginArgs.excludeBotName;
    this.excludeBotNames = excludeBotStr
      ? excludeBotStr.split(",").map((s) => s.trim())
      : [];

    // 옵저버 시작
    this.startObserver();
  }

  /**
   * 요소 기반 편집 비활성화
   */
  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;

    // 옵저버 정리
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    document.querySelectorAll(".hddm-btn-appended").forEach(_el => _el.classList.remove("hddm-btn-appended"))
    // 생성된 버튼 제거
    this.createdButtons.forEach((btn) => btn?.remove());
    this.createdButtons = [];
  }

  // ==================== 옵저버 ====================

  /**
   * 옵저버 시작
   */
  startObserver() {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.mutationObserver) this.mutationObserver.disconnect();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              const element = entry.target;
              if (
                this.isElementVisible(element) &&
                !element.classList.contains("hddm-btn-appended")
              ) {
                this.addEditButtonToElement(element);
              }
            }, 100);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // 기존 요소들에 대해 IntersectionObserver 적용 및 현재 보이는 요소에 버튼 추가
    const existingContainers = document.querySelectorAll(
      TARGET_SELECTOR.join(", ")
    );
    existingContainers.forEach((container) => {
      this.intersectionObserver.observe(container);

      // 현재 화면에 보이는 요소는 즉시 버튼 추가
      if (
        this.isElementVisible(container) &&
        !container.classList.contains("hddm-btn-appended")
      ) {
        this.addEditButtonToElement(container);
      }
    });

    // 새로운 요소 감지를 위한 MutationObserver
    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldReinitialize = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          if (
            mutation.addedNodes.length > 5 ||
            mutation.removedNodes.length > 5
          ) {
            shouldReinitialize = true;
          }

          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              try {
                if (node?.classList && this.isTargetElement(node)) {
                  this.intersectionObserver.observe(node);
                }
              } catch (error) {}
              try {
                const childContainers = node.querySelectorAll(
                  TARGET_SELECTOR.join(", ")
                );
                childContainers.forEach((container) => {
                  this.intersectionObserver.observe(container);
                });
              } catch (error) {}
            }
          });
        }
      });

      if (shouldReinitialize) {
        setTimeout(() => this.startObserver(), 300);
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  // ==================== 요소 검증 ====================

  /**
   * 요소가 타겟 요소인지 확인
   */
  isTargetElement(element) {
    if (!element || !element.classList) return false;

    const selectors = TARGET_SELECTOR.map((selector) => selector.trim());

    for (const selector of selectors) {
      if (this._matchesSelector(element, selector)) {
        return true;
      }
    }

    if (element.className && element.className.includes("message")) {
      return true;
    }

    return false;
  }

  /**
   * 요소가 화면에 보이는지 확인
   */
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  // ==================== 버튼 추가 ====================

  /**
   * 요소에 편집 버튼 추가
   */
  addEditButtonToElement(element) {
    // 예외처리: 봇 이름 확인
    const char = this.risuAPI.getChar();
    if (!char) return;
    if (this.excludeBotNames.includes(char.name)) return;

    const chatPage = char.chatPage || 0;
    if (!char.chats || !char.chats[chatPage] || !char.chats[chatPage].message || char.chats[chatPage].message.length === 0) {
      return;
    }

    // 텍스트 내용 확인
    const textContent = this._extractTextContent(element);
    if (!textContent) {
      element.classList.add("hddm-btn-appended");
      return;
    }

    let closestRisuChatDiv = element.closest("div.risu-chat");
    let chatIdx = -1;
    if (closestRisuChatDiv) {
      chatIdx = closestRisuChatDiv.getAttribute("data-chat-index");
    }

    if (chatIdx === -1) return;

    // 버튼 래퍼 생성 및 추가
    const wrapper = this._createEditButtonWrapper(element);
    element.appendChild(wrapper);
    this.createdButtons.push(wrapper);
    element.classList.add("hddm-btn-appended");
  }

  // ==================== 편집 ====================

  /**
   * 단일 채팅 편집
   */
  editSingleChat(element) {
    const targetElement = element.closest(
      "h1, h2, h3, p, li, div.x-risu-regex-quote-block, div.x-risu-regex-thought-block, div.x-risu-regex-sound-block, div.x-risu-message, div.x-risu-lb-nai-character-tags, div.x-risu-lb-nai-comp-tags, ol, ul"
    );
    if (!targetElement) return;

    if (targetElement.classList.contains("hddm-editing")) return;

    element.remove();

    const tempElement = targetElement.cloneNode(true);
    const buttons = tempElement.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    const originalText = this.convertHTMLToEditFormat(targetElement);
    const originalHTML = tempElement.innerHTML;

    const { chatIndex, chatId } = this._getChatInfo(targetElement);
    if (!chatIndex) return;

    targetElement.classList.add("hddm-editing");

    const { textarea, buttonContainer } = this._createEditUI(
      targetElement,
      originalText,
      originalHTML,
      chatIndex,
      chatId
    );

    targetElement.innerHTML = "";
    targetElement.appendChild(textarea);
    targetElement.appendChild(buttonContainer);

    textarea.focus();
    textarea.select();
  }

  /**
   * 편집 저장
   */
  saveSingleChat(textarea, targetElement, originalText, originalHTML, hit) {
    const newText = textarea.value;

    if (newText === originalText) {
      this.cancelEdit(targetElement, originalText, originalHTML);
      return;
    }

    let chatId = textarea.getAttribute("data-chat-id");
    let chatIndex = textarea.getAttribute("data-chat-index");

    const newHTML = this.convertEditFormatToHTML(newText);

    const char = this.risuAPI.getChar();
    const chatPage = char.chatPage || 0;
    let oldFullText = char.chats[chatPage].message[chatIndex].data;

    if (hit) {
      let { start, end } = hit;
      const updated =
        oldFullText.slice(0, start) + newText + oldFullText.slice(end);
      char.chats[char.chatPage].message[chatIndex].data = updated;
    } else {
      let replacedText = oldFullText.replaceAll(originalText, newText);
      char.chats[char.chatPage].message[chatIndex].data = replacedText;
    }

    this.risuAPI.setChar(char);

    targetElement.classList.remove("hddm-editing");
    targetElement.innerHTML = newHTML;

    this._appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 취소
   */
  cancelEdit(targetElement, originalText, originalHTML) {
    targetElement.classList.remove("hddm-editing");
    targetElement.innerHTML = originalHTML;
    this._appendEditButtonToElement(targetElement);
  }

  // ==================== 변환 ====================

  /**
   * HTML을 편집 가능한 포맷으로 변환
   */
  convertHTMLToEditFormat(element) {
    const cloned = element.cloneNode(true);

    const buttons = cloned.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        if (tagName === "ruby") {
          const baseText = Array.from(node.childNodes)
            .filter(
              (n) =>
                n.nodeType === Node.TEXT_NODE ||
                (n.nodeType === Node.ELEMENT_NODE &&
                  n.tagName.toLowerCase() !== "rt")
            )
            .map((n) => n.textContent)
            .join("");

          const rtNode = node.querySelector("rt");
          const rubyText = rtNode ? rtNode.textContent : "";

          return `:${baseText}[${rubyText}]:`;
        } else if (tagName === "br") {
          return "";
        } else {
          return Array.from(node.childNodes).map(processNode).join("");
        }
      }
      return "";
    };

    return processNode(cloned).trim();
  }

  /**
   * 편집 포맷을 HTML로 변환
   */
  convertEditFormatToHTML(text) {
    let result = text.replace(
      /:([^\[\]:]+)\[([^\]]+)\]:/g,
      "<ruby>$1<rt>$2</rt></ruby>"
    );

    result = result.replace(/\n/g, "<br>\n");

    return result;
  }

  // ==================== Private Helper Methods ====================

  /**
   * CSS Selector 매칭
   */
  _matchesSelector(element, selector) {
    try {
      const parts = selector.split(" ");
      const lastPart = parts[parts.length - 1];

      const tagMatch = lastPart.match(/^(\w+)/);
      const classMatch = lastPart.match(/\.([\w-]+)/);

      if (!tagMatch) return false;

      const tagName = tagMatch[1];
      const className = classMatch ? classMatch[1] : null;

      if (element.tagName.toLowerCase() !== tagName) return false;

      if (className && !element.classList.contains(className)) return false;

      if (parts.length > 1) {
        const parentSelector = parts.slice(0, -1).join(" ");
        const parentElement = element.parentElement;

        if (
          parentElement &&
          !this._matchesParentSelector(parentElement, parentSelector)
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Parent Selector 매칭
   */
  _matchesParentSelector(element, parentSelector) {
    try {
      const parts = parentSelector.split(".");
      const tagName = parts[0];
      const className = parts[1];

      if (element.tagName.toLowerCase() !== tagName) return false;
      if (className && !element.classList.contains(className)) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 텍스트 내용 추출
   */
  _extractTextContent(element) {
    const tempElement = element.cloneNode(true);
    const risuButtons = tempElement.querySelectorAll("button");
    risuButtons.forEach((btn) => btn.remove());
    return tempElement.textContent.trim();
  }

  /**
   * 채팅 정보 가져오기
   */
  _getChatInfo(targetElement) {
    const chatContainer = targetElement.closest(".chat-message-container");
    let chatIndex = "";
    let chatId = "";

    if (chatContainer) {
      const dataDiv = chatContainer.querySelector(
        "div[data-chat-index], div[data-chat-id]"
      );
      if (dataDiv) {
        chatIndex = dataDiv.getAttribute("data-chat-index") || "";
        chatId = dataDiv.getAttribute("data-chat-id") || "";
      }
    }

    return { chatIndex, chatId };
  }

  /**
   * 편집 버튼 래퍼 생성
   */
  _createEditButtonWrapper(element) {
    const s = elementEditStyles;

    // 요소를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // 버튼 래퍼 생성
    const wrapper = document.createElement("div");
    wrapper.className = `hddm-button-wrapper ${s.buttonWrapper}`;

    // 편집 버튼 생성
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerHTML = "✏️";
    editButton.title = "수정";
    editButton.className = `chat-modi-btn hddm-edit-button ${s.editButton}`;
    editButton.onclick = () => this.editSingleChat(editButton);

    wrapper.appendChild(editButton);

    // 호버 이벤트
    this._attachHoverEvents(element, wrapper);

    return wrapper;
  }

  /**
   * 호버 이벤트 연결
   */
  _attachHoverEvents(element, wrapper) {
    element.addEventListener("mouseenter", () => {
      wrapper.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapper.style.opacity = "0";
    });
  }

  /**
   * 편집 UI 생성 (textarea + 버튼)
   */
  _createEditUI(targetElement, originalText, originalHTML, chatIndex, chatId) {
    const rect = targetElement.getBoundingClientRect();
    const actualWidth = rect.width + 10;
    const actualHeight = Math.max(rect.height + 10, 60);

    const char = this.risuAPI.getChar();
    const chatPage = char.chatPage || 0;
    const currentChatMessage = char.chats[chatPage].message[chatIndex].data;
    const hit = findOriginalRangeFromHtml(currentChatMessage, originalText, {
      extendToEOL: false,
      snapStartToPrevEOL: false,
    });

    let taValue = "";
    if (hit) taValue = currentChatMessage.slice(hit.start, hit.end);
    else taValue = originalText;

    // Textarea 생성
    const s = elementEditStyles;
    const textarea = document.createElement("textarea");
    textarea.value = taValue;
    textarea.setAttribute("data-chat-index", chatIndex);
    textarea.setAttribute("data-chat-id", chatId);
    textarea.className = `chat-edit-textarea ${s.textarea}`;
    textarea.style.width = `${actualWidth}px`;
    textarea.style.height = `${actualHeight}px`;

    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement("div");
    buttonContainer.className = `chat-edit-buttons ${s.buttonContainer}`;

    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.className = `chat-save-btn ${s.saveButton}`;
    saveButton.onclick = () =>
      this.saveSingleChat(textarea, targetElement, taValue, originalHTML, hit);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.className = `chat-cancel-btn ${s.cancelButton}`;
    cancelButton.onclick = () =>
      this.cancelEdit(targetElement, originalText, originalHTML);

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    return { textarea, buttonContainer };
  }

  /**
   * 편집 버튼 다시 추가 (저장/취소 후)
   */
  _appendEditButtonToElement(element) {
    const wrapper = this._createEditButtonWrapper(element);
    element.appendChild(wrapper);
    this.createdButtons.push(wrapper);
  }
}
