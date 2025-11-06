//@name risu-handdam-edit
//@display-name risu-handdam-edit_v0.1.0
//@version 0.1.0
//@description RisuAI 한땀한땀 수정 지원 Plugin
//@arg excludeBotName string
//@arg minLength int
//@arg editMode string
//@dev-mode true
//@dev-server ws://localhost:13131
//@link https://unpkg.com/risu-handdam-edit@0.1.0/dist/risu-handdam-edit.js
var risuHanddamEdit;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* 편집 기능 관련 스타일 */

/* 요소 기반 편집 버튼 래퍼 */
.edit-module__hddmButtonWrapper--Rn4z_ {
  position: absolute;
  top: inherit;
  left: 0px;
  margin-top: 30px;
  transform: translateY(-100%);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 1000;
  display: flex;
  gap: 4px;
  padding: 4px 0;
  pointer-events: auto;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* 편집 버튼 */
.edit-module__hddmEditButton--CTBGh {
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 4px 4px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.edit-module__hddmEditButton--CTBGh:hover {
  background: rgba(255, 255, 255, 0.85);
}

/* 편집 버튼이 추가된 요소 */
.edit-module__hddmBtnAppended--Pq6xL:hover {
  outline: 1px solid rgba(100, 100, 100, 0.2);
  outline-offset: 2px;
}

/* 편집 모드 */
.edit-module__hddmEditing--XCu9x {
  /* 편집 중인 요소 스타일 */
}

/* Floating Action Button */
.edit-module__floatingActionButton--ORYa8 {
  position: absolute;
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
}

.edit-module__floatingActionButton--ORYa8:hover {
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 선택 모달 */
.edit-module__selectionModal--wWbW2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 10001;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.edit-module__selectionModalTitle--vpufb {
  margin-top: 0;
  margin-bottom: 10px;
}

.edit-module__selectionModalText--BbinV {
  margin: 10px 0;
}

.edit-module__selectionModalList--jIt4c {
  margin-top: 15px;
}

.edit-module__selectionModalItem--KOz5E {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-module__selectionModalItem--KOz5E:hover {
  background-color: #f0f0f0;
}

.edit-module__selectionModalItemContext--VHzPr {
  color: #666;
  font-size: 12px;
  margin-top: 5px;
}

.edit-module__selectionModalCancelButton--yF5cl {
  margin-top: 15px;
  padding: 8px 16px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-module__selectionModalCancelButton--yF5cl:hover {
  background: #5a6268;
}

/* 편집 다이얼로그 */
.edit-module__editDialog--lBuaQ {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 10001;
  min-width: 400px;
}

.edit-module__editDialogTextarea--gJtaB {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;
  resize: vertical;
}

.edit-module__editDialogButtons--mmUQ4 {
  display: flex;
  gap: 8px;
  margin-top: 15px;
  justify-content: flex-end;
}

.edit-module__editDialogButton--A6OJ0 {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-module__editDialogSaveButton--EFn8i {
  background: #007bff;
  color: white;
}

.edit-module__editDialogSaveButton--EFn8i:hover {
  background: #0056b3;
}

.edit-module__editDialogCancelButton--Zfll9 {
  background: #6c757d;
  color: white;
}

.edit-module__editDialogCancelButton--Zfll9:hover {
  background: #5a6268;
}

/* 편집 textarea (요소 기반 편집용) */
.edit-module__chatEditTextarea--uUxKD {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  color: #000;
  resize: both;
  margin: 4px 0;
  box-sizing: border-box;
}

.edit-module__chatEditButtons--m78HV {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.edit-module__chatSaveBtn--foYfH,
.edit-module__chatCancelBtn--Uh5JE {
  padding: 6px 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-module__chatSaveBtn--foYfH {
  background: #007bff;
}

.edit-module__chatSaveBtn--foYfH:hover {
  background: #0056b3;
}

.edit-module__chatCancelBtn--Uh5JE {
  background: #6c757d;
}

.edit-module__chatCancelBtn--Uh5JE:hover {
  background: #5a6268;
}

/* overflow 속성 복원을 위한 스타일 */
.edit-module__xRisuLbNaiCharacterCard--HnOf5,
.edit-module__xRisuLbNaiCompCard--ZHRgO {
  overflow: visible !important;
}

`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"hddmButtonWrapper": `edit-module__hddmButtonWrapper--Rn4z_`,
	"hddmEditButton": `edit-module__hddmEditButton--CTBGh`,
	"hddmBtnAppended": `edit-module__hddmBtnAppended--Pq6xL`,
	"hddmEditing": `edit-module__hddmEditing--XCu9x`,
	"floatingActionButton": `edit-module__floatingActionButton--ORYa8`,
	"selectionModal": `edit-module__selectionModal--wWbW2`,
	"selectionModalTitle": `edit-module__selectionModalTitle--vpufb`,
	"selectionModalText": `edit-module__selectionModalText--BbinV`,
	"selectionModalList": `edit-module__selectionModalList--jIt4c`,
	"selectionModalItem": `edit-module__selectionModalItem--KOz5E`,
	"selectionModalItemContext": `edit-module__selectionModalItemContext--VHzPr`,
	"selectionModalCancelButton": `edit-module__selectionModalCancelButton--yF5cl`,
	"editDialog": `edit-module__editDialog--lBuaQ`,
	"editDialogTextarea": `edit-module__editDialogTextarea--gJtaB`,
	"editDialogButtons": `edit-module__editDialogButtons--mmUQ4`,
	"editDialogButton": `edit-module__editDialogButton--A6OJ0`,
	"editDialogSaveButton": `edit-module__editDialogSaveButton--EFn8i`,
	"editDialogCancelButton": `edit-module__editDialogCancelButton--Zfll9`,
	"chatEditTextarea": `edit-module__chatEditTextarea--uUxKD`,
	"chatEditButtons": `edit-module__chatEditButtons--m78HV`,
	"chatSaveBtn": `edit-module__chatSaveBtn--foYfH`,
	"chatCancelBtn": `edit-module__chatCancelBtn--Uh5JE`,
	"xRisuLbNaiCharacterCard": `edit-module__xRisuLbNaiCharacterCard--HnOf5`,
	"xRisuLbNaiCompCard": `edit-module__xRisuLbNaiCompCard--ZHRgO`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 199:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* UpdateDialog 컴포넌트 스타일 - CSS Modules */

.update-dialog-module__udRoot--aUh0H {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.4);
}

.update-dialog-module__udCard--QaBAr {
  width: min(520px, 92vw);
  border-radius: 16px;
  padding: 20px;
  background: var(--bg, #111);
  color: var(--fg, #eaeaea);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transform: scale(0.97);
  animation: update-dialog-module__udPop--wt5vi 0.16s ease-out forwards;
}

.update-dialog-module__udTitle--VQB_3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.update-dialog-module__udTitle--VQB_3 h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.update-dialog-module__udPill--pW87e {
  font: 12px/1.8 system-ui;
  padding: 0 8px;
  border-radius: 999px;
  background: #2a2a2a;
  color: #cfcfcf;
}

.update-dialog-module__udSub--Y03Tv {
  margin: 8px 0 12px;
  color: #9aa0a6;
  font: 13px/1.5 system-ui;
}

.update-dialog-module__udList--HduVR {
  margin: 10px 0 16px;
  padding-left: 18px;
  max-height: 180px;
  overflow: auto;
}

.update-dialog-module__udList--HduVR li {
  margin: 6px 0;
}

.update-dialog-module__udFeat--JNLt9::marker {
  content: "✨ ";
}

.update-dialog-module__udFix--BQIiW::marker {
  content: "🔧 ";
}

.update-dialog-module__udPerf--zN5cv::marker {
  content: "⚡ ";
}

.update-dialog-module__udBreak--Qza1r::marker {
  content: "⚠️ ";
}

.update-dialog-module__udActions--AuWA7 {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.update-dialog-module__udBtn--EstXt {
  border: 0;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.update-dialog-module__udBtnPrimary--H3naJ {
  border: 0;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: #4f7cff;
  color: white;
}

.update-dialog-module__udBtnGhost--juD9P {
  border: 0;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  background: transparent;
  color: #cfcfcf;
}

.update-dialog-module__udBtn--EstXt:hover,
.update-dialog-module__udBtnPrimary--H3naJ:hover,
.update-dialog-module__udBtnGhost--juD9P:hover {
  filter: brightness(1.05);
}

@media (prefers-color-scheme: light) {
  :root {
    --bg: #fff;
    --fg: #111;
  }
  .update-dialog-module__udCard--QaBAr {
    background: #fff;
    color: #111;
  }
  .update-dialog-module__udPill--pW87e {
    background: #eef2ff;
    color: #1f3fb3;
  }
  .update-dialog-module__udSub--Y03Tv {
    color: #4b5563;
  }
}

@media (prefers-reduced-motion: reduce) {
  .update-dialog-module__udCard--QaBAr {
    animation: none;
    transform: none;
  }
}

@keyframes update-dialog-module__udPop--wt5vi {
  to {
    transform: scale(1);
  }
}

/* AlertDialog 컴포넌트 스타일 */
.update-dialog-module__udAlert--URrlp {
  max-width: 420px;
  text-align: center;
}

.update-dialog-module__udAlertMessage--fUewu {
  margin: 16px 0 20px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--fg, #eaeaea);
  white-space: pre-line;
}

.update-dialog-module__udAlert--URrlp .update-dialog-module__udActions--AuWA7 {
  justify-content: center;
}

.update-dialog-module__udAlert--URrlp .update-dialog-module__udBtn--EstXt,
.update-dialog-module__udAlert--URrlp .update-dialog-module__udBtnPrimary--H3naJ,
.update-dialog-module__udAlert--URrlp .update-dialog-module__udBtnGhost--juD9P {
  min-width: 120px;
}

@media (prefers-color-scheme: light) {
  .update-dialog-module__udAlertMessage--fUewu {
    color: var(--fg, #111);
  }
}
`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"udRoot": `update-dialog-module__udRoot--aUh0H`,
	"udCard": `update-dialog-module__udCard--QaBAr`,
	"udPop": `update-dialog-module__udPop--wt5vi`,
	"udTitle": `update-dialog-module__udTitle--VQB_3`,
	"udPill": `update-dialog-module__udPill--pW87e`,
	"udSub": `update-dialog-module__udSub--Y03Tv`,
	"udList": `update-dialog-module__udList--HduVR`,
	"udFeat": `update-dialog-module__udFeat--JNLt9`,
	"udFix": `update-dialog-module__udFix--BQIiW`,
	"udPerf": `update-dialog-module__udPerf--zN5cv`,
	"udBreak": `update-dialog-module__udBreak--Qza1r`,
	"udActions": `update-dialog-module__udActions--AuWA7`,
	"udBtn": `update-dialog-module__udBtn--EstXt`,
	"udBtnPrimary": `update-dialog-module__udBtnPrimary--H3naJ`,
	"udBtnGhost": `update-dialog-module__udBtnGhost--juD9P`,
	"udAlert": `update-dialog-module__udAlert--URrlp`,
	"udAlertMessage": `update-dialog-module__udAlertMessage--fUewu`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 288:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  initHotReload: () => (/* binding */ initHotReload),
  stopHotReload: () => (/* binding */ stopHotReload)
});

// EXTERNAL MODULE: ./src/core/risu-api.js
var risu_api = __webpack_require__(300);
// EXTERNAL MODULE: ./src/constants.js
var constants = __webpack_require__(521);
;// ./src/core/script-updater.js



/**
 * 플러그인 스크립트 파싱 (script-updater.js 로직 재사용)
 * @param {string} scriptContent - unpkg에서 fetch한 스크립트 내용
 * @returns {Object} 파싱된 플러그인 데이터
 */
function parsePluginScript(scriptContent) {
  const splitedJs = scriptContent.split("\n");

  let name = "";
  let displayName = undefined;
  let arg = {};
  let realArg = {};
  let customLink = [];

  for (const line of splitedJs) {
    // V1 플러그인 체크 (지원하지 않음)
    if (line.startsWith("//@risu-name") || line.startsWith("//@risu-display-name")) {
      throw new Error("V1 plugin is not supported. Please use V2 plugin.");
    }

    // name 파싱
    if (line.startsWith("//@name")) {
      const provided = line.slice(7).trim();
      if (provided === "") {
        throw new Error("Plugin name must be longer than 0");
      }
      name = provided;
    }

    // display-name 파싱
    if (line.startsWith("//@display-name")) {
      const provided = line.slice("//@display-name".length + 1).trim();
      if (provided === "") {
        throw new Error("Plugin display name must be longer than 0");
      }  
      displayName = provided;
    }

    // link 파싱
    if (line.startsWith("//@link")) {
      const link = line.split(" ")[1];
      if (!link || link === "") {
        throw new Error("Plugin link is empty");
      }
      if (!link.startsWith("https")) {
        throw new Error("Plugin link must start with https");
      }
      const hoverText = line.split(" ").slice(2).join(" ").trim();
      customLink.push({
        link: link,
        hoverText: hoverText || undefined,
      });
    }

    // arg 파싱
    if (line.startsWith("//@risu-arg") || line.startsWith("//@arg")) {
      const provided = line.trim().split(" ");
      const provKey = provided[1];

      if (provided[2] !== "int" && provided[2] !== "string") {
        throw new Error(`Unknown argument type: ${provided[2]}`);
      }

      if (provided[2] === "int") {
        arg[provKey] = "int";
        realArg[provKey] = 0;
      } else if (provided[2] === "string") {
        arg[provKey] = "string";
        realArg[provKey] = "";
      }
    }
  }

  if (name.length === 0) {
    throw new Error("Plugin name not found");
  }

  return {
    name: name,
    script: scriptContent,
    realArg: realArg,
    arguments: arg,
    displayName: displayName,
    version: 2,
    customLink: customLink,
  };
}

function scriptUpdater(parsed) {
  // 3. RisuAPI 싱글톤 인스턴스에서 getDatabase(), setDatabaseLite 가져오기
  const risuAPI = risu_api/* RisuAPI */.m.getInstance();
  if (!risuAPI) {
    throw new Error("RisuAPI is not initialized. Please ensure the plugin is loaded.");
  }

  // 4. 기존 플러그인 찾기 및 백업
  const db = risuAPI.getDatabase();
  const oldPluginIndex = db.plugins.findIndex((p) => p.name === constants/* PLUGIN_NAME */.AF);
  const backup = oldPluginIndex >= 0 ? { ...db.plugins[oldPluginIndex] } : null;

  console.log("[UpdateManager] Old plugin found:", oldPluginIndex >= 0, backup?.name);

  // 5. realArg 병합 (기존 값 보존 + 새 key 추가)
  const mergedRealArg = mergeRealArgs(backup?.realArg, parsed.arguments);

  // 6. 새 플러그인 데이터 생성
  const newPlugin = {
    ...parsed,
    realArg: mergedRealArg,
  };

  console.log("[UpdateManager] New plugin data prepared:", newPlugin.name, newPlugin.displayName);

  // 7. DB 업데이트
  if (oldPluginIndex >= 0) {
    db.plugins[oldPluginIndex] = newPlugin;
    console.log("[UpdateManager] Replaced existing plugin at index", oldPluginIndex);
  } else {
    db.plugins.push(newPlugin);
    console.log("[UpdateManager] Added new plugin");
  }

  // 8. 저장 및 오류 처리
  try {
    risuAPI.setDatabaseLite(db);
    console.log("[UpdateManager] Database saved successfully");
    return { success: true };
  } catch (saveError) {
    console.error("[UpdateManager] Database save failed:", saveError);
    // 롤백
    if (backup && oldPluginIndex >= 0) {
      db.plugins[oldPluginIndex] = backup;
      console.log("[UpdateManager] Rolled back to previous plugin");
    } else if (oldPluginIndex === -1) {
      db.plugins.pop();
      console.log("[UpdateManager] Removed newly added plugin");
    }
    return { success: false, error: saveError };
  }
}

/**
 * realArg 병합 (기존 값 보존 + 새 key 추가)
 * @param {Object} oldRealArg - 기존 플러그인의 realArg
 * @param {Object} newArguments - 새 플러그인의 arguments
 * @returns {Object} 병합된 realArg
 */
function mergeRealArgs(oldRealArg, newArguments) {
  const merged = {};

  // 새 arguments를 기준으로 순회
  for (const [key, type] of Object.entries(newArguments)) {
    // 기존 값이 있으면 보존, 없으면 기본값
    if (oldRealArg && key in oldRealArg) {
      merged[key] = oldRealArg[key]; // 기존 사용자 입력 값 보존
    } else {
      // 새로 추가된 arg는 기본값
      merged[key] = type === "int" ? 0 : "";
    }
  }

  return merged;
}
;// ./src/core/dev-reload.js
/**
 * Auto-generated Hot Reload Client
 *
 * DO NOT EDIT THIS FILE MANUALLY!
 * This file is automatically generated in development mode.
 *
 * Generated at: 2025-11-06T16:55:53.845Z
 * WebSocket URL: ws://localhost:13131
 */



const DEV_SERVER_URL = 'ws://localhost:13131';
const MAX_RECONNECT_DELAY = 30000; // 30 seconds
const INITIAL_RECONNECT_DELAY = 1000; // 1 second
const MAX_ERROR_LOGS = 3; // Maximum error logs to display

class HotReloadClient {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.reconnectTimeout = null;
    this.isIntentionallyClosed = false;
    this.errorLogCount = 0; // Track error log count
  }

  /**
   * Initialize WebSocket connection
   */
  connect() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('[HotReload] Already connected');
      return;
    }

    try {
      if (this.errorLogCount < MAX_ERROR_LOGS) {
        console.log('[HotReload] Connecting to dev server:', DEV_SERVER_URL);
      }
      this.ws = new WebSocket(DEV_SERVER_URL);

      this.ws.onopen = () => {
        console.log('[HotReload] ✅ Connected to dev server');
        this.reconnectAttempts = 0; // Reset on successful connection
        this.errorLogCount = 0; // Reset error log count on successful connection
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onclose = (event) => {
        if (this.errorLogCount < MAX_ERROR_LOGS) {
          console.log(`[HotReload] Disconnected (code: ${event.code}, reason: ${event.reason || 'unknown'})`);
          this.errorLogCount++;
        } else if (this.errorLogCount === MAX_ERROR_LOGS) {
          console.log('[HotReload] Connection errors suppressed (max logs reached). Retrying silently...');
          this.errorLogCount++;
        }

        if (!this.isIntentionallyClosed) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        if (this.errorLogCount < MAX_ERROR_LOGS) {
          console.error('[HotReload] WebSocket error:', error.message || error);
        }
      };

    } catch (error) {
      if (this.errorLogCount < MAX_ERROR_LOGS) {
        console.error('[HotReload] Connection failed:', error);
        this.errorLogCount++;
      }
      this.scheduleReconnect();
    }
  }

  /**
   * Handle incoming messages from dev server
   * @param {string} data - Raw message data
   */
  handleMessage(data) {
    try {
      const message = JSON.parse(data);

      switch (message.type) {
        case 'connected':
          console.log('[HotReload] Server message:', message.message);
          break;

        case 'reload':
          console.log(`[HotReload] 📦 Update received (${message.file}, ${message.size} bytes)`);
          this.handleReload(message.scriptContent);
          break;

        case 'pong':
          // Heartbeat response (optional)
          break;

        default:
          console.warn('[HotReload] Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('[HotReload] Failed to parse message:', error);
    }
  }

  /**
   * Handle script reload
   * @param {string} scriptContent - Updated script content
   */
  async handleReload(scriptContent) {
    try {
      console.log('[HotReload] 🔄 Parsing updated script...');

      // Parse using existing script-updater logic
      const parsed = parsePluginScript(scriptContent);

      console.log('[HotReload] 🔄 Updating plugin...');
      const result = await scriptUpdater(parsed);

      if (result.success) {
        console.log('[HotReload] ✅ Plugin updated successfully');

        // Show toast notification instead of auto-reload
        this.showToast('🔥 Hot Reload Complete!', 'success');
      } else {
        console.error('[HotReload] ❌ Plugin update failed:', result.error);
        this.showToast(`❌ Hot Reload Failed: ${result.error?.message || 'Unknown error'}`, 'error');
      }
    } catch (error) {
      console.error('[HotReload] ❌ Reload failed:', error);
      this.showToast(`❌ Hot Reload Error: ${error.message}`, 'error');
    }
  }

  /**
   * Show toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type ('success' or 'error')
   */
  showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.getElementById('hot-reload-toast');
    if (existingToast) {
      existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'hot-reload-toast';
    toast.textContent = message;

    // Apply styles
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    Object.assign(toast.style, {
      position: 'fixed',
      top: '-100px', // Start above viewport
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: bgColor,
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: '999999',
      transition: 'top 0.3s ease-out',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    });

    // Append to body
    document.body.appendChild(toast);

    // Trigger slide down animation
    setTimeout(() => {
      toast.style.top = '20px';
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.top = '-100px';
      setTimeout(() => {
        toast.remove();
      }, 300); // Wait for slide up animation
    }, 3000);
  }

  /**
   * Schedule reconnection with exponential backoff
   */
  scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s (max)
    const delay = Math.min(
      INITIAL_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts),
      MAX_RECONNECT_DELAY
    );

    if (this.errorLogCount < MAX_ERROR_LOGS) {
      console.log(`[HotReload] Reconnecting in ${delay / 1000}s... (attempt ${this.reconnectAttempts + 1})`);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  /**
   * Send ping to server (optional heartbeat)
   */
  ping() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
    }
  }

  /**
   * Disconnect from server
   */
  disconnect() {
    this.isIntentionallyClosed = true;

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.ws) {
      this.ws.close(1000, 'Client closed');
      this.ws = null;
    }

    console.log('[HotReload] Disconnected');
  }
}

// Singleton instance
let hotReloadClient = null;

/**
 * Initialize hot reload client
 */
function initHotReload() {
  if (hotReloadClient) {
    console.log('[HotReload] Already initialized');
    return hotReloadClient;
  }

  console.log('[HotReload] 🔥 Initializing hot reload client...');
  hotReloadClient = new HotReloadClient();
  hotReloadClient.connect();

  // Optional: Send ping every 30 seconds to keep connection alive
  setInterval(() => {
    hotReloadClient.ping();
  }, 30000);

  return hotReloadClient;
}

/**
 * Disconnect hot reload client
 */
function stopHotReload() {
  if (hotReloadClient) {
    hotReloadClient.disconnect();
    hotReloadClient = null;
  }
}


/***/ }),

/***/ 300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ RisuAPI)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(521);


/**
 * RisuAPI 싱글톤 클래스
 * RisuAI의 플러그인 API를 래핑하여 제공합니다.
 */
class RisuAPI {
  // 싱글톤 인스턴스
  static _instance = null;

  constructor(pluginApis) {
    // 싱글톤 체크
    if (RisuAPI._instance) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Returning existing RisuAPI instance`);
      return RisuAPI._instance;
    }

    // RisuAI 플러그인 API들을 private 필드로 저장 (메서드에서 사용)
    this._risuFetch = pluginApis.risuFetch;
    this._nativeFetch = pluginApis.nativeFetch;
    this._getArg = pluginApis.getArg;
    this._setArg = pluginApis.setArg;
    this._getChar = pluginApis.getChar;
    this._setChar = pluginApis.setChar;
    this._addProvider = pluginApis.addProvider;
    this._addRisuScriptHandler = pluginApis.addRisuScriptHandler;
    this._removeRisuScriptHandler = pluginApis.removeRisuScriptHandler;
    this._addRisuReplacer = pluginApis.addRisuReplacer;
    this._removeRisuReplacer = pluginApis.removeRisuReplacer;
    this._onUnload = pluginApis.onUnload;
    
    // eval로 초기화할 함수들 (나중에 initialize에서 설정됨)
    this._getDatabase = null;
    this._setDatabaseLite = null;

    // 싱글톤 인스턴스 저장
    RisuAPI._instance = this;
  }

  /**
   * RisuAPI 초기화
   * eval을 통해 전역 컨텍스트의 함수들을 가져옵니다.
   * @returns {Promise<boolean>} 초기화 성공 여부
   */
  async initialize() {
    try {
      // eval은 최초 스크립트 실행 컨텍스트에서만 작동
      // 싱글톤이므로 한 번만 실행되고 이후 재사용됨
      this._getDatabase = eval("getDatabase");
      this._setDatabaseLite = eval("setDatabaseLite");
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] RisuAPI initialized successfully`);
      return true;
    } catch (error) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Failed to initialize RisuAPI:`, error);
      return false;
    }
  }

  /**
   * 싱글톤 인스턴스 가져오기 또는 생성
   * 
   * @param {Object} [pluginApis] - 플러그인 API 객체. 첫 번째 호출 시에만 필요합니다.
   * @returns {RisuAPI} RisuAPI 인스턴스
   * @throws {Error} 인스턴스가 없고 pluginApis가 제공되지 않은 경우
   */
  static getInstance(pluginApis = null) {
    if (!RisuAPI._instance) {
      if (!pluginApis) {
        throw new Error(
          'RisuAPI instance does not exist. Provide pluginApis on first call.'
        );
      }
      RisuAPI._instance = new RisuAPI(pluginApis);
    }
    return RisuAPI._instance;
  }

  /**
   * 싱글톤 인스턴스 리셋 (테스트용)
   */
  static resetInstance() {
    RisuAPI._instance = null;
  }

  // ==================== Fetch API ====================

  /**
   * CORS 제한 없이 URL을 가져옵니다.
   * 
   * 참고: `nativeFetch`를 사용하는 것이 권장됩니다. 
   * `nativeFetch`는 표준 fetch API와 유사하며 더 예측 가능한 동작을 제공합니다.
   * 
   * @param {string} url - 가져올 URL
   * @param {Object} [arg={}] - Fetch 인자
   * @param {string|Object} [arg.body] - 요청 본문. 객체인 경우 JSON으로 변환됩니다.
   * @param {Record<string, string>} [arg.headers] - 요청 헤더
   * @param {string} [arg.method='POST'] - 요청 메서드. `GET`, `POST` 지원
   * @param {AbortSignal} [arg.abortSignal] - 요청 중단 신호
   * @param {boolean} [arg.rawResponse=false] - true인 경우 응답이 Uint8Array로 반환됩니다.
   * @returns {Promise<Object>} Fetch 결과
   * @returns {boolean} returns.ok - 요청 성공 여부
   * @returns {any} returns.data - 응답 데이터. JSON 가능한 경우 파싱되며, rawResponse가 true면 Uint8Array
   * @returns {Record<string, string>} returns.headers - 응답 헤더
   */
  risuFetch(url, arg = {}) {
    // 싱글톤 인스턴스의 원본 함수를 호출 (this는 항상 같은 인스턴스를 참조)
    return this._risuFetch(url, arg);
  }

  /**
   * CORS 제한 없이 URL을 가져옵니다.
   * 표준 fetch API의 하위 집합으로 설계되었으며, CORS 제한이 없고 기본 메서드가 `POST`입니다.
   * 
   * @param {string} url - 가져올 URL
   * @param {Object} [arg={}] - Fetch 인자
   * @param {string|Uint8Array|ArrayBuffer} [arg.body] - 요청 본문
   * @param {Record<string, string>} [arg.headers] - 요청 헤더
   * @param {string} [arg.method='POST'] - 요청 메서드. `GET`, `POST`, `PUT`, `DELETE` 지원
   * @param {AbortSignal} [arg.signal] - 요청 중단 신호
   * @returns {Promise<Response>} 표준 Response 객체
   */
  nativeFetch(url, arg = {}) {
    return this._nativeFetch(url, arg);
  }

  // ==================== Argument API ====================

  /**
   * 인자 값을 이름으로 가져옵니다.
   * 
   * @param {string} name - 인자 이름. `<plugin_name>::<arg_name>` 형식이어야 합니다. (예: `exampleplugin::arg1`)
   * @returns {string|number} 인자 값
   */
  getArg(name) {
    return this._getArg(name);
  }

  /**
   * 인자 값을 이름으로 설정합니다.
   * 
   * @param {string} name - 인자 이름. `<plugin_name>::<arg_name>` 형식이어야 합니다. (예: `exampleplugin::arg1`)
   * @param {string|number} value - 인자 값
   */
  setArg(name, value) {
    return this._setArg(name, value);
  }

  // ==================== Character API ====================

  /**
   * 현재 캐릭터를 가져옵니다.
   * 
   * @returns {Object} 현재 캐릭터 객체
   */
  getChar() {
    return this._getChar();
  }

  /**
   * 현재 캐릭터를 설정합니다.
   * 
   * @param {Object} char - 설정할 캐릭터 객체
   */
  setChar(char) {
    return this._setChar(char);
  }

  // ==================== Provider API ====================

  /**
   * 프로바이더를 추가합니다.
   * 
   * @param {string} type - 프로바이더 이름
   * @param {Function} func - 프로바이더 함수
   * @param {Object} func.arg - 프로바이더 인자
   * @param {Array} func.arg.prompt_chat - 채팅 프롬프트
   * @param {number} [func.arg.frequency_penalty] - 빈도 페널티
   * @param {number} [func.arg.min_p] - 최소 p 값
   * @param {number} [func.arg.presence_penalty] - 존재 페널티
   * @param {number} [func.arg.repetition_penalty] - 반복 페널티
   * @param {number} [func.arg.top_k] - Top k 값
   * @param {number} [func.arg.top_p] - Top p 값
   * @param {number} [func.arg.temperature] - 온도 값
   * @param {number} [func.arg.max_tokens] - 최대 토큰 수
   * @param {string} func.arg.mode - 모드. `model`, `submodel`, `memory`, `emotion`, `otherAx`, `translate` 중 하나
   * @param {AbortSignal} [func.abortSignal] - 요청 중단 신호
   * @param {Promise<Object>} func.returns - 프로바이더 결과
   * @param {boolean} func.returns.success - 프로바이더 성공 여부
   * @param {string|ReadableStream<string>} func.returns.content - 프로바이더 콘텐츠. ReadableStream인 경우 스트리밍됩니다.
   * @param {Object} [options] - 프로바이더 옵션
   * @param {string} [options.tokenizer] - 토크나이저 이름. `"mistral"`, `"llama"`, `"novelai"`, `"claude"`, `"novellist"`, `"llama3"`, `"gemma"`, `"cohere"`, `"tiktoken"`, `"custom"` 중 하나
   * @param {Function} [options.tokenizerFunc] - 커스텀 토크나이저 함수. `(content: string) => number[]|Promise<number[]>`
   */
  addProvider(type, func, options) {
    return this._addProvider(type, func, options);
  }

  // ==================== Risu Script Handler API ====================

  /**
   * Risu 스크립트 핸들러를 추가합니다.
   * 
   * @param {string} type - 핸들러 타입. `display`, `output`, `input`, `process` 중 하나
   *   - `display`: 데이터가 표시될 때 호출됩니다.
   *   - `output`: AI 모델이 데이터를 출력할 때 호출됩니다.
   *   - `input`: 사용자가 데이터를 입력할 때 호출됩니다.
   *   - `process`: 실제 요청 데이터를 생성할 때 호출됩니다.
   * @param {Function} func - 핸들러 함수
   * @param {string} func.content - 처리할 콘텐츠
   * @returns {string|null|undefined|Promise<string|null|undefined>} 핸들러 결과. 문자열 또는 문자열 Promise인 경우 데이터가 결과로 대체됩니다.
   */
  addRisuScriptHandler(type, func) {
    return this._addRisuScriptHandler(type, func);
  }

  /**
   * Risu 스크립트 핸들러를 제거합니다.
   * 
   * @param {string} type - 핸들러 타입. `display`, `output`, `input`, `process` 중 하나
   * @param {Function} func - 제거할 핸들러 함수
   */
  removeRisuScriptHandler(type, func) {
    return this._removeRisuScriptHandler(type, func);
  }

  // ==================== Risu Replacer API ====================

  /**
   * Risu 리플레이서를 추가합니다.
   * 
   * @param {string} type - 리플레이서 타입. `beforeRequest`, `afterRequest` 중 하나
   *   - `beforeRequest`: 요청이 전송되기 직전에 호출됩니다.
   *   - `afterRequest`: 응답이 수신된 직후에 호출됩니다.
   * @param {Function} func - 리플레이서 함수. 타입에 따라 시그니처가 다릅니다.
   *   - `afterRequest` 타입: `(content: string, mode: string) => string`
   *   - `beforeRequest` 타입: `(content: Chat[], mode: string) => Chat[]`
   *   - mode는 `model`, `submodel`, `memory`, `emotion`, `otherAx`, `translate` 중 하나입니다.
   */
  addRisuReplacer(type, func) {
    return this._addRisuReplacer(type, func);
  }

  /**
   * Risu 리플레이서를 제거합니다.
   * 
   * @param {string} type - 리플레이서 타입. `beforeRequest`, `afterRequest` 중 하나
   * @param {Function} func - 제거할 리플레이서 함수
   */
  removeRisuReplacer(type, func) {
    return this._removeRisuReplacer(type, func);
  }

  // ==================== Lifecycle API ====================

  /**
   * 플러그인 언로드 핸들러를 추가합니다.
   * 플러그인이 언로드될 때 호출될 함수를 등록합니다.
   * 
   * @param {Function} func - 언로드 시 호출할 함수
   */
  onUnload(func) {
    return this._onUnload(func);
  }

  // ==================== Database API ====================

  /**
   * 데이터베이스를 가져옵니다.
   * eval을 통해 전역 컨텍스트에서 가져온 함수입니다.
   * 
   * @returns {any} 데이터베이스 객체
   */
  getDatabase() {
    if (!this._getDatabase) {
      throw new Error('RisuAPI is not initialized. Call initialize() first.');
    }
    return this._getDatabase();
  }

  /**
   * 데이터베이스 Lite를 설정합니다.
   * eval을 통해 전역 컨텍스트에서 가져온 함수입니다.
   * 
   * @param {any} data - 설정할 데이터
   */
  setDatabaseLite(data) {
    if (!this._setDatabaseLite) {
      throw new Error('RisuAPI is not initialized. Call initialize() first.');
    }
    return this._setDatabaseLite(data);
  }
}


/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 362:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* 플러그인 컨테이너 스타일 */
.base-module__container--l6yV4 {
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif !important;
  font-weight: 600;
  font-size: 19px;
}

/* container 내부의 모든 요소에 폰트 적용 */
.base-module__container--l6yV4 * {
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif !important;
}

/* WinBox 윈도우 커스텀 스타일 (전역으로 적용) */
.rb-box * {
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif !important;
}
`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"container": `base-module__container--l6yV4`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 436:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Pretendard 폰트 CDN */

/* 편집 기능 전역 스타일 */
.x-risu-lb-nai-character-card,
.x-risu-lb-nai-comp-card {
  overflow: visible !important;
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* binding */ PLUGIN_NAME),
/* harmony export */   jN: () => (/* binding */ PLUGIN_VERSION),
/* harmony export */   rZ: () => (/* binding */ EXTERNAL_SCRIPTS)
/* harmony export */ });
/* unused harmony exports PLUGIN_DESCRIPTION, RANDOM_HASH */
/**
 * 빌드 타임 상수 (webpack DefinePlugin으로 주입)
 * 개발 환경(webpack 없이 직접 실행)을 위한 fallback 제공
 */
const PLUGIN_NAME =
   true ? "risu-handdam-edit" : 0;

const PLUGIN_VERSION =
   true ? "0.1.0" : 0;

const PLUGIN_DESCRIPTION =
  (/* unused pure expression or super */ null && ( true ? "RisuAI 한땀한땀 수정 지원 Plugin" : 0));

const RANDOM_HASH = "";

/**
 * 외부 스크립트 목록
 * NPM에 등록되지 않은 스크립트를 별도로 등록할 때 사용
 * 외부 스크립트를 사용하기 위해서는 모듈 로드 후 해당 모듈을 사용하는 파일에서 사용할 수 있도록 설정해야 함
 * @type {Array<{src: string, global: string}>}
 * @param {string} src - 스크립트 URL
 * @param {string} global - 스크립트를 사용할 수 있도록 설정할 전역 변수 이름
 */
const EXTERNAL_SCRIPTS = [
  /* 
  {
    src: "https://cdn.jsdelivr.net/npm/idb@8/build/umd.js",
    global: "idb"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/winbox@0.2.82/dist/winbox.bundle.min.js",
    global: "WinBox"
  }
   */
];


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./src/constants.js
var constants = __webpack_require__(521);
// EXTERNAL MODULE: ./src/core/risu-api.js
var risu_api = __webpack_require__(300);
;// ./src/utils/script-injector.js


function injectScripts() {
  constants/* EXTERNAL_SCRIPTS */.rZ.forEach((scriptConfig) => {
    const existingScript = document.querySelector(
      `script[src="${scriptConfig.src}"]`
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptConfig.src;
    script.type = "text/javascript";

    document.body.appendChild(script);
  });
}

;// ./src/ui/components/ui/menu-button.js

/**
 * 블랙마켓 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
class MenuButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- 페도라 모자 -->
          <ellipse cx="10" cy="7" rx="6" ry="1"></ellipse>
          <path d="M6 7 L7 4 C7 3 8 2 10 2 C12 2 13 3 13 4 L14 7"></path>
          
          <!-- 얼굴 -->
          <circle cx="10" cy="11" r="4"></circle>
          
          <!-- 선글라스 -->
          <line x1="7" y1="10" x2="13" y2="10" stroke-width="2"></line>
          <circle cx="8.5" cy="10" r="1" fill="currentColor"></circle>
          <circle cx="11.5" cy="10" r="1" fill="currentColor"></circle>
           
          <!-- 정장 -->
          <path d="M6 15 L7 17 M14 15 L13 17"></path>
          <line x1="10" y1="15" x2="10" y2="18"></line>
        </svg>
        <span class="ml-2">${constants/* PLUGIN_NAME */.AF}</span>
      </div>
    `;
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get(`menu-button-${constants/* PLUGIN_NAME */.AF}`)) {
  customElements.define(`menu-button-${constants/* PLUGIN_NAME */.AF}`, MenuButton);
}

const MENU_BUTTON_TAG = (/* unused pure expression or super */ null && (`menu-button-${PLUGIN_NAME}`));

;// ./src/utils/text-matcher.js
/**
 * 텍스트 매칭 유틸리티
 * HTML 요소에서 원본 마크다운 텍스트의 위치를 찾는 기능 제공
 */

/**
 * findOriginalRangeFromHtml
 * @param {string} originalMd - 원본 마크다운 전체 문자열
 * @param {string} replacedHtml - 정규식 치환 후 화면에 표시되는 HTML(해당 블록의 outerHTML 또는 innerHTML)
 * @param {object} [opts]
 * @param {number} [opts.anchor=12] - 앵커 길이(앞/뒤)
 * @param {number} [opts.fuzzyMaxLen=120] - 근사 탐색 허용 최대 길이
 * @param {number} [opts.fuzzyCutoff=20] - 편집거리 컷오프
 * @param {boolean} [opts.extendToEOL=false] - 줄바꿈 전까지 탐색
 * @param {number} [opts.extendMax=5000] - 줄바꿈 전까지 탐색 최대 길이
 * @param {boolean} [opts.snapStartToPrevEOL=false] - 줄바꿈 전까지 탐색
 * @param {number} [opts.snapMaxBack=12] - 줄바꿈 전까지 탐색 최대 길이
 * @param {boolean} [opts.snapTrimSpaces=true] - 줄바꿈 전까지 탐색 최대 길이
 * @returns {{start:number,end:number, method:'exact'|'anchor'|'fuzzy'}|null}
 */
function findOriginalRangeFromHtml(originalMd, replacedHtml, opts = {}) {
  const ANCH = opts.anchor ?? 12;
  const FUZZY_MAX = opts.fuzzyMaxLen ?? 200;
  const CUTOFF = opts.fuzzyCutoff ?? 20;
  const EXTEND_EOL = !!opts.extendToEOL;
  const EXTEND_MAX = opts.extendMax ?? 5000;
  const SNAP_BOL = !!opts.snapStartToPrevEOL;
  const SNAP_BACK = opts.snapMaxBack ?? 4;
  const SNAP_TRIM = opts.snapTrimSpaces ?? true;

  // --- 1) HTML → 평문 ---
  const plain = htmlToPlain(replacedHtml);
  if (!plain) return null;

  // --- 2) 정규화 + (md 전용) 인덱스 맵 생성 ---
  const { norm: mdN, map: mdMap } = normalizeWithMap(originalMd);
  const { norm: plN } = normalizeWithMap(plain);

  // --- 3) 1순위: 전체 일치 ---
  let idx = mdN.indexOf(plN);
  if (idx >= 0) {
    return mapBack(idx, idx + plN.length);
  }

  // --- 2순위: Levenshtein Distance 거리비교 기반 탐색 ---
  if (plN.length <= FUZZY_MAX) {
    let best = { pos: -1, dist: Infinity };
    const step = 8;
    for (let i = 0; i + plN.length <= mdN.length; i += step) {
      const seg = mdN.slice(i, i + plN.length);
      const d = fastEditDistance(plN, seg, CUTOFF);
      if (d < best.dist) {
        best = { pos: i, dist: d };
        if (d === 0) break;
      }
    }
    if (
      best.pos >= 0 &&
      best.dist <= Math.max(5, Math.floor(plN.length * 0.15))
    ) {
      let nStart = best.pos;
      let nEnd = best.pos + plN.length;

      if (EXTEND_EOL) {
        const nl = mdN.indexOf("\n", nEnd);
        const hardCapEnd = Math.min(mdN.length, nEnd + EXTEND_MAX);
        nEnd = nl === -1 ? hardCapEnd : Math.min(nl, hardCapEnd);

        if (SNAP_BOL) {
          const scanStart = Math.max(0, nStart - SNAP_BACK);
          const local = mdN.slice(scanStart, nStart);
          const nlLocalIdx = local.lastIndexOf("\n");
          if (nlLocalIdx !== -1) {
            let s = scanStart + nlLocalIdx + 1;
            if (SNAP_TRIM) {
              while (s < nStart && (mdN[s] === " " || mdN[s] === "\t")) s++;
            }
            if (s < nEnd) nStart = s;
          }
        }
      }

      return mapBack(
        nStart,
        nEnd,
        EXTEND_EOL ? (SNAP_BOL ? "fuzzy+eol+snap" : "fuzzy+eol") : "fuzzy"
      );
    }
  }

  // --- 4) 3순위: 앵커(head/tail) 일치 ---
  const N = Math.max(8, Math.min(ANCH, Math.floor(plN.length / 3)));
  if (plN.length >= N * 2) {
    const head = plN.slice(0, N);
    const tail = plN.slice(-N);
    const headPos = mdN.indexOf(head);
    if (headPos >= 0) {
      const tailPos = mdN.indexOf(tail, headPos + head.length);
      if (tailPos >= 0) return mapBack(headPos, tailPos + N, "anchor");
    }
  }

  return null;

  function mapBack(nStart, nEnd, method = "exact") {
    const start = mdMap[nStart];
    const end =
      nEnd - 1 < mdMap.length ? mdMap[nEnd - 1] + 1 : originalMd.length;
    return { start, end, method };
  }

  function htmlToPlain(htmlOrFragment) {
    let html = "";
    if (typeof htmlOrFragment === "string") html = htmlOrFragment;
    else if (htmlOrFragment && htmlOrFragment.outerHTML)
      html = htmlOrFragment.outerHTML;
    else if (htmlOrFragment && htmlOrFragment.innerHTML)
      html = htmlOrFragment.innerHTML;
    else return "";

    const div = document.createElement("div");
    div.innerHTML = html;

    div.querySelectorAll("ruby").forEach((rb) => {
      const base = rb.cloneNode(true);
      base.querySelectorAll("rt, rp").forEach((n) => n.remove());
      const rt = rb.querySelector("rt")?.textContent || "";
      const text = `${base.textContent || ""}${rt ? `(${rt})` : ""}`;
      rb.replaceWith(document.createTextNode(text));
    });

    return div.textContent || "";
  }

  function normalizeWithMap(s) {
    const out = [];
    const map = [];
    const len = s.length;
    let i = 0;

    const typomap = {
      "\u2018": "'",
      "\u2019": "'",
      "\u201C": '"',
      "\u201D": '"',
      "\u2013": "-",
      "\u2014": "-",
      "\u3000": " ",
    };

    while (i < len) {
      const ch = s[i];

      if (ch === "\r") {
        const next = s[i + 1];
        out.push("\n");
        map.push(i);
        i += next === "\n" ? 2 : 1;
        continue;
      }

      if ((ch >= "\u200B" && ch <= "\u200D") || ch === "\uFEFF") {
        i++;
        continue;
      }

      if (ch === "\u00A0") {
        out.push(" ");
        map.push(i);
        i++;
        continue;
      }

      if (typomap[ch]) {
        out.push(typomap[ch]);
        map.push(i);
        i++;
        continue;
      }

      if (ch === "\u2026") {
        out.push(".", ".", ".");
        map.push(i, i, i);
        i++;
        continue;
      }

      if (ch === " " || ch === "\t") {
        if (out.length > 0 && out[out.length - 1] === " ") {
          i++;
          continue;
        }
        out.push(" ");
        map.push(i);
        i++;
        continue;
      }

      out.push(ch);
      map.push(i);
      i++;
    }

    while (out.length && out[0] === " ") {
      out.shift();
      map.shift();
    }
    while (out.length && out[out.length - 1] === " ") {
      out.pop();
      map.pop();
    }

    return { norm: out.join(""), map };
  }

}

function fastEditDistance(a, b, cutoff = 30) {
  const n = a.length,
    m = b.length;
  if (Math.abs(n - m) > cutoff) return cutoff + 1;
  const dp = new Array(m + 1);
  for (let j = 0; j <= m; j++) dp[j] = j;
  for (let i = 1; i <= n; i++) {
    let prev = dp[0];
    dp[0] = i;
    let rowMin = dp[0];
    for (let j = 1; j <= m; j++) {
      const tmp = dp[j];
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
      if (dp[j] < rowMin) rowMin = dp[j];
    }
    if (rowMin > cutoff) return cutoff + 1;
  }
  return dp[m];
}

/**
 * 텍스트에서 모든 매칭 위치를 찾습니다
 * @param {string} originalMd - 원본 마크다운 전체 문자열
 * @param {string} searchText - 검색할 텍스트
 * @param {object} [opts] - 옵션
 * @param {number} [opts.contextLength=30] - 컨텍스트 길이
 * @param {number} [opts.fuzzyMaxLen=200] - Fuzzy 탐색 허용 최대 길이
 * @param {number} [opts.fuzzyCutoff=20] - 편집거리 컷오프
 * @param {number} [opts.fuzzyThreshold=0.15] - Fuzzy 매칭 임계값 (전체 길이의 비율)
 * @param {number} [opts.anchorLength=12] - 앵커 길이
 * @returns {Array<{start: number, end: number, context: string, contextStart: number}>} 매칭 결과 배열
 */
function findAllMatches(originalMd, searchText, opts = {}) {
  const matches = [];
  const contextLength = opts.contextLength ?? 30;
  const FUZZY_MAX = opts.fuzzyMaxLen ?? 200;
  const CUTOFF = opts.fuzzyCutoff ?? 20;
  const FUZZY_THRESHOLD = opts.fuzzyThreshold ?? 0.15;
  const ANCH = opts.anchorLength ?? 12;
  
  // 정규화된 텍스트로 검색 (공백 정규화)
  const normalizedSearch = searchText.replace(/\s+/g, " ").trim();
  const normalizedOriginal = originalMd.replace(/\s+/g, " ");
  
  // 원본 인덱스 매핑 생성
  const indexMap = createIndexMap(originalMd, normalizedOriginal);
  
  // 이미 찾은 위치 추적 (중복 방지)
  const foundPositions = new Set();
  
  // 1순위: 정확한 매칭
  let searchIndex = 0;
  while (true) {
    const lowerNormalized = normalizedOriginal.toLowerCase();
    const lowerSearch = normalizedSearch.toLowerCase();
    const index = lowerNormalized.indexOf(lowerSearch, searchIndex);
    
    if (index === -1) break;
    
    const normalizedStart = index;
    const normalizedEnd = index + normalizedSearch.length;
    
    // 원본 인덱스로 변환
    const start = indexMap[normalizedStart] ?? normalizedStart;
    const end = indexMap[normalizedEnd] ?? normalizedEnd;
    
    // 중복 체크
    const positionKey = `${start}-${end}`;
    if (!foundPositions.has(positionKey)) {
      foundPositions.add(positionKey);
      
      // 컨텍스트 추출
      const contextStart = Math.max(0, start - contextLength);
      const contextEnd = Math.min(originalMd.length, end + contextLength);
      const context = originalMd.slice(contextStart, contextEnd);
      const trimmedContext = context.trim();
      
      // trim으로 인한 앞쪽 공백 길이 계산
      const leadingWhitespace = context.length - context.trimStart().length;
      const adjustedContextStart = contextStart + leadingWhitespace;
      
      matches.push({
        start,
        end,
        context: trimmedContext,
        contextStart: adjustedContextStart,
        method: 'exact',
      });
    }
    
    searchIndex = normalizedEnd;
  }
  
  // 2순위: Fuzzy 매칭 (정확한 매칭이 없거나 적을 때)
  if (matches.length === 0 || (normalizedSearch.length <= FUZZY_MAX && matches.length < 3)) {
    const fuzzyMatches = findFuzzyMatches(
      normalizedOriginal,
      normalizedSearch,
      indexMap,
      originalMd,
      contextLength,
      FUZZY_MAX,
      CUTOFF,
      FUZZY_THRESHOLD,
      foundPositions
    );
    matches.push(...fuzzyMatches);
  }
  
  // 3순위: Head/Tail 앵커 매칭 (매칭이 없을 때만)
  if (matches.length === 0 && normalizedSearch.length >= ANCH * 2) {
    const anchorMatches = findAnchorMatches(
      normalizedOriginal,
      normalizedSearch,
      indexMap,
      originalMd,
      contextLength,
      ANCH,
      foundPositions
    );
    matches.push(...anchorMatches);
  }
  
  // start 위치로 정렬
  matches.sort((a, b) => a.start - b.start);
  
  return matches;
}

/**
 * Fuzzy 매칭으로 매칭 위치 찾기
 */
function findFuzzyMatches(
  normalizedOriginal,
  normalizedSearch,
  indexMap,
  originalMd,
  contextLength,
  FUZZY_MAX,
  CUTOFF,
  FUZZY_THRESHOLD,
  foundPositions
) {
  const matches = [];
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();
  
  if (lowerSearch.length > FUZZY_MAX) {
    return matches;
  }
  
  const step = Math.max(1, Math.floor(lowerSearch.length / 4));
  const maxDistance = Math.max(5, Math.floor(lowerSearch.length * FUZZY_THRESHOLD));
  
  for (let i = 0; i + lowerSearch.length <= lowerNormalized.length; i += step) {
    const seg = lowerNormalized.slice(i, i + lowerSearch.length);
    const d = fastEditDistance(lowerSearch, seg, CUTOFF);
    
    if (d <= maxDistance) {
      const normalizedStart = i;
      const normalizedEnd = i + lowerSearch.length;
      
      // 원본 인덱스로 변환
      const start = indexMap[normalizedStart] ?? normalizedStart;
      const end = indexMap[normalizedEnd] ?? normalizedEnd;
      
      // 중복 체크
      const positionKey = `${start}-${end}`;
      if (!foundPositions.has(positionKey)) {
        foundPositions.add(positionKey);
        
        // 컨텍스트 추출
        const contextStart = Math.max(0, start - contextLength);
        const contextEnd = Math.min(originalMd.length, end + contextLength);
        const context = originalMd.slice(contextStart, contextEnd);
        const trimmedContext = context.trim();
        
        // trim으로 인한 앞쪽 공백 길이 계산
        const leadingWhitespace = context.length - context.trimStart().length;
        const adjustedContextStart = contextStart + leadingWhitespace;
        
        matches.push({
          start,
          end,
          context: trimmedContext,
          contextStart: adjustedContextStart,
          method: 'fuzzy',
          distance: d,
        });
      }
    }
  }
  
  return matches;
}

/**
 * Head/Tail 앵커로 매칭 위치 찾기
 */
function findAnchorMatches(
  normalizedOriginal,
  normalizedSearch,
  indexMap,
  originalMd,
  contextLength,
  ANCH,
  foundPositions
) {
  const matches = [];
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();
  
  const N = Math.max(8, Math.min(ANCH, Math.floor(lowerSearch.length / 3)));
  if (lowerSearch.length < N * 2) {
    return matches;
  }
  
  const head = lowerSearch.slice(0, N);
  const tail = lowerSearch.slice(-N);
  
  let searchIndex = 0;
  while (true) {
    const headPos = lowerNormalized.indexOf(head, searchIndex);
    if (headPos === -1) break;
    
    const tailPos = lowerNormalized.indexOf(tail, headPos + head.length);
    if (tailPos >= 0) {
      const normalizedStart = headPos;
      const normalizedEnd = tailPos + N;
      
      // 원본 인덱스로 변환
      const start = indexMap[normalizedStart] ?? normalizedStart;
      const end = indexMap[normalizedEnd] ?? normalizedEnd;
      
      // 중복 체크
      const positionKey = `${start}-${end}`;
      if (!foundPositions.has(positionKey)) {
        foundPositions.add(positionKey);
        
        // 컨텍스트 추출
        const contextStart = Math.max(0, start - contextLength);
        const contextEnd = Math.min(originalMd.length, end + contextLength);
        const context = originalMd.slice(contextStart, contextEnd);
        const trimmedContext = context.trim();
        
        // trim으로 인한 앞쪽 공백 길이 계산
        const leadingWhitespace = context.length - context.trimStart().length;
        const adjustedContextStart = contextStart + leadingWhitespace;
        
        matches.push({
          start,
          end,
          context: trimmedContext,
          contextStart: adjustedContextStart,
          method: 'anchor',
        });
      }
      
      searchIndex = tailPos + N;
    } else {
      searchIndex = headPos + 1;
    }
  }
  
  return matches;
}

/**
 * 정규화된 인덱스에서 원본 인덱스로의 매핑 생성
 */
function createIndexMap(original, normalized) {
  const map = [];
  let originalIndex = 0;
  let normalizedIndex = 0;
  
  // 원본의 공백을 정규화된 인덱스에 매핑
  while (originalIndex < original.length && normalizedIndex < normalized.length) {
    const origChar = original[originalIndex];
    const normChar = normalized[normalizedIndex];
    
    // 공백 정규화 처리
    if (/\s/.test(origChar) && /\s/.test(normChar)) {
      // 둘 다 공백이면 매핑
      map[normalizedIndex] = originalIndex;
      normalizedIndex++;
      // 원본의 연속된 공백 건너뛰기
      while (originalIndex < original.length && /\s/.test(original[originalIndex])) {
        originalIndex++;
      }
    } else if (origChar.toLowerCase() === normChar.toLowerCase()) {
      // 같은 문자면 매핑
      map[normalizedIndex] = originalIndex;
      originalIndex++;
      normalizedIndex++;
    } else {
      // 불일치 시 원본만 진행 (정규화 과정에서 제거된 문자)
      originalIndex++;
    }
  }
  
  return map;
}


;// ./src/utils/html-text-extractor.js
/**
 * HTML 텍스트 추출 유틸리티
 * HTML로 렌더링된 텍스트에서 원본 마크다운 형식을 고려한 텍스트 추출
 */

/**
 * 선택된 텍스트를 정규화하여 검색 가능한 형태로 변환
 * HTML 리스트 항목(li)에서 선택된 경우 마크다운 형식도 고려
 * 
 * @param {string} selectedText - 선택된 텍스트
 * @param {Range} range - 선택 범위
 * @returns {Array<string>} 검색 가능한 텍스트 변형 배열
 */
function normalizeSelectedText(selectedText, range) {
  const variations = new Set();
  const trimmed = selectedText.trim();
  
  if (trimmed) {
    variations.add(trimmed);
  }
  
  // ul/ol 내부에서 선택된 경우 처리
  const startContainer = range.startContainer;
  const endContainer = range.endContainer;
  
  let startNode = startContainer.nodeType === Node.TEXT_NODE 
    ? startContainer.parentElement 
    : startContainer;
  let endNode = endContainer.nodeType === Node.TEXT_NODE 
    ? endContainer.parentElement 
    : endContainer;
  
  const listContainer = startNode.closest?.("ul, ol") || endNode.closest?.("ul, ol");
  
  if (listContainer) {
    // Range 내에 포함된 모든 li 요소 찾기
    const allListItems = Array.from(listContainer.querySelectorAll("li"));
    const selectedListItems = [];
    
    // 각 li가 Range와 겹치는지 확인
    allListItems.forEach(li => {
      try {
        // Range의 시작/끝 컨테이너가 li 내부에 있는지 확인
        const startInLi = li.contains(range.startContainer) || range.startContainer === li;
        const endInLi = li.contains(range.endContainer) || range.endContainer === li;
        
        // Range가 li를 포함하거나, li가 Range를 포함하거나, 겹치는 경우
        if (startInLi || endInLi || range.intersectsNode?.(li)) {
          selectedListItems.push(li);
        } else {
          // Range가 li를 완전히 포함하는지 확인
          try {
            const liRange = document.createRange();
            liRange.selectNodeContents(li);
            if (range.compareBoundaryPoints(Range.START_TO_START, liRange) <= 0 &&
                range.compareBoundaryPoints(Range.END_TO_END, liRange) >= 0) {
              selectedListItems.push(li);
            }
          } catch (e) {
            // 에러 발생 시 무시
          }
        }
      } catch (e) {
        // 에러 발생 시 무시
      }
    });
    
    // 선택된 li 항목이 있는 경우
    if (selectedListItems.length > 0) {
      // 각 li 항목의 전체 텍스트 추출
      selectedListItems.forEach(li => {
        const liText = li.textContent.trim();
        if (liText) {
          variations.add(liText);
          // 마크다운 형식으로 변환
          variations.add(`- ${liText}`);
          variations.add(`* ${liText}`);
          variations.add(`+ ${liText}`);
        }
      });
      
      // 여러 li에 걸친 선택인 경우, 각 li의 부분 텍스트도 추출
      if (selectedListItems.length > 1) {
        // 첫 번째 li의 끝 부분과 마지막 li의 시작 부분 추출
        const firstLi = selectedListItems[0];
        const lastLi = selectedListItems[selectedListItems.length - 1];
        
        // Range가 각 li 내에서 어디서 시작/끝나는지 확인
        try {
          // 첫 번째 li에서 선택된 부분
          if (range.startContainer === firstLi || firstLi.contains(range.startContainer)) {
            const firstLiRange = document.createRange();
            firstLiRange.setStart(range.startContainer, range.startOffset);
            firstLiRange.setEndAfter(firstLi.lastChild || firstLi);
            const firstLiSelected = firstLiRange.toString().trim();
            if (firstLiSelected && firstLiSelected !== firstLi.textContent.trim()) {
              variations.add(firstLiSelected);
              variations.add(`- ${firstLiSelected}`);
              variations.add(`* ${firstLiSelected}`);
            }
          }
          
          // 마지막 li에서 선택된 부분
          if (range.endContainer === lastLi || lastLi.contains(range.endContainer)) {
            const lastLiRange = document.createRange();
            lastLiRange.setStartBefore(lastLi.firstChild || lastLi);
            lastLiRange.setEnd(range.endContainer, range.endOffset);
            const lastLiSelected = lastLiRange.toString().trim();
            if (lastLiSelected && lastLiSelected !== lastLi.textContent.trim()) {
              variations.add(lastLiSelected);
              variations.add(`- ${lastLiSelected}`);
              variations.add(`* ${lastLiSelected}`);
            }
          }
        } catch (e) {
          // 에러 발생 시 무시
        }
      } else {
        // 단일 li 항목 내에서 부분 선택된 경우
        const singleLi = selectedListItems[0];
        const liText = singleLi.textContent.trim();
        if (trimmed !== liText) {
          variations.add(trimmed);
          variations.add(`- ${trimmed}`);
          variations.add(`* ${trimmed}`);
        }
      }
      
      // 선택된 텍스트를 줄 단위로 분리하여 각 줄도 검색
      if (selectedText.includes("\n") || selectedText.includes("\r")) {
        const lines = selectedText.split(/\r?\n/).filter(line => line.trim());
        lines.forEach(line => {
          const trimmedLine = line.trim();
          if (trimmedLine) {
            variations.add(trimmedLine);
            variations.add(`- ${trimmedLine}`);
            variations.add(`* ${trimmedLine}`);
          }
        });
      }
    }
  } else {
    // 리스트가 아닌 경우 기본 처리
    const listItem = startNode.closest?.("li");
    if (listItem) {
      const liText = listItem.textContent.trim();
      if (liText) {
        variations.add(liText);
        variations.add(`- ${liText}`);
        variations.add(`* ${liText}`);
        variations.add(`+ ${liText}`);
      }
      
      if (trimmed !== liText) {
        variations.add(trimmed);
        variations.add(`- ${trimmed}`);
        variations.add(`* ${trimmed}`);
      }
    }
  }
  
  return Array.from(variations).filter(v => v.length > 0);
}

/**
 * HTML 요소에서 원본 마크다운 형식의 텍스트 추출
 * 
 * @param {Element} element - HTML 요소
 * @returns {string} 마크다운 형식 텍스트
 */
function extractMarkdownFromElement(element) {
  if (!element) return "";
  
  const cloned = element.cloneNode(true);
  
  // 버튼 제거
  cloned.querySelectorAll("button, .chat-modi-btn, .x-risu-button-default").forEach(btn => btn.remove());
  
  let result = "";
  
  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      
      if (tagName === "ul" || tagName === "ol") {
        // 리스트인 경우 각 항목에 마커 추가
        const items = Array.from(node.querySelectorAll("li"));
        return items.map((li, index) => {
          const content = Array.from(li.childNodes)
            .map(processNode)
            .join("")
            .trim();
          return tagName === "ol" ? `${index + 1}. ${content}` : `- ${content}`;
        }).join("\n");
      } else if (tagName === "li") {
        // li 항목의 내용만 추출 (마커는 부모에서 처리)
        return Array.from(node.childNodes).map(processNode).join("");
      } else if (tagName === "ruby") {
        const base = node.cloneNode(true);
        base.querySelectorAll("rt, rp").forEach(n => n.remove());
        const rt = node.querySelector("rt")?.textContent || "";
        const text = base.textContent || "";
        return rt ? `:${text}[${rt}]:` : text;
      } else if (tagName === "br") {
        return "\n";
      } else if (tagName === "p") {
        return Array.from(node.childNodes).map(processNode).join("") + "\n";
      } else {
        return Array.from(node.childNodes).map(processNode).join("");
      }
    }
    return "";
  }
  
  result = processNode(cloned);
  return result.trim();
}


;// ./src/core/text-selection-handler.js
/**
 * 텍스트 선택 핸들러
 * 사용자가 텍스트를 선택했을 때 처리하는 핸들러
 */





const MIN_SELECTION_LENGTH = 5;

class TextSelectionHandler {
  constructor(editManager) {
    this.editManager = editManager;
    this.risuAPI = risu_api/* RisuAPI */.m.getInstance();
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
      const allMatches = [];
      const messageData = messages[targetChatIndex].data || "";
      
      // HTML로 렌더링된 텍스트 선택 시 마크다운 형식 변형도 검색
      const searchVariations = normalizeSelectedText(selectedText, range);
      
      // 각 변형에 대해 검색 수행
      for (const searchText of searchVariations) {
        if (searchText.length < MIN_SELECTION_LENGTH) continue;
        
        const matches = findAllMatches(messageData, searchText, {
          contextLength: 30,
        });

        matches.forEach((match) => {
          // 중복 제거: 같은 위치의 매칭은 한 번만 추가
          const isDuplicate = allMatches.some(
            existing => existing.start === match.start && existing.end === match.end
          );
          
          if (!isDuplicate) {
            allMatches.push({
              chatIndex: targetChatIndex,
              ...match,
            });
          }
        });
      }

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


;// ./src/core/plugin-config.js
/**
 * Auto-generated Plugin Arguments Configuration
 *
 * DO NOT EDIT THIS FILE MANUALLY!
 * This file is automatically generated from src/plugin-args.json during webpack build.
 *
 * To add/modify plugin arguments:
 * 1. Edit src/plugin-args.json
 * 2. Run npm run build
 * 3. This file will be regenerated automatically
 *
 * Generated at: 2025-11-06T17:31:39.958Z
 */




/**
 * Plugin Arguments Helper Class
 * Provides convenient getter/setter access to RisuAI plugin arguments with caching.
 * Automatically uses RisuAPI singleton instance.
 *
 * @example
 * import { PluginArgs } from './core/plugin-config.js';
 *
 * const args = new PluginArgs();
 *
 * // Getter
 * const apiKey = args.exampleApiKey;
 *
 * // Setter
 * args.maxTokens = 4096;
 *
 * // Cache invalidation
 * args.invalidate('exampleApiKey');
 */
class PluginArgs {
  /**
   * @param {Object} [risuAPI] - RisuAPI instance (optional, uses singleton if not provided)
   */
  constructor(risuAPI = null) {
    // Use singleton instance if not provided
    this._api = risuAPI || risu_api/* RisuAPI */.m.getInstance();
    this._cache = new Map();
    this._ttl = 5000; // Cache TTL in milliseconds (5 seconds)
    this._timestamps = new Map();
  }

  // ==================== Auto-generated Getters ====================

  /**
   * Get excludeBotName
   * 편집 기능을 제외할 봇 이름 목록 (쉼표로 구분)
   * @type {string}
   */
  get excludeBotName() {
    return this._get('excludeBotName', "");
  }

  /**
   * Get minLength
   * 텍스트 선택 최소 길이
   * @type {number}
   */
  get minLength() {
    return this._get('minLength', 5);
  }

  /**
   * Get editMode
   * 편집 모드 (selection, element)
   * @type {string}
   */
  get editMode() {
    return this._get('editMode', "selection");
  }

  // ==================== Auto-generated Setters ====================

  /**
   * Set excludeBotName
   * 편집 기능을 제외할 봇 이름 목록 (쉼표로 구분)
   * @param {string} value - New value
   */
  set excludeBotName(value) {
    if (typeof value !== 'string') {
      throw new TypeError('excludeBotName must be a string');
    }
    this._set('excludeBotName', value);
  }

  /**
   * Set minLength
   * 텍스트 선택 최소 길이
   * @param {number} value - New value
   */
  set minLength(value) {
    if (typeof value !== 'number') {
      throw new TypeError('minLength must be a number');
    }
    this._set('minLength', value);
  }

  /**
   * Set editMode
   * 편집 모드 (selection, element)
   * @param {string} value - New value
   */
  set editMode(value) {
    if (typeof value !== 'string') {
      throw new TypeError('editMode must be a string');
    }
    this._set('editMode', value);
  }

  // ==================== Private Helper Methods ====================

  /**
   * Get argument value with caching
   * @private
   * @param {string} name - Argument name
   * @param {string|number} defaultValue - Default value
   * @returns {string|number} Argument value
   */
  _get(name, defaultValue) {
    const key = `${constants/* PLUGIN_NAME */.AF}::${name}`;
    const now = Date.now();

    // Check cache validity
    if (this._cache.has(key)) {
      const timestamp = this._timestamps.get(key);
      if (timestamp && (now - timestamp) < this._ttl) {
        return this._cache.get(key);
      }
    }

    // Fetch from API
    const value = this._api.getArg(key) ?? defaultValue;
    this._cache.set(key, value);
    this._timestamps.set(key, now);
    return value;
  }

  /**
   * Set argument value and update cache
   * @private
   * @param {string} name - Argument name
   * @param {string|number} value - Argument value
   */
  _set(name, value) {
    const key = `${constants/* PLUGIN_NAME */.AF}::${name}`;
    this._api.setArg(key, value);
    this._cache.set(key, value);
    this._timestamps.set(key, Date.now());
  }

  // ==================== Public Cache Management ====================

  /**
   * Invalidate cache for a specific argument
   * @param {string} name - Argument name
   */
  invalidate(name) {
    const key = `${constants/* PLUGIN_NAME */.AF}::${name}`;
    this._cache.delete(key);
    this._timestamps.delete(key);
  }

  /**
   * Clear all cached values
   */
  clearCache() {
    this._cache.clear();
    this._timestamps.clear();
  }

  /**
   * Set cache TTL (Time To Live)
   * @param {number} ttl - TTL in milliseconds
   */
  setCacheTTL(ttl) {
    if (typeof ttl !== 'number' || ttl < 0) {
      throw new Error('TTL must be a non-negative number');
    }
    this._ttl = ttl;
  }

  /**
   * Get all cached argument names
   * @returns {string[]} Array of cached argument names
   */
  getCachedArgs() {
    return Array.from(this._cache.keys()).map(key => key.replace(`${constants/* PLUGIN_NAME */.AF}::`, ''));
  }
}

;// ./src/core/element-edit-handler.js
/**
 * 요소 기반 편집 핸들러
 * 기존 HTML Element 단위 편집 기능
 */





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

class ElementEditHandler {
  constructor(editManager) {
    this.editManager = editManager;
    this.risuAPI = risu_api/* RisuAPI */.m.getInstance();
    this.pluginArgs = new PluginArgs();
    this.intersectionObserver = null;
    this.mutationObserver = null;
    this.createdButtons = [];
    this.excludeBotNames = [];
  }

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

  /**
   * 요소가 타겟 요소인지 확인
   */
  isTargetElement(element) {
    if (!element || !element.classList) return false;

    const selectors = TARGET_SELECTOR.map((selector) => selector.trim());

    for (const selector of selectors) {
      if (this.matchesSelector(element, selector)) {
        return true;
      }
    }

    if (element.className && element.className.includes("message")) {
      return true;
    }

    return false;
  }

  /**
   * CSS Selector 매칭
   */
  matchesSelector(element, selector) {
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
          !this.matchesParentSelector(parentElement, parentSelector)
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
  matchesParentSelector(element, parentSelector) {
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
    const tempElement = element.cloneNode(true);
    const risuButtons = tempElement.querySelectorAll("button");
    risuButtons.forEach((btn) => btn.remove());
    const textContent = tempElement.textContent.trim();

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

    // 요소를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // 버튼 래퍼 생성
    const wrapper = document.createElement("div");
    wrapper.className = "hddm-button-wrapper";
    wrapper.style.cssText = `
      position: absolute;
      top: inherit;
      left: 0px;
      margin-top: 30px;
      transform: translateY(-100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 1000;
      display: flex;
      gap: 4px;
      padding: 4px 0;
      pointer-events: auto;
      user-select: none;
    `;

    // 편집 버튼 생성
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerHTML = "✏️";
    editButton.title = "수정";
    editButton.className = "chat-modi-btn hddm-edit-button";
    editButton.style.cssText = `
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 4px 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      user-select: none;
    `;
    editButton.onclick = () => this.editSingleChat(editButton);

    wrapper.appendChild(editButton);

    // 호버 이벤트
    element.addEventListener("mouseenter", () => {
      wrapper.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapper.style.opacity = "0";
    });

    element.appendChild(wrapper);
    this.createdButtons.push(wrapper);
    element.classList.add("hddm-btn-appended");
  }

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

    targetElement.classList.add("hddm-editing");

    const rect = targetElement.getBoundingClientRect();
    const actualWidth = rect.width + 10;
    const actualHeight = Math.max(rect.height + 10, 60);

    const textarea = document.createElement("textarea");

    const char = this.risuAPI.getChar();
    const chatPage = char.chatPage || 0;
    const currentChatMessage =
      char.chats[chatPage].message[chatIndex].data;
    const hit = findOriginalRangeFromHtml(currentChatMessage, originalText, {
      extendToEOL: false,
      snapStartToPrevEOL: false,
    });

    let taValue = "";
    if (hit) taValue = currentChatMessage.slice(hit.start, hit.end);
    else taValue = originalText;

    textarea.value = taValue;
    textarea.setAttribute("data-chat-index", chatIndex);
    textarea.setAttribute("data-chat-id", chatId);
    textarea.className = "chat-edit-textarea";
    textarea.style.cssText = `
      width: ${actualWidth}px;
      height: ${actualHeight}px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: inherit;
      font-size: inherit;
      color: #000;
      resize: both;
      margin: 4px 0;
      box-sizing: border-box;
    `;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "chat-edit-buttons";
    buttonContainer.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: 8px;
    `;

    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.className = "chat-save-btn";
    saveButton.style.cssText = `
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    saveButton.onclick = () =>
      this.saveSingleChat(textarea, targetElement, taValue, originalHTML, hit);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.className = "chat-cancel-btn";
    cancelButton.style.cssText = `
      padding: 6px 12px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    cancelButton.onclick = () =>
      this.cancelEdit(targetElement, originalText, originalHTML);

    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    targetElement.innerHTML = "";
    targetElement.appendChild(textarea);
    targetElement.appendChild(buttonContainer);

    textarea.focus();
    textarea.select();
  }

  /**
   * HTML을 편집 가능한 포맷으로 변환
   */
  convertHTMLToEditFormat(element) {
    const cloned = element.cloneNode(true);

    const buttons = cloned.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    let result = "";

    function processNode(node) {
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
    }

    result = processNode(cloned);
    return result.trim();
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
    let oldFullText =
      char.chats[chatPage].message[chatIndex].data;

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

    this.appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 취소
   */
  cancelEdit(targetElement, originalText, originalHTML) {
    targetElement.classList.remove("hddm-editing");
    targetElement.innerHTML = originalHTML;
    this.appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 버튼 다시 추가
   */
  appendEditButtonToElement(element) {
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    const wrapper = document.createElement("div");
    wrapper.className = "hddm-button-wrapper";
    wrapper.style.cssText = `
      position: absolute;
      top: inherit;
      left: 0px;
      margin-top: 30px;
      transform: translateY(-100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 1000;
      display: flex;
      gap: 4px;
      padding: 4px 0;
      pointer-events: auto;
      user-select: none;
    `;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerHTML = "✏️";
    editButton.title = "수정";
    editButton.className = "chat-modi-btn hddm-edit-button";
    editButton.style.cssText = `
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 4px 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      user-select: none;
    `;
    editButton.onclick = () => this.editSingleChat(editButton);

    wrapper.appendChild(editButton);

    element.addEventListener("mouseenter", () => {
      wrapper.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapper.style.opacity = "0";
    });

    element.appendChild(wrapper);
    this.createdButtons.push(wrapper);
  }
}


;// ./src/core/edit-manager.js
/**
 * 편집 관리자
 * 편집 기능의 핵심 로직을 관리합니다.
 */







class EditManager {
  constructor() {
    this.risuAPI = risu_api/* RisuAPI */.m.getInstance();
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


// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/ui/styles/global.css
var global = __webpack_require__(436);
;// ./src/ui/styles/global.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(global/* default */.A, options);




       /* harmony default export */ const styles_global = (global/* default */.A && global/* default */.A.locals ? global/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/ui/styles/base.module.css
var base_module = __webpack_require__(362);
;// ./src/ui/styles/base.module.css

      
      
      
      
      
      
      
      
      

var base_module_options = {};

base_module_options.styleTagTransform = (styleTagTransform_default());
base_module_options.setAttributes = (setAttributesWithoutAttributes_default());
base_module_options.insert = insertBySelector_default().bind(null, "head");
base_module_options.domAPI = (styleDomAPI_default());
base_module_options.insertStyleElement = (insertStyleElement_default());

var base_module_update = injectStylesIntoStyleTag_default()(base_module/* default */.A, base_module_options);




       /* harmony default export */ const styles_base_module = (base_module/* default */.A && base_module/* default */.A.locals ? base_module/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/ui/styles/update-dialog.module.css
var update_dialog_module = __webpack_require__(199);
;// ./src/ui/styles/update-dialog.module.css

      
      
      
      
      
      
      
      
      

var update_dialog_module_options = {};

update_dialog_module_options.styleTagTransform = (styleTagTransform_default());
update_dialog_module_options.setAttributes = (setAttributesWithoutAttributes_default());
update_dialog_module_options.insert = insertBySelector_default().bind(null, "head");
update_dialog_module_options.domAPI = (styleDomAPI_default());
update_dialog_module_options.insertStyleElement = (insertStyleElement_default());

var update_dialog_module_update = injectStylesIntoStyleTag_default()(update_dialog_module/* default */.A, update_dialog_module_options);




       /* harmony default export */ const styles_update_dialog_module = (update_dialog_module/* default */.A && update_dialog_module/* default */.A.locals ? update_dialog_module/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/ui/styles/edit.module.css
var edit_module = __webpack_require__(3);
;// ./src/ui/styles/edit.module.css

      
      
      
      
      
      
      
      
      

var edit_module_options = {};

edit_module_options.styleTagTransform = (styleTagTransform_default());
edit_module_options.setAttributes = (setAttributesWithoutAttributes_default());
edit_module_options.insert = insertBySelector_default().bind(null, "head");
edit_module_options.domAPI = (styleDomAPI_default());
edit_module_options.insertStyleElement = (insertStyleElement_default());

var edit_module_update = injectStylesIntoStyleTag_default()(edit_module/* default */.A, edit_module_options);




       /* harmony default export */ const styles_edit_module = (edit_module/* default */.A && edit_module/* default */.A.locals ? edit_module/* default */.A.locals : undefined);

;// ./src/ui/styles/index.js
/**
 * Style Registry
 * 모든 CSS 스타일을 여기서 중앙 관리합니다.
 */

// 전역 스타일 (폰트 CDN)


// CSS Modules (자동으로 스코프 적용됨)




// CSS Modules를 사용하는 컴포넌트에서 import 가능하도록 export



;// ./node_modules/winbox/dist/winbox.bundle.min.js
/**
 * WinBox.js v0.2.82 (Bundle)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/winbox
 */
(function(){'use strict';var e,aa=document.createElement("style");aa.innerHTML="@keyframes wb-fade-in{0%{opacity:0}to{opacity:.85}}.winbox{position:fixed;left:0;top:0;background:#0050ff;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transition:width .3s,height .3s,left .3s,top .3s;transition-timing-function:cubic-bezier(.3,1,.3,1);contain:layout size;text-align:left;touch-action:none}.wb-body,.wb-header{position:absolute;left:0}.wb-header{top:0;width:100%;height:35px;line-height:35px;color:#fff;overflow:hidden;z-index:1}.wb-body{top:35px;right:0;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;will-change:contents;background:#fff;margin-top:0!important;contain:strict;z-index:0}.wb-control *,.wb-icon{background-repeat:no-repeat}.wb-drag{height:100%;padding-left:10px;cursor:move}.wb-title{font-family:Arial,sans-serif;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wb-icon{display:none;width:20px;height:100%;margin:-1px 8px 0-3px;float:left;background-size:100%;background-position:center}.wb-e,.wb-w{width:10px;top:0}.wb-n,.wb-s{left:0;height:10px;position:absolute}.wb-n{top:-5px;right:0;cursor:n-resize;z-index:2}.wb-e{position:absolute;right:-5px;bottom:0;cursor:w-resize;z-index:2}.wb-s{bottom:-5px;right:0;cursor:n-resize;z-index:2}.wb-nw,.wb-sw,.wb-w{left:-5px}.wb-w{position:absolute;bottom:0;cursor:w-resize;z-index:2}.wb-ne,.wb-nw,.wb-sw{width:15px;height:15px;z-index:2;position:absolute}.wb-nw{top:-5px;cursor:nw-resize}.wb-ne,.wb-sw{cursor:ne-resize}.wb-ne{top:-5px;right:-5px}.wb-se,.wb-sw{bottom:-5px}.wb-se{position:absolute;right:-5px;width:15px;height:15px;cursor:nw-resize;z-index:2}.wb-control{float:right;height:100%;max-width:100%;text-align:center}.wb-control *{display:inline-block;width:30px;height:100%;max-width:100%;background-position:center;cursor:pointer}.no-close .wb-close,.no-full .wb-full,.no-header .wb-header,.no-max .wb-max,.no-min .wb-min,.no-resize .wb-body~div,.wb-body .wb-hide,.wb-show,.winbox.hide,.winbox.min .wb-body>*,.winbox.min .wb-full,.winbox.min .wb-min,.winbox.modal .wb-full,.winbox.modal .wb-max,.winbox.modal .wb-min{display:none}.winbox.max .wb-drag,.winbox.min .wb-drag{cursor:default}.wb-min{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOCAwaDdhMSAxIDAgMCAxIDAgMkgxYTEgMSAwIDAgMSAwLTJoN3oiLz48L3N2Zz4=);background-size:14px auto;background-position:center calc(50% + 6px)}.wb-max{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHBhdGggZD0iTTIwIDcxLjMxMUMxNS4zNCA2OS42NyAxMiA2NS4yMyAxMiA2MFYyMGMwLTYuNjMgNS4zNy0xMiAxMi0xMmg0MGM1LjIzIDAgOS42NyAzLjM0IDExLjMxMSA4SDI0Yy0yLjIxIDAtNCAxLjc5LTQgNHY1MS4zMTF6Ii8+PHBhdGggZD0iTTkyIDc2VjM2YzAtNi42My01LjM3LTEyLTEyLTEySDQwYy02LjYzIDAtMTIgNS4zNy0xMiAxMnY0MGMwIDYuNjMgNS4zNyAxMiAxMiAxMmg0MGM2LjYzIDAgMTItNS4zNyAxMi0xMnptLTUyIDRjLTIuMjEgMC00LTEuNzktNC00VjM2YzAtMi4yMSAxLjc5LTQgNC00aDQwYzIuMjEgMCA0IDEuNzkgNCA0djQwYzAgMi4yMS0xLjc5IDQtNCA0SDQweiIvPjwvc3ZnPg==);background-size:17px auto}.wb-close{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xIC0xIDE4IDE4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMS42MTMuMjEuMDk0LjA4M0w4IDYuNTg1IDE0LjI5My4yOTNsLjA5NC0uMDgzYTEgMSAwIDAgMSAxLjQwMyAxLjQwM2wtLjA4My4wOTRMOS40MTUgOGw2LjI5MiA2LjI5M2ExIDEgMCAwIDEtMS4zMiAxLjQ5N2wtLjA5NC0uMDgzTDggOS40MTVsLTYuMjkzIDYuMjkyLS4wOTQuMDgzQTEgMSAwIDAgMSAuMjEgMTQuMzg3bC4wODMtLjA5NEw2LjU4NSA4IC4yOTMgMS43MDdBMSAxIDAgMCAxIDEuNjEzLjIxeiIvPjwvc3ZnPg==);background-size:15px auto;background-position:5px center}.wb-full{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYzbTE4IDBWNWEyIDIgMCAwIDAtMi0yaC0zbTAgMThoM2EyIDIgMCAwIDAgMi0ydi0zTTMgMTZ2M2EyIDIgMCAwIDAgMiAyaDMiLz48L3N2Zz4=);background-size:16px auto}.winbox.max .wb-body~div,.winbox.min .wb-body~div,.winbox.modal .wb-body~div,.winbox.modal .wb-drag,body.wb-lock iframe{pointer-events:none}.winbox.max{box-shadow:none}.winbox.max .wb-body{margin:0!important}.winbox iframe{position:absolute;width:100%;height:100%;border:0}body.wb-lock .winbox{will-change:left,top,width,height;transition:none}.winbox.modal:before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:inherit;border-radius:inherit}.winbox.modal:after{content:'';position:absolute;top:-50vh;left:-50vw;right:-50vw;bottom:-50vh;background:#0d1117;animation:wb-fade-in .2s ease-out forwards;z-index:-1}.no-animation{transition:none}.no-shadow{box-shadow:none}.no-header .wb-body{top:0}.no-move:not(.min) .wb-title{pointer-events:none}.wb-body .wb-show{display:revert}";
var h=document.getElementsByTagName("head")[0];h.firstChild?h.insertBefore(aa,h.firstChild):h.appendChild(aa);var ba=document.createElement("div");ba.innerHTML="<div class=wb-header><div class=wb-control><span class=wb-min></span><span class=wb-max></span><span class=wb-full></span><span class=wb-close></span></div><div class=wb-drag><div class=wb-icon></div><div class=wb-title></div></div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";function k(a,b,c,f){a&&a.addEventListener(b,c,f||!1)}function l(a,b){var c=window,f=m;c&&c.removeEventListener(a,b,f||!1)}function t(a,b){a.stopPropagation();b&&a.preventDefault()}function u(a,b,c){c=""+c;a["_s_"+b]!==c&&(a.style.setProperty(b,c),a["_s_"+b]=c)};/*
 self.max &&*/
var x=[],A=[],ca={capture:!0,passive:!1},m={capture:!0,passive:!0},B,da=0,E=10,F,J,ha,K,P,ia;
function U(a,b){if(!(this instanceof U))return new U(a);B||ja();if(a){if(b){var c=a;a=b}if("string"===typeof a)c=a;else{var f=a.id;var d=a.index;var n=a.root;var p=a.template;c=c||a.title;var v=a.icon;var L=a.mount;var Q=a.html;var g=a.url;var q=a.width;var r=a.height;var w=a.minwidth;var C=a.minheight;var y=a.maxwidth;var z=a.maxheight;var ea=a.autosize;var D=a.overflow;var G=a.min;var H=a.max;var I=a.hidden;var fa=a.modal;var X=a.x||(fa?"center":0);var Y=a.y||(fa?"center":0);var M=a.top;var N=a.left;
var R=a.bottom;var S=a.right;var la=a.background;var O=a.border;var T=a.header;var Z=a["class"];var ma=a.oncreate;var ra=a.onclose;var sa=a.onfocus;var ta=a.onblur;var ua=a.onmove;var va=a.onresize;var wa=a.onfullscreen;var xa=a.onmaximize;var ya=a.onminimize;var za=a.onrestore;var Aa=a.onhide;var Ba=a.onshow;var Ca=a.onload}}this.g=(p||ba).cloneNode(!0);this.g.id=this.id=f||"winbox-"+ ++da;this.g.className="winbox"+(Z?" "+("string"===typeof Z?Z:Z.join(" ")):"")+(fa?" modal":"");this.g.winbox=this;
this.window=this.g;this.body=this.g.getElementsByClassName("wb-body")[0];this.h=T||35;A.push(this);la&&this.setBackground(la);O?u(this.body,"margin",O+(isNaN(O)?"":"px")):O=0;T&&(b=this.g.getElementsByClassName("wb-header")[0],u(b,"height",T+"px"),u(b,"line-height",T+"px"),u(this.body,"top",T+"px"));c&&this.setTitle(c);v&&this.setIcon(v);L?this.mount(L):Q?this.body.innerHTML=Q:g&&this.setUrl(g,Ca);M=M?V(M,P):0;R=R?V(R,P):0;N=N?V(N,K):0;S=S?V(S,K):0;c=K-N-S;v=P-M-R;y=y?V(y,c):c;z=z?V(z,v):v;w=w?V(w,
y):150;C=C?V(C,z):this.h;ea?((n||B).appendChild(this.body),q=Math.max(Math.min(this.body.clientWidth+2*O+1,y),w),r=Math.max(Math.min(this.body.clientHeight+this.h+O+1,z),C),this.g.appendChild(this.body)):(q=q?V(q,y):Math.max(y/2,w)|0,r=r?V(r,z):Math.max(z/2,C)|0);X=X?V(X,c,q):N;Y=Y?V(Y,v,r):M;this.x=X;this.y=Y;this.width=q;this.height=r;this.s=w;this.o=C;this.m=y;this.l=z;this.top=M;this.right=S;this.bottom=R;this.left=N;this.index=d;this.j=D;this.focused=this.hidden=this.full=this.max=this.min=!1;
this.onclose=ra;this.onfocus=sa;this.onblur=ta;this.onmove=ua;this.onresize=va;this.onfullscreen=wa;this.onmaximize=xa;this.onminimize=ya;this.onrestore=za;this.onhide=Aa;this.onshow=Ba;I?this.hide():this.focus();if(d||0===d)this.index=d,u(this.g,"z-index",d),d>E&&(E=d);H?this.maximize():G?this.minimize():this.resize().move();ka(this);(n||B).appendChild(this.g);ma&&ma.call(this,a)}U["new"]=function(a){return new U(a)};U.stack=function(){return A};
function V(a,b,c){"string"===typeof a&&("center"===a?a=(b-c)/2+.5|0:"right"===a||"bottom"===a?a=b-c:(c=parseFloat(a),a="%"===(""+c!==a&&a.substring((""+c).length))?b/100*c+.5|0:c));return a}
function ja(){B=document.body;B[J="requestFullscreen"]||B[J="msRequestFullscreen"]||B[J="webkitRequestFullscreen"]||B[J="mozRequestFullscreen"]||(J="");ha=J&&J.replace("request","exit").replace("mozRequest","mozCancel").replace("Request","Exit");k(window,"resize",function(){na();oa()});k(B,"mousedown",function(){ia=!1},!0);k(B,"mousedown",function(){if(!ia){var a=A.length;if(a)for(--a;0<=a;a--){var b=A[a];if(b.focused){b.blur();break}}}});na()}
function ka(a){W(a,"drag");W(a,"n");W(a,"s");W(a,"w");W(a,"e");W(a,"nw");W(a,"ne");W(a,"se");W(a,"sw");k(a.g.getElementsByClassName("wb-min")[0],"click",function(b){t(b);a.min?a.restore().focus():a.minimize()});k(a.g.getElementsByClassName("wb-max")[0],"click",function(b){t(b);a.max?a.restore().focus():a.maximize().focus()});J?k(a.g.getElementsByClassName("wb-full")[0],"click",function(b){t(b);a.fullscreen().focus()}):a.addClass("no-full");k(a.g.getElementsByClassName("wb-close")[0],"click",function(b){t(b);
a.close()||(a=null)});k(a.g,"mousedown",function(){ia=!0},!0);k(a.body,"mousedown",function(){a.focus()},!0)}function pa(a){x.splice(x.indexOf(a),1);oa();a.removeClass("min");a.min=!1;a.g.title=""}function oa(){for(var a=x.length,b={},c={},f=0,d;f<a;f++)d=x[f],d=d.left+":"+d.top,c[d]?c[d]++:(b[d]=0,c[d]=1);f=0;for(var n,p;f<a;f++)d=x[f],n=d.left+":"+d.top,p=Math.min((K-d.left-d.right)/c[n],250),d.resize(p+1|0,d.h,!0).move(d.left+b[n]*p|0,P-d.bottom-d.h,!0),b[n]++}
function W(a,b){function c(g){t(g,!0);a.focus();if("drag"===b){if(a.min){a.restore();return}if(!a.g.classList.contains("no-max")){var q=Date.now(),r=q-Q;Q=q;if(300>r){a.max?a.restore():a.maximize();return}}}a.min||(B.classList.add("wb-lock"),(p=g.touches)&&(p=p[0])?(g=p,k(window,"touchmove",f,m),k(window,"touchend",d,m)):(k(window,"mousemove",f,m),k(window,"mouseup",d,m)),v=g.pageX,L=g.pageY)}function f(g){t(g);p&&(g=g.touches[0]);var q=g.pageX;g=g.pageY;var r=q-v,w=g-L,C=a.width,y=a.height,z=a.x,
ea=a.y,D;if("drag"===b){if(a.g.classList.contains("no-move"))return;a.x+=r;a.y+=w;var G=D=1}else{if("e"===b||"se"===b||"ne"===b){a.width+=r;var H=1}else if("w"===b||"sw"===b||"nw"===b)a.x+=r,a.width-=r,G=H=1;if("s"===b||"se"===b||"sw"===b){a.height+=w;var I=1}else if("n"===b||"ne"===b||"nw"===b)a.y+=w,a.height-=w,D=I=1}H&&(a.width=Math.max(Math.min(a.width,a.m,K-a.x-a.right),a.s),H=a.width!==C);I&&(a.height=Math.max(Math.min(a.height,a.l,P-a.y-a.bottom),a.o),I=a.height!==y);(H||I)&&a.resize();G&&
(a.max&&(a.x=(q<K/3?a.left:q>K/3*2?K-a.width-a.right:K/2-a.width/2)+r),a.x=Math.max(Math.min(a.x,a.j?K-30:K-a.width-a.right),a.j?30-a.width:a.left),G=a.x!==z);D&&(a.max&&(a.y=a.top+w),a.y=Math.max(Math.min(a.y,a.j?P-a.h:P-a.height-a.bottom),a.top),D=a.y!==ea);if(G||D)a.max&&a.restore(),a.move();if(H||G)v=q;if(I||D)L=g}function d(g){t(g);B.classList.remove("wb-lock");p?(l("touchmove",f),l("touchend",d)):(l("mousemove",f),l("mouseup",d))}var n=a.g.getElementsByClassName("wb-"+b)[0];if(n){var p,v,L,
Q=0;k(n,"mousedown",c,ca);k(n,"touchstart",c,ca)}}function na(){var a=document.documentElement;K=a.clientWidth;P=a.clientHeight}e=U.prototype;e.mount=function(a){this.unmount();a.i||(a.i=a.parentNode);this.body.textContent="";this.body.appendChild(a);return this};e.unmount=function(a){var b=this.body.firstChild;if(b){var c=a||b.i;c&&c.appendChild(b);b.i=a}return this};
e.setTitle=function(a){var b=this.g.getElementsByClassName("wb-title")[0];a=this.title=a;var c=b.firstChild;c?c.nodeValue=a:b.textContent=a;return this};e.setIcon=function(a){var b=this.g.getElementsByClassName("wb-icon")[0];u(b,"background-image","url("+a+")");u(b,"display","inline-block");return this};e.setBackground=function(a){u(this.g,"background",a);return this};
e.setUrl=function(a,b){var c=this.body.firstChild;c&&"iframe"===c.tagName.toLowerCase()?c.src=a:(this.body.innerHTML='<iframe src="'+a+'"></iframe>',b&&(this.body.firstChild.onload=b));return this};e.focus=function(a){if(!1===a)return this.blur();if(!this.focused){a=A.length;if(1<a)for(var b=1;b<=a;b++){var c=A[a-b];if(c.focused){c.blur();A.push(A.splice(A.indexOf(this),1)[0]);break}}u(this.g,"z-index",++E);this.index=E;this.addClass("focus");this.focused=!0;this.onfocus&&this.onfocus()}return this};
e.blur=function(a){if(!1===a)return this.focus();this.focused&&(this.removeClass("focus"),this.focused=!1,this.onblur&&this.onblur());return this};e.hide=function(a){if(!1===a)return this.show();if(!this.hidden)return this.onhide&&this.onhide(),this.hidden=!0,this.addClass("hide")};e.show=function(a){if(!1===a)return this.hide();if(this.hidden)return this.onshow&&this.onshow(),this.hidden=!1,this.removeClass("hide")};
e.minimize=function(a){if(!1===a)return this.restore();F&&qa();this.max&&(this.removeClass("max"),this.max=!1);this.min||(x.push(this),oa(),this.g.title=this.title,this.addClass("min"),this.min=!0,this.focused&&(this.blur(),Da()),this.onminimize&&this.onminimize());return this};function Da(){var a=A.length;if(a)for(--a;0<=a;a--){var b=A[a];if(!b.min){b.focus();break}}}
e.restore=function(){F&&qa();this.min&&(pa(this),this.resize().move(),this.onrestore&&this.onrestore());this.max&&(this.max=!1,this.removeClass("max").resize().move(),this.onrestore&&this.onrestore());return this};e.maximize=function(a){if(!1===a)return this.restore();F&&qa();this.min&&pa(this);this.max||(this.addClass("max").resize(K-this.left-this.right,P-this.top-this.bottom,!0).move(this.left,this.top,!0),this.max=!0,this.onmaximize&&this.onmaximize());return this};
e.fullscreen=function(a){this.min&&(pa(this),this.resize().move());if(!F||!qa())this.body[J](),F=this,this.full=!0,this.onfullscreen&&this.onfullscreen();else if(!1===a)return this.restore();return this};function qa(){F.full=!1;if(document.fullscreen||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement)return document[ha](),!0}
e.close=function(a){if(this.onclose&&this.onclose(a))return!0;this.min&&pa(this);A.splice(A.indexOf(this),1);this.unmount();this.g.remove();this.g.textContent="";this.g=this.body=this.g.winbox=null;this.focused&&Da()};e.move=function(a,b,c){a||0===a?c||(this.x=a?a=V(a,K-this.left-this.right,this.width):0,this.y=b?b=V(b,P-this.top-this.bottom,this.height):0):(a=this.x,b=this.y);u(this.g,"left",a+"px");u(this.g,"top",b+"px");this.onmove&&this.onmove(a,b);return this};
e.resize=function(a,b,c){a||0===a?c||(this.width=a?a=V(a,this.m):0,this.height=b?b=V(b,this.l):0,a=Math.max(a,this.s),b=Math.max(b,this.o)):(a=this.width,b=this.height);u(this.g,"width",a+"px");u(this.g,"height",b+"px");this.onresize&&this.onresize(a,b);return this};
e.addControl=function(a){var b=a["class"],c=a.image,f=a.click;a=a.index;var d=document.createElement("span"),n=this.g.getElementsByClassName("wb-control")[0],p=this;b&&(d.className=b);c&&u(d,"background-image","url("+c+")");f&&(d.onclick=function(v){f.call(this,v,p)});n.insertBefore(d,n.childNodes[a||0]);return this};e.removeControl=function(a){(a=this.g.getElementsByClassName(a)[0])&&a.remove();return this};e.addClass=function(a){this.g.classList.add(a);return this};
e.removeClass=function(a){this.g.classList.remove(a);return this};e.toggleClass=function(a){return this.g.classList.contains(a)?this.removeClass(a):this.addClass(a)};window.WinBox=U;}).call(undefined);

;// ./src/ui/components/main.js







// 메인 애플리케이션 클래스
class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.pluginWindow = null;
      this.pluginWindowRoot = document.createElement("div");
      this.editManager = null;
      this.modeToggleButton = null;
      // CSS Modules 클래스 사용 (자동으로 해시된 고유 클래스명)
      this.pluginWindowRoot.className = styles_base_module.container;
    }
  
    async initialize() {
      // RisuAPI 싱글톤 인스턴스 가져오기
      this.risuAPI = risu_api/* RisuAPI */.m.getInstance();

      if (!this.risuAPI) {
        console.log(`[${constants/* PLUGIN_NAME */.AF}] RisuAPI is not initialized`);
        return false;
      }

      // EditManager 초기화
      this.editManager = new EditManager();
      this.editManager.initialize();

      // UI 초기화
      this.initializeUI();
      this.startObserver(); 

      console.log(`[${constants/* PLUGIN_NAME */.AF}] plugin loaded`);
      return true;
    }
  
    initializeUI() {
    }
  
    openPluginWindow() {
      if (this.pluginWindow) return;
  
      const winboxConfig = {
        title: `${constants/* PLUGIN_NAME */.AF}`,
        x: "center",
        y: "center",
        width: Math.min(1080, window.innerWidth * 0.9) + "px",
        height: Math.min(800, window.innerHeight * 0.8) + "px",
        mount: this.pluginWindowRoot,
        background: "#0f131a",
        class: ["no-full", "no-max", "no-min", "rb-box"],
        onclose: () => {
          this.pluginWindow = null;
          location.hash = "";
        },
      };
  
      this.pluginWindow = new WinBox(winboxConfig);
      this.render();
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
      if (burgerEl && !burgerEl.classList.contains(`${constants/* PLUGIN_NAME */.AF}-btn-class`)) {
        // 편집 모드 토글 버튼 추가
        this.createModeToggleButton(burgerEl);
        
        burgerEl.classList.add(`${constants/* PLUGIN_NAME */.AF}-btn-class`);
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
      console.log(`${constants/* PLUGIN_NAME */.AF} 언로드`);
    }
  }
  
;// ./src/ui/components/updateManager/alert-dialog.js



/**
 * AlertDialog Custom Element
 * 간단한 알림 메시지를 표시하는 다이얼로그 컴포넌트
 */

const ELEMENT_TAG = `${constants/* PLUGIN_NAME */.AF}-alert-dialog`;

class AlertDialog extends HTMLElement {
  constructor() {
    super();
    this._cleanup = null;
  }

  static get observedAttributes() {
    return ["message", "btn-confirm"];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    // 포커스 설정 - data 속성으로 안전하게 선택
    setTimeout(() => this.querySelector('[data-confirm-btn]')?.focus(), 0);
  }

  disconnectedCallback() {
    if (this._cleanup) {
      this._cleanup();
    }
  }

  get message() {
    return this.getAttribute("message") || "";
  }

  get confirmText() {
    return this.getAttribute("btn-confirm") || "확인";
  }

  render() {
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.className = styles_update_dialog_module.udRoot;

    this.innerHTML = `
      <div class="${styles_update_dialog_module.udCard} ${styles_update_dialog_module.udAlert}" data-alert-card>
        <div class="${styles_update_dialog_module.udAlertMessage}">
          ${this.escapeHtml(this.message)}
        </div>
        <div class="${styles_update_dialog_module.udActions}">
          <button class="${styles_update_dialog_module.udBtnPrimary}" data-confirm-btn>${this.confirmText}</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // 키보드 이벤트
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        this.dispatchConfirm();
      }
    };

    // 확인 버튼 클릭 - data 속성으로 안전하게 선택
    const confirmBtn = this.querySelector('[data-confirm-btn]');
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => this.dispatchConfirm());
    }

    document.addEventListener("keydown", onKey);

    // Cleanup 함수 저장
    this._cleanup = () => {
      document.removeEventListener("keydown", onKey);
    };
  }

  dispatchConfirm() {
    // Custom Event 발생
    this.dispatchEvent(
      new CustomEvent("alert-confirm", {
        bubbles: true,
        composed: true,
      })
    );
  }

  escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }
}

// Custom Element 등록
if (!customElements.get(ELEMENT_TAG)) {
  customElements.define(ELEMENT_TAG, AlertDialog);
}

const ALERT_DIALOG_TAG = (/* unused pure expression or super */ null && (ELEMENT_TAG));

/**
 * AlertDialog를 표시하고 사용자 확인을 기다림
 * @param {string} message - 표시할 메시지
 * @param {string} [confirmText="확인"] - 확인 버튼 텍스트
 * @returns {Promise<void>}
 */
function alert_dialog_showAlert(message, confirmText = "확인") {
  return new Promise((resolve) => {
    const dialog = document.createElement(ALERT_DIALOG_TAG);
    dialog.setAttribute("message", message);
    dialog.setAttribute("btn-confirm", confirmText);

    const handler = () => {
      dialog.removeEventListener("alert-confirm", handler);
      dialog.remove();
      resolve();
    };

    dialog.addEventListener("alert-confirm", handler);
    document.body.appendChild(dialog);
  });
}

;// ./src/ui/components/updateManager/update-dialog.js
/**
 * UpdateDialog Custom Element
 * 플러그인 업데이트 확인 다이얼로그 컴포넌트
 */



const update_dialog_ELEMENT_TAG = `${constants/* PLUGIN_NAME */.AF}-update-dialog`;

class UpdateDialog extends HTMLElement {
  constructor() {
    super();
    this._cleanup = null;
  }

  static get observedAttributes() {
    return [
      "name",
      "current-version",
      "version",
      "released-at",
      "mandatory",
      "notes",
      "title",
      "btn-update",
      "btn-later",
      "btn-skip",
    ];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    // 포커스 설정 - data 속성으로 안전하게 선택
    setTimeout(() => this.querySelector('[data-action="update"]')?.focus(), 0);
  }

  disconnectedCallback() {
    if (this._cleanup) {
      this._cleanup();
    }
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  get currentVersion() {
    return this.getAttribute("current-version") || "0.0.0";
  }

  get version() {
    return this.getAttribute("version") || "0.0.0";
  }

  get releasedAt() {
    return this.getAttribute("released-at") || new Date().toISOString();
  }

  get mandatory() {
    return this.hasAttribute("mandatory");
  }

  get notes() {
    const notesAttr = this.getAttribute("notes");
    if (!notesAttr) return [];
    try {
      return JSON.parse(notesAttr);
    } catch {
      return [];
    }
  }

  get i18n() {
    return {
      title: this.getAttribute("title") || "플러그인 업데이트 준비 완료",
      primary: this.getAttribute("btn-update") || "지금 업데이트",
      later: this.getAttribute("btn-later") || "나중에",
      skip: this.getAttribute("btn-skip") || "이번 버전 건너뛰기",
    };
  }

  render() {
    const t = this.i18n;
    const mandatory = this.mandatory;
    const notes = this.notes;
    const s = styles_update_dialog_module; // 스타일 별칭

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.className = s.udRoot;

    const releasedDate = new Date(this.releasedAt).toLocaleDateString();
    const updateType = mandatory ? "필수 업데이트" : "선택 업데이트";

    const notesList =
      notes.length > 0
        ? notes
            .slice(0, 8)
            .map(
              (n) =>
                `<li class="${s[`ud${this.escapeHtml(n.type || "").trim().charAt(0).toUpperCase() + this.escapeHtml(n.type || "").trim().slice(1)}`] || ""}">${this.escapeHtml(n.text || "")}</li>`
            )
            .join("")
        : "<li>세부 변경사항은 릴리스 노트를 참고해주세요</li>";

    this.innerHTML = `
      <div class="${s.udCard}" data-update-card>
        <div class="${s.udTitle}">
          <h3>${t.title}${this.name ? ` · ${this.name}` : ""}</h3>
          <span class="${s.udPill}">v${this.currentVersion} → v${this.version}</span>
        </div>
        <div class="${s.udSub}">
          ${releasedDate} · ${updateType}
        </div>
        <ul class="${s.udList}" aria-label="변경사항">
          ${notesList}
        </ul>
        <div class="${s.udActions}">
          ${!mandatory ? `<button class="${s.udBtnGhost}" data-action="later">${t.later}</button>` : ""}
          ${!mandatory ? `<button class="${s.udBtnGhost}" data-action="skip">${t.skip}</button>` : ""}
          <button class="${s.udBtnPrimary}" data-action="update">${t.primary}</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const mandatory = this.mandatory;

    // 키보드 이벤트
    const onKey = (e) => {
      if (e.key === "Escape" && !mandatory) {
        this.dispatchAction("later");
      }
      if (e.key === "Enter") {
        this.dispatchAction("update");
      }
    };

    // 배경 클릭
    this.addEventListener("click", (e) => {
      if (!mandatory && e.target === this) {
        this.dispatchAction("later");
      }
    });

    // 버튼 클릭 - data-action 속성으로 안전하게 처리
    const buttons = this.querySelectorAll('[data-action]');
    buttons.forEach((btn) => {
      const action = btn.getAttribute('data-action');
      btn.addEventListener("click", () => this.dispatchAction(action));
    });

    document.addEventListener("keydown", onKey);

    // Cleanup 함수 저장
    this._cleanup = () => {
      document.removeEventListener("keydown", onKey);
    };
  }

  dispatchAction(action) {
    const detail = { action };

    if (action === "skip") {
      detail.skipVersion = this.version;
    }

    // Custom Event 발생
    this.dispatchEvent(
      new CustomEvent("update-action", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }
}

// Custom Element 등록
if (!customElements.get(update_dialog_ELEMENT_TAG)) {
  customElements.define(update_dialog_ELEMENT_TAG, UpdateDialog);
}

const update_dialog_UPDATE_DIALOG_TAG = (/* unused pure expression or super */ null && (update_dialog_ELEMENT_TAG));

;// ./src/core/update-manager.js





/**
 * unpkg에서 최신 버전의 메타데이터를 파싱
 * @returns {Promise<Object|null>} manifest 객체 또는 null
 */
async function fetchLatestManifest() {
  try {
    const url = `https://unpkg.com/${PLUGIN_NAME}@latest/dist/${PLUGIN_NAME}.js`;

    // HEAD 요청으로 redirect된 최종 URL 확인
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    // 실제 resolved 버전 확인 (예: https://unpkg.com/cdn-test1@0.2.0/dist/cdn_test1.js)
    const resolvedUrl = headResponse.url;
    const versionMatch = resolvedUrl.match(/@([\d.]+)\//);

    if (!versionMatch) {  
      throw new Error("Version not found in resolved URL");
    }

    const latestVersion = versionMatch[1];

    // 실제 파일 내용에서 배너 메타데이터 추출 (옵션)
    const content = await fetch(resolvedUrl).then((r) => r.text());
    const bannerRegex =
      /\/\/@name (.+?)\n\/\/@display-name (.+?)\n\/\/@version (.+?)\n\/\/@description (.+?)(?:\n|$)/;
    const bannerMatch = content.match(bannerRegex);

    // 릴리즈 노트 가져오기
    const notesUrl = `https://unpkg.com/${PLUGIN_NAME}@${latestVersion}/dist/release-notes.json`;
    let releaseData = {};

    try {
      const notesResponse = await fetch(notesUrl);
      if (notesResponse.ok) {
        const allNotes = await notesResponse.json();
        releaseData = allNotes[latestVersion] || {};
      }
    } catch (error) {
      console.warn("[UpdateManager] Failed to fetch release notes:", error);
    }

    return {
      version: latestVersion,
      url: resolvedUrl,
      name: bannerMatch?.[1]?.trim() || PLUGIN_NAME,
      displayName:
        bannerMatch?.[2]?.trim() || `${PLUGIN_NAME}_v${latestVersion}`,
      description: bannerMatch?.[4]?.trim() || "",
      mandatory: releaseData.mandatory || false,
      notes: releaseData.notes || [],
      released_at: releaseData.released_at || new Date().toISOString(),
    };
  } catch (error) {
    console.error("[UpdateManager] Failed to fetch manifest:", error);
    return null;
  }
}

/**
 * 버전 비교 (semver 기반)
 * @param {string} v1 - 비교할 버전 1
 * @param {string} v2 - 비교할 버전 2
 * @returns {number} v1 > v2: 1, v1 < v2: -1, v1 === v2: 0
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

/**
 * 플러그인 스크립트 업데이트
 * @param {Object} manifest - fetchLatestManifest()로 가져온 매니페스트
 * @returns {Promise<Object>} {success: boolean, error?: Error}
 */
async function updatePluginScript(manifest) { 
  try {
    // 1. unpkg에서 최신 스크립트 fetch
    console.log("[UpdateManager] Fetching latest script from unpkg:", manifest.url);
    const scriptContent = await fetch(manifest.url).then((r) => r.text());

    // 2. 스크립트 파싱
    console.log("[UpdateManager] Parsing plugin script...");
    const parsed = parsePluginScript(scriptContent);

    return scriptUpdater(parsed); 
  } catch (error) {
    console.error("[UpdateManager] Plugin update failed:", error);
    return { success: false, error };
  }
}

/**
 * 업데이트 확인 UI (Web Components 사용)
 */
function confirmUpdate(opts) {
  const {
    name,
    currentVersion,
    manifest,
    i18n = {},
    mandatory = manifest.mandatory === true,
  } = opts;

  const t = Object.assign(
    {
      title: "플러그인 업데이트 준비 완료",
      primary: "지금 업데이트",
      later: "나중에",
      skip: "이번 버전 건너뛰기",
    },
    i18n
  );

  // UpdateDialog Custom Element 생성
  const dialog = document.createElement(UPDATE_DIALOG_TAG); 

  // 속성 설정
  if (name) dialog.setAttribute("name", name);
  dialog.setAttribute("current-version", currentVersion);
  dialog.setAttribute("version", manifest.version);
  dialog.setAttribute("released-at", manifest.released_at || new Date().toISOString());
  if (mandatory) dialog.setAttribute("mandatory", "");
  dialog.setAttribute("notes", JSON.stringify(manifest.notes || []));

  // 다국어 설정
  dialog.setAttribute("title", t.title);
  dialog.setAttribute("btn-update", t.primary);
  dialog.setAttribute("btn-later", t.later);
  dialog.setAttribute("btn-skip", t.skip);

  // Promise로 사용자 액션 대기
  const promise = new Promise((resolve) => {
    const handler = (event) => {
      const { action, skipVersion } = event.detail;

      // 결과 구성
      const result = { action };
      if (action === "update") {
        result.url = manifest.url;
      } else if (action === "skip") {
        result.skipVersion = skipVersion;
      }

      // 정리 및 resolve
      dialog.removeEventListener("update-action", handler);
      dialog.remove();
      resolve(result);
    };

    dialog.addEventListener("update-action", handler);
  });

  document.body.appendChild(dialog);
  return promise;
}

/**
 * Skip 버전 확인
 * @param {string} latestVersion - 최신 버전
 * @param {boolean} force - skip 버전 무시 여부
 * @param {boolean} silent - silent 모드
 * @returns {Object|null} skip된 경우 결과 객체, 아니면 null
 */
function checkSkippedVersion(latestVersion, force, silent) {
  if (force) return null;

  const skipKey = `${PLUGIN_NAME}_skip_version`;
  const skipVersion = localStorage.getItem(skipKey);
  
  if (skipVersion === latestVersion) {
    if (!silent) {
      console.log(
        `[UpdateManager] Version ${latestVersion} is skipped by user`
      );
    }
    return { available: false, skipped: true, version: latestVersion };
  }
  
  return null;
}

/**
 * 버전 비교 및 업데이트 필요 여부 확인
 * @param {string} latestVersion - 최신 버전
 * @param {string} currentVersion - 현재 버전
 * @param {boolean} silent - silent 모드
 * @returns {Object|null} 업데이트 불필요한 경우 결과 객체, 필요하면 null
 */
function checkVersionUpdateNeeded(latestVersion, currentVersion, silent) {
  const comparison = compareVersions(latestVersion, currentVersion);

  if (comparison <= 0) {
    if (!silent) {
      console.log(`[UpdateManager] Already up to date (${currentVersion})`);
    }
    return {
      available: false,
      current: currentVersion,
      latest: latestVersion,
    };
  }

  return null;
}

/**
 * 업데이트 실행 및 처리
 * @param {Object} manifest - 매니페스트
 * @param {string} latestVersion - 최신 버전
 * @returns {Promise<Object>} 업데이트 결과
 */
async function executeUpdate(manifest, latestVersion) {
  console.log("[UpdateManager] Updating to version", latestVersion);
  console.log("update test")  
  const updateResult = await updatePluginScript(manifest);

  if (updateResult.success) {  
    console.log("[UpdateManager] Plugin script updated successfully");
    await showAlert("업데이트가 완료되었습니다.\n\n업데이트된 스크립트를 적용하기 위해\n페이지를 새로고침합니다.");
    window.location.reload();
    return { available: true, action: "updated", version: latestVersion };
  }

  console.error("[UpdateManager] Plugin update failed:", updateResult.error);
  alert(
    `업데이트 실패: ${updateResult.error?.message || "알 수 없는 오류"}\n\n페이지를 새로고침하여 다시 시도해주세요.`
  );
  return {
    available: true,
    action: "update_failed",
    error: updateResult.error,
  };
}

/**
 * 사용자 액션 결과 처리
 * @param {Object} result - confirmUpdate 결과
 * @param {Object} manifest - 매니페스트
 * @param {string} latestVersion - 최신 버전
 * @returns {Promise<Object>} 처리 결과
 */
async function handleUserAction(result, manifest, latestVersion) {
  if (result.action === "update") {
    return await executeUpdate(manifest, latestVersion);
  }

  if (result.action === "skip") {
    const skipKey = `${PLUGIN_NAME}_skip_version`;
    localStorage.setItem(skipKey, result.skipVersion);
    console.log("[UpdateManager] Skipped version", result.skipVersion);
    return {
      available: true,
      action: "skipped",
      version: result.skipVersion,
    };
  }

  console.log("[UpdateManager] Update postponed");
  return { available: true, action: "later", version: latestVersion };
}

/**
 * 업데이트 체크 및 사용자 확인
 * @param {Object} options - 옵션
 * @param {boolean} [options.silent=false] - silent 모드 (로그 최소화)
 * @param {boolean} [options.force=false] - skip 버전 무시
 * @param {Object} [options.i18n={}] - 다국어 텍스트
 * @returns {Promise<Object>} 업데이트 결과
 */
async function checkForUpdates(options = {}) {
  const { silent = false, force = false, i18n = {} } = options;

  try {
    const manifest = await fetchLatestManifest();

    if (!manifest) {
      if (!silent) console.log("[UpdateManager] Unable to check for updates");
      return { available: false, error: "fetch_failed" };
    }

    const currentVersion = PLUGIN_VERSION;
    const latestVersion = manifest.version;

    // Skip 버전 확인
    const skipResult = checkSkippedVersion(latestVersion, force, silent);
    if (skipResult) return skipResult;

    // 버전 비교
    const versionResult = checkVersionUpdateNeeded(latestVersion, currentVersion, silent);
    if (versionResult) return versionResult;

    console.log(
      `[UpdateManager] New version available: ${currentVersion} → ${latestVersion}`
    );

    // 사용자 확인 UI 표시
    const result = await confirmUpdate({
      name: PLUGIN_NAME,
      currentVersion,
      manifest,
      i18n,
    });

    // 결과 처리
    return await handleUserAction(result, manifest, latestVersion);
  } catch (error) {
    console.error("[UpdateManager] Check failed:", error);
    return { available: false, error: error.message };
  }
}



;// ./src/ui/components/index.js
/**
 * Web Components 중앙 레지스트리
 * 모든 Custom Elements를 여기서 관리합니다.
 */

// UI 컴포넌트


// 업데이트 매니저 컴포넌트




;// ./src/index.js





 // Style Registry
 // Web Components 레지스트리

// 애플리케이션 실행
(async () => {
  try {
    // 1. RisuAPI 싱글톤 초기화 (최초 한 번만)
    const risuAPI = risu_api/* RisuAPI */.m.getInstance(globalThis.__pluginApis__);
    const initialized = await risuAPI.initialize();

    if (!initialized) {
      console.error(`[${constants/* PLUGIN_NAME */.AF}] Failed to initialize RisuAPI`);
      return;
    }

    // 2. 개발 모드일 때만 Hot Reload 활성화
    if (true) {
      try {
        // Static import - 메인 번들에 포함 (chunk 분리 없음)
        const { initHotReload } = __webpack_require__(288);
        initHotReload();
        console.log(`[${constants/* PLUGIN_NAME */.AF}] 🔥 Hot Reload enabled`);
      } catch (error) {
        console.warn('[App] Hot reload initialization failed:', error);
      }
    }

    // 3. 업데이트 체크 (백그라운드, silent 모드-로그 최소화)
    // 개발 모드에서는 업데이트 체크 비활성화
    if (false) // removed by dead control flow
{}

    // 4. 외부 스크립트 import(script 태그 추가)
    injectScripts();

    // 5. App 초기화
    const app = new App();
    await app.initialize();

    console.log(`${constants/* PLUGIN_NAME */.AF} v${constants/* PLUGIN_VERSION */.jN} loaded`);

    // 6. 언로드 핸들러 등록
    risuAPI.onUnload(() => {
      app.destroy();
    });

  } catch (error) {
    console.error(`[${constants/* PLUGIN_NAME */.AF}] Initialization failed:`, error);
  }
})();

risuHanddamEdit = __webpack_exports__;
/******/ })()
;