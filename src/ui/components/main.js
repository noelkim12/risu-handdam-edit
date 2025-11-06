import { PLUGIN_NAME } from "../../constants";
import { MENU_BUTTON_TAG } from "./ui/menu-button";
import { RisuAPI } from "../../core/risu-api";
import { EditManager } from "../../core/edit-manager.js";
import { baseStyles } from "../styles/index.js";
// import "winbox";

// 메인 애플리케이션 클래스
export class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.pluginWindow = null;
      this.pluginWindowRoot = document.createElement("div");
      this.editManager = null;
      this.modeToggleButton = null;
      // CSS Modules 클래스 사용 (자동으로 해시된 고유 클래스명)
      this.pluginWindowRoot.className = baseStyles.container;
    }
  
    async initialize() {
      // RisuAPI 싱글톤 인스턴스 가져오기
      this.risuAPI = RisuAPI.getInstance();

      if (!this.risuAPI) {
        console.log(`[${PLUGIN_NAME}] RisuAPI is not initialized`);
        return false;
      }

      // EditManager 초기화
      this.editManager = new EditManager();
      this.editManager.initialize();

      // UI 초기화
      this.initializeUI();
      this.startObserver(); 

      console.log(`[${PLUGIN_NAME}] plugin loaded`);
      return true;
    }
  
    initializeUI() {
    }
  
    openPluginWindow() {
      if (this.pluginWindow) return;
  
      // const winboxConfig = {
      //   title: `${PLUGIN_NAME}`,
      //   x: "center",
      //   y: "center",
      //   width: Math.min(1080, window.innerWidth * 0.9) + "px",
      //   height: Math.min(800, window.innerHeight * 0.8) + "px",
      //   mount: this.pluginWindowRoot,
      //   background: "#0f131a",
      //   class: ["no-full", "no-max", "no-min", "rb-box"],
      //   onclose: () => {
      //     this.pluginWindow = null;
      //     location.hash = "";
      //   },
      // };
  
      // this.pluginWindow = new WinBox(winboxConfig);
      // this.render();
    }
  
    render() {
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
      let burgerEl = document.querySelector(
        "div.absolute.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md"
      );
      if (burgerEl && !burgerEl.classList.contains(`${PLUGIN_NAME}-btn-class`)) {
        // 편집 모드 토글 버튼 추가
        this.createModeToggleButton(burgerEl);
        
        burgerEl.classList.add(`${PLUGIN_NAME}-btn-class`);
      }
    }

    /**
     * 편집 모드 토글 버튼 생성
     */
    createModeToggleButton(container) {

      const buttonDiv = document.createElement("div");
      buttonDiv.className = "flex items-center cursor-pointer hover:text-green-500 transition-colors";
      buttonDiv.style.cssText = `
        padding: 8px 12px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 8px;
      `;
      
      // 버튼 내용 업데이트 함수 
      const updateButton = (mode) => {
        const modeText = mode === "selection" ? "텍스트 선택" : "요소 기반";
        const modeIcon = mode === "selection" ? "📝" : "✏️";
        buttonDiv.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px; width: 100%;">
            <span style="font-size: 16px;">${modeIcon}</span>
            <div style="flex: 1;">
              <div style="font-size: 12px; color: rgba(255, 255, 255, 0.6);">편집 모드</div>
              <div style="font-size: 14px; font-weight: 500; margin-top: 2px;">${modeText}</div>
            </div>
            <span style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">클릭하여 전환</span>
          </div>
        `;
      };

      // 초기 모드 표시
      if (this.editManager) {
        updateButton(this.editManager.getEditMode());
      }

      // 버튼 클릭 이벤트
      buttonDiv.addEventListener("click", () => {
        if (this.editManager) {
          this.editManager.toggleEditMode();
        }
      });

      // 모드 변경 콜백 등록
      if (this.editManager) {
        this.editManager.onModeChange(updateButton);
      }

      container.appendChild(buttonDiv);
    }
  
    // plugin이 unload될 때 호출되는 함수
    destroy() {
      if (this.observer) this.observer.disconnect();
      if (this.editManager) {
        this.editManager.destroy();
      }
      console.log(`${PLUGIN_NAME} 언로드`);
    }
  }
  