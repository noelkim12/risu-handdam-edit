import { PLUGIN_NAME } from "../../constants";
import { MENU_BUTTON_TAG } from "./ui/menu-button";
import { RisuAPI } from "../../core/risu-api";
import { EditManager } from "../../core/edit-manager.js";
import { baseStyles } from "../styles/index.js";

// 버거 메뉴 셀렉터 상수
const BURGER_SELECTOR = "div.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md";

// 메인 애플리케이션 클래스
export class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.pluginWindow = null;
      this.pluginWindowRoot = document.createElement("div");
      this.editManager = null;
      this.pluginWindowRoot.className = baseStyles.container;
      this._positionCallbackRegistered = false;
    }

    async initialize() {
      this.risuAPI = RisuAPI.getInstance();

      if (!this.risuAPI) {
        console.log(`[${PLUGIN_NAME}] RisuAPI is not initialized`);
        return false;
      }

      // EditManager 초기화
      this.editManager = new EditManager();
      this.editManager.initialize();

      // 위치 변경 콜백 한 번만 등록
      this.setupPositionChangeCallback();

      // UI 초기화
      this.startObserver();

      console.log(`[${PLUGIN_NAME}] plugin loaded`);
      return true;
    }

    /**
     * 위치 변경 콜백 설정 (앱 생명주기 동안 한 번만)
     */
    setupPositionChangeCallback() {
      if (!this.editManager || this._positionCallbackRegistered) return;

      this._positionCallbackRegistered = true;
      this.editManager.onButtonPositionChange(() => {
        const burgerEl = document.querySelector(BURGER_SELECTOR);
        if (burgerEl) {
          this.repositionButtons(burgerEl);
        }
      });
    }

    startObserver() {
      if (this.observer) this.observer.disconnect();
      this.observer = new MutationObserver(() => {
        setTimeout(() => this.attachButton(), 100);
      });
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
      setTimeout(() => this.attachButton(), 500);
    }

    attachButton() {
      const burgerEl = document.querySelector(BURGER_SELECTOR);
      if (burgerEl && !burgerEl.classList.contains(`${PLUGIN_NAME}-btn-class`)) {
        this.createToggleButtons(burgerEl);
        burgerEl.classList.add(`${PLUGIN_NAME}-btn-class`);
      }
    }

    /**
     * 토글 버튼 생성 (모드 + 위치)
     */
    createToggleButtons(container) {
      const row = document.createElement("div");
      row.className = "plugin-toggle-row";
      row.style.cssText = `
        width: 200px;
        display: flex;
        gap: 8px;
        margin-top: 8px;
      `;

      // 모드 토글
      const modeBtn = this.createToggleButton({
        icon: () => this.editManager.getEditMode() === "selection" ? "📝" : "✏️",
        label: "모드",
        value: () => this.editManager.getEditMode() === "selection" ? "텍스트" : "요소",
        hoverColor: "green",
        onClick: () => this.editManager.toggleEditMode(),
        onChange: (cb) => this.editManager.onModeChange(cb)
      });

      // 위치 토글
      const posBtn = this.createToggleButton({
        icon: () => this.editManager.getButtonPosition() === "top" ? "⬆️" : "⬇️",
        label: "위치",
        value: () => this.editManager.getButtonPosition() === "top" ? "상단" : "하단",
        hoverColor: "blue",
        onClick: () => this.editManager.toggleButtonPosition(),
        onChange: (cb) => this.editManager.onButtonPositionChange(cb)
      });

      row.appendChild(modeBtn);
      row.appendChild(posBtn);

      // 현재 위치에 따라 추가
      this.insertButton(container, row);
    }

    /**
     * 토글 버튼 생성 헬퍼
     */
    createToggleButton({ icon, label, value, hoverColor, onClick, onChange }) {
      const btn = document.createElement("div");
      btn.className = `flex items-center cursor-pointer hover:text-${hoverColor}-500 transition-colors`;
      btn.style.cssText = `
        flex: 1;
        padding: 8px 12px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
      `;

      const update = () => {
        btn.innerHTML = `
          <div style="display: flex; align-items: center; gap: 6px; width: 100%;">
            <span style="font-size: 14px;">${icon()}</span>
            <div style="flex: 1;">
              <div style="font-size: 11px; color: rgba(255, 255, 255, 0.5);">${label}</div>
              <div style="font-size: 13px; font-weight: 500;">${value()}</div>
            </div>
          </div>
        `;
      };

      btn.addEventListener("click", onClick);
      update();
      onChange(update);

      return btn;
    }

    /**
     * 위치에 따라 버튼 삽입
     */
    insertButton(container, button) {
      const position = this.editManager?.getButtonPosition() || "bottom";
      if (position === "top") {
        container.insertBefore(button, container.firstChild);
      } else {
        container.appendChild(button);
      }
    }

    /**
     * 버튼 위치 재배치
     */
    repositionButtons(container) {
      const pluginButtons = Array.from(container.children).filter(child =>
        child.classList.contains('plugin-toggle-row')
      );

      pluginButtons.forEach(button => {
        button.remove();
        this.insertButton(container, button);
      });
    }

    destroy() {
      if (this.observer) this.observer.disconnect();
      if (this.editManager) {
        this.editManager.destroy();
      }
      console.log(`${PLUGIN_NAME} 언로드`);
    }
  }
