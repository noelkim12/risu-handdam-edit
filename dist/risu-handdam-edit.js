//@name risu-handdam-edit
//@display-name risu-handdam-edit_v0.3.0
//@version 0.3.0
//@description RisuAI 한땀한땀 수정 지원 Plugin
//@arg excludeBotName string
//@arg minLength int
//@arg editMode string
//@arg buttonPosition string
//@dev-mode true
//@dev-server ws://localhost:13131
//@link https://unpkg.com/risu-handdam-edit@0.3.0/dist/risu-handdam-edit.js
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

/* 선택 모달 스타일 */
.edit-module__selectionModal--wWbW2 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 10000;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.edit-module__selectionModalHeader--AVAEf {
  position: sticky;
  top: 0;
  background: white;
  padding: 20px 20px 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  z-index: 1;
  flex-shrink: 0;
}

.edit-module__selectionModalTitleRow--qBh9R {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.edit-module__selectionModalTitle--vpufb {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  line-height: 1.4;
}

.edit-module__selectionModalTitleCount--iyZpX {
  color: #6b7280;
  font-weight: 500;
  font-size: 14px;
}

.edit-module__selectionModalCancelBtn--E3yQt {
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
}

.edit-module__selectionModalCancelBtn--E3yQt:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.edit-module__selectionModalSelectedTextContainer--pn8EP {
  padding: 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.edit-module__selectionModalSelectedTextLabel--e_uKW {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  font-weight: 500;
}

.edit-module__selectionModalSelectedText--YrjR5 {
  font-size: 14px;
  color: #111827;
  word-break: break-word;
}

.edit-module__selectionModalBody--KB6Ne {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.edit-module__selectionModalItem--KOz5E {
  padding: 12px 16px;
  margin-bottom: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.edit-module__selectionModalItem--KOz5E:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.edit-module__selectionModalItemHeader--KS7AR {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.edit-module__selectionModalItemTitle--M5YRK {
  font-weight: 600;
  color: #111827;
  font-size: 14px;
}

.edit-module__selectionModalItemLineNumber--BjjqT {
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.edit-module__selectionModalItemContext--VHzPr {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
  word-break: break-word;
}

/* 매칭 방법 배지 */
.edit-module__selectionModalMethodBadge--BZlAz {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.edit-module__selectionModalMethodBadgeExact--drMWa {
  background: #d1fae5;
  color: #065f46;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.edit-module__selectionModalMethodBadgeFuzzy--FhPgm {
  background: #fef3c7;
  color: #92400e;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.edit-module__selectionModalMethodBadgeAnchor--h0Uxw {
  background: #dbeafe;
  color: #1e40af;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* 삭제 애니메이션 이미지 */
.edit-module__floatingDeleteImg--KuRwo {
  position: absolute;
  width: 50px;
  height: 50px;
  opacity: 0;
  transition: transform 0.6s ease-out, opacity 0.6s ease-out;
  pointer-events: none;
  z-index: 10000;
}

.edit-module__floatingDeleteImgFromLeft--EVE89 {
  transform: translateX(-150%);
}

.edit-module__floatingDeleteImgFromRight--qme1v {
  transform: translateX(150%);
}

.edit-module__floatingDeleteImgAppear--DOjJE {
  transform: translateX(0);
  opacity: 1;
}

/* 편집 다이얼로그 스타일 */
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

`, ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"hddmButtonWrapper": `edit-module__hddmButtonWrapper--Rn4z_`,
	"hddmEditButton": `edit-module__hddmEditButton--CTBGh`,
	"hddmBtnAppended": `edit-module__hddmBtnAppended--Pq6xL`,
	"floatingActionButton": `edit-module__floatingActionButton--ORYa8`,
	"chatEditTextarea": `edit-module__chatEditTextarea--uUxKD`,
	"chatEditButtons": `edit-module__chatEditButtons--m78HV`,
	"chatSaveBtn": `edit-module__chatSaveBtn--foYfH`,
	"chatCancelBtn": `edit-module__chatCancelBtn--Uh5JE`,
	"xRisuLbNaiCharacterCard": `edit-module__xRisuLbNaiCharacterCard--HnOf5`,
	"xRisuLbNaiCompCard": `edit-module__xRisuLbNaiCompCard--ZHRgO`,
	"selectionModal": `edit-module__selectionModal--wWbW2`,
	"selectionModalHeader": `edit-module__selectionModalHeader--AVAEf`,
	"selectionModalTitleRow": `edit-module__selectionModalTitleRow--qBh9R`,
	"selectionModalTitle": `edit-module__selectionModalTitle--vpufb`,
	"selectionModalTitleCount": `edit-module__selectionModalTitleCount--iyZpX`,
	"selectionModalCancelBtn": `edit-module__selectionModalCancelBtn--E3yQt`,
	"selectionModalSelectedTextContainer": `edit-module__selectionModalSelectedTextContainer--pn8EP`,
	"selectionModalSelectedTextLabel": `edit-module__selectionModalSelectedTextLabel--e_uKW`,
	"selectionModalSelectedText": `edit-module__selectionModalSelectedText--YrjR5`,
	"selectionModalBody": `edit-module__selectionModalBody--KB6Ne`,
	"selectionModalItem": `edit-module__selectionModalItem--KOz5E`,
	"selectionModalItemHeader": `edit-module__selectionModalItemHeader--KS7AR`,
	"selectionModalItemTitle": `edit-module__selectionModalItemTitle--M5YRK`,
	"selectionModalItemLineNumber": `edit-module__selectionModalItemLineNumber--BjjqT`,
	"selectionModalItemContext": `edit-module__selectionModalItemContext--VHzPr`,
	"selectionModalMethodBadge": `edit-module__selectionModalMethodBadge--BZlAz`,
	"selectionModalMethodBadgeExact": `edit-module__selectionModalMethodBadgeExact--drMWa`,
	"selectionModalMethodBadgeFuzzy": `edit-module__selectionModalMethodBadgeFuzzy--FhPgm`,
	"selectionModalMethodBadgeAnchor": `edit-module__selectionModalMethodBadgeAnchor--h0Uxw`,
	"floatingDeleteImg": `edit-module__floatingDeleteImg--KuRwo`,
	"floatingDeleteImgFromLeft": `edit-module__floatingDeleteImgFromLeft--EVE89`,
	"floatingDeleteImgFromRight": `edit-module__floatingDeleteImgFromRight--qme1v`,
	"floatingDeleteImgAppear": `edit-module__floatingDeleteImgAppear--DOjJE`,
	"editDialog": `edit-module__editDialog--lBuaQ`,
	"editDialogTextarea": `edit-module__editDialogTextarea--gJtaB`,
	"editDialogButtons": `edit-module__editDialogButtons--mmUQ4`,
	"editDialogButton": `edit-module__editDialogButton--A6OJ0`,
	"editDialogSaveButton": `edit-module__editDialogSaveButton--EFn8i`,
	"editDialogCancelButton": `edit-module__editDialogCancelButton--Zfll9`
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

/***/ 383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initHotReload: () => (/* binding */ initHotReload),
/* harmony export */   stopHotReload: () => (/* binding */ stopHotReload)
/* harmony export */ });
/* harmony import */ var _script_updater_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(531);
/**
 * Auto-generated Hot Reload Client
 *
 * DO NOT EDIT THIS FILE MANUALLY!
 * This file is automatically generated in development mode.
 *
 * Generated at: 2025-11-07T17:55:13.315Z
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
      const parsed = (0,_script_updater_js__WEBPACK_IMPORTED_MODULE_0__/* .parsePluginScript */ .o)(scriptContent);

      console.log('[HotReload] 🔄 Updating plugin...');
      const result = await (0,_script_updater_js__WEBPACK_IMPORTED_MODULE_0__/* .scriptUpdater */ .d)(parsed);

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
   true ? "0.3.0" : 0;

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

/***/ 531:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ scriptUpdater),
/* harmony export */   o: () => (/* binding */ parsePluginScript)
/* harmony export */ });
/* harmony import */ var _risu_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(300);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(521);



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
  const risuAPI = _risu_api_js__WEBPACK_IMPORTED_MODULE_0__/* .RisuAPI */ .m.getInstance();
  if (!risuAPI) {
    throw new Error("RisuAPI is not initialized. Please ensure the plugin is loaded.");
  }

  // 4. 기존 플러그인 찾기 및 백업
  const db = risuAPI.getDatabase();
  const oldPluginIndex = db.plugins.findIndex((p) => p.name === _constants_js__WEBPACK_IMPORTED_MODULE_1__/* .PLUGIN_NAME */ .AF);
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
  const ANCH = opts.anchorLength ?? 5;
  
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
  
  // 2순위: Head/Tail 앵커 매칭 (매칭이 없을 때만)
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

  // 3순위: Fuzzy 매칭 (정확한 매칭이 없거나 적을 때)
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
  
  // start 위치로 정렬
  // matches.sort((a, b) => a.start - b.start);
  
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
  const MAX_FUZZY_MATCHES = 3; // Fuzzy 매칭 결과 최대 개수
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();
  
  if (lowerSearch.length > FUZZY_MAX) {
    return matches;
  }
  
  const step = Math.max(1, Math.floor(lowerSearch.length / 4));
  const maxDistance = Math.max(5, Math.floor(lowerSearch.length * FUZZY_THRESHOLD));
  
  for (let i = 0; i + lowerSearch.length <= lowerNormalized.length; i += step) {
    // 최대 개수에 도달하면 조기 종료
    if (matches.length >= MAX_FUZZY_MATCHES) {
      break;
    }
    
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


;// ./src/core/text-selection-handler.js
/**
 * 텍스트 선택 핸들러
 * 사용자가 텍스트를 선택했을 때 처리하는 핸들러
 */




const MIN_SELECTION_LENGTH = 5;

/**
 * 모바일 환경 감지
 */
function isMobile() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

class TextSelectionHandler {
  constructor(editManager) {
    this.editManager = editManager;
    this.risuAPI = risu_api/* RisuAPI */.m.getInstance();
    this.isEnabled = false;
    this.currentSelection = null;
    this.selectionTimeout = null;
    this.lastSelectionText = null; // 이전 selection 텍스트 저장 (변경 감지용)
    this.isMobileDevice = isMobile(); // 모바일 환경 여부
    
    // 이벤트 리스너를 바인딩하여 저장 (removeEventListener를 위해 필요)
    this._boundHandleSelection = this.handleSelection.bind(this);
    this._boundHandleKeyUp = this.handleKeyUp.bind(this);
    this._boundHandleSelectionChange = this.handleSelectionChange.bind(this);
  }

  /**
   * 텍스트 선택 핸들러 활성화
   */
  enable() {
    if (this.isEnabled) return;
    this.isEnabled = true;
    
    if (this.isMobileDevice) {
      // 모바일: selectionchange 이벤트로 selection 변경 감지
      document.addEventListener("selectionchange", this._boundHandleSelectionChange);
    } else {
      // 데스크톱: 기존 이벤트 사용
      document.addEventListener("mouseup", this._boundHandleSelection);
      document.addEventListener("keyup", this._boundHandleKeyUp);
      document.addEventListener("dblclick", this._boundHandleSelection);
    }
  }

  /**
   * 텍스트 선택 핸들러 비활성화
   */
  disable() {
    if (!this.isEnabled) return;
    this.isEnabled = false;
    
    if (this.isMobileDevice) {
      document.removeEventListener("selectionchange", this._boundHandleSelectionChange);
    } else {
      document.removeEventListener("mouseup", this._boundHandleSelection);
      document.removeEventListener("keyup", this._boundHandleKeyUp);
      document.removeEventListener("dblclick", this._boundHandleSelection);
    }
    this.clearSelection();
  }

  /**
   * 모바일: selectionchange 이벤트 처리 (selection handle 이동 감지)
   */
  handleSelectionChange() {
    // 기존 타임아웃 취소
    if (this.selectionTimeout) {
      clearTimeout(this.selectionTimeout);
    }

    // 짧은 지연 후 처리 (selection이 안정화될 때까지 대기)
    this.selectionTimeout = setTimeout(() => {
      this.handleSelection();
    }, 150);
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

    // 모바일/데스크톱 모두 selection의 실제 rect 정보 반환
    // edit-manager에서 최적 위치를 계산하도록 함
    return {
      top: rect.top + scrollY,           // selection 상단 (절대 위치)
      left: rect.left + scrollX,         // selection 좌측 (절대 위치)
      right: rect.right + scrollX,       // selection 우측 (절대 위치)
      bottom: rect.bottom + scrollY,     // selection 하단 (절대 위치)
      width: rect.width,                 // selection 너비
      height: rect.height,               // selection 높이
      viewportTop: rect.top,             // viewport 기준 상단 위치
      viewportBottom: rect.bottom,       // viewport 기준 하단 위치
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

  /**
   * Get buttonPosition
   * 버튼 위치 (top, bottom)
   * @type {string}
   */
  get buttonPosition() {
    return this._get('buttonPosition', "top");
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

  /**
   * Set buttonPosition
   * 버튼 위치 (top, bottom)
   * @param {string} value - New value
   */
  set buttonPosition(value) {
    if (typeof value !== 'string') {
      throw new TypeError('buttonPosition must be a string');
    }
    this._set('buttonPosition', value);
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



;// ./src/ui/components/img/del-img-components.js
const DEL_IMG_LEFT  = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAOQ0lEQVR4nO2deWxVVR7Hn4AKRBAhqLUsmbgQmWICxA6yKEhGBeaPApmgQJDpyCYopECIEIg6DpsyQZsQUAKBsi9aZZRlWhgKyHZZFBBRQIGyyA5FKVt/k+9vPC+np3e/577eB++X3OQtd/197m8759x7YmQihmFUWLxKYWEhDRgwgJo3b05paWn00EMPUdOmTemVV16hxYsX05UrV8qtv2TJEnruuefo119/9XQu+D5jxgzq378/tWzZkmKxGC/4jN/wn5/zryyJWf3hF8r3339PnTt3jivGaoHCjhw5wtusWLGCqlSpQsuWLdN2YWagkgGSViDr1q2jBx98MK70evXqUVZWFo0ZM4beeecd6tu3L2VkZFB2djZ9/fXXvM2XX35J1atXp/T0dLp69areq1OuAyAEDL+WnzRA9u/fzwAA4q677qKcnBw6duxYhfVu3LgR/7xy5UqqWbMmb9OlSxdKhMhgZECRB+IFyq1bt6hDhw6s2GrVqlFeXp7jgWUYWBBbEilRBaMFCJQrFAv35CRYHzFDjikvvfQSVYboSGASBsTtCffq1YuV2qBBA7p8+bLt/r766itet3379lRQUECZmZn8vUmTJnTt2jVKtFWoMSXyQJygQImPP/44K3XgwIG2+8nPz+cAPmrUqHgsyc3N5W3vvfde+vHHH4Nej6vrkLMvsUQl+3IFxA7KiRMn6P7772elfvLJJ5bbL126lBo3bkzLly+vUK8It7V+/fog12J6zkL5MgCh/CgA8A3ECsrRo0epVq1arND58+ebbof6AumvmQUUFRXFgRQWFvq/EofzlcGIJemBmMmlS5fokUceYYVOnDixwv+rVq2iKVOmUGlpqen2CxcujKfKO3futDyOVUWuFpuyoqMWsEOxELOA+Pzzz8cDtZCysjL64YcfaNOmTab7EHfpE088wdvC7X344YeWCnfj59XzM4MTdQnssiAfffQRKw2pLLIoAURulzKD+emnn9J9993H2/bp06fCsdTg68bNyMdRXdNtBcTO/NF+dc8997Bi0Yh48uRJR6Vu3LiRnn32Wd6matWqtGPHDl/HtlpfjRlRjBehAUETCdJWKHf06NHcTmWnELiyjh07xt0R0mC/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`;
const DEL_IMG_RIGHT = `data:image/png;base64,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`;
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
    const s = styles_edit_module;
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
    const s = styles_edit_module; // 스타일 별칭
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

    const s = styles_edit_module; // 스타일 별칭
    
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
    const s = styles_edit_module; // 스타일 별칭

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
    const s = styles_edit_module;
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
    
    const s = styles_edit_module;
    
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


;// ./src/ui/components/main.js






// 버거 메뉴 셀렉터 상수
const BURGER_SELECTOR = "div.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md";

// 메인 애플리케이션 클래스
class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.pluginWindow = null;
      this.pluginWindowRoot = document.createElement("div");
      this.editManager = null;
      this.pluginWindowRoot.className = styles_base_module.container;
      this._positionCallbackRegistered = false;
    }

    async initialize() {
      this.risuAPI = risu_api/* RisuAPI */.m.getInstance();

      if (!this.risuAPI) {
        console.log(`[${constants/* PLUGIN_NAME */.AF}] RisuAPI is not initialized`);
        return false;
      }

      // EditManager 초기화
      this.editManager = new EditManager();
      this.editManager.initialize();

      // 위치 변경 콜백 한 번만 등록
      this.setupPositionChangeCallback();

      // UI 초기화
      this.startObserver();

      console.log(`[${constants/* PLUGIN_NAME */.AF}] plugin loaded`);
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
      if (burgerEl && !burgerEl.classList.contains(`${constants/* PLUGIN_NAME */.AF}-btn-class`)) {
        this.createToggleButtons(burgerEl);
        burgerEl.classList.add(`${constants/* PLUGIN_NAME */.AF}-btn-class`);
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

const ALERT_DIALOG_TAG = ELEMENT_TAG;

/**
 * AlertDialog를 표시하고 사용자 확인을 기다림
 * @param {string} message - 표시할 메시지
 * @param {string} [confirmText="확인"] - 확인 버튼 텍스트
 * @returns {Promise<void>}
 */
function showAlert(message, confirmText = "확인") {
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

const UPDATE_DIALOG_TAG = update_dialog_ELEMENT_TAG;

// EXTERNAL MODULE: ./src/core/script-updater.js
var script_updater = __webpack_require__(531);
;// ./src/core/update-manager.js





/**
 * unpkg에서 최신 버전의 메타데이터를 파싱
 * @returns {Promise<Object|null>} manifest 객체 또는 null
 */
async function fetchLatestManifest() {
  try {
    const url = `https://unpkg.com/${constants/* PLUGIN_NAME */.AF}@latest/dist/${constants/* PLUGIN_NAME */.AF}.js`;

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
    const notesUrl = `https://unpkg.com/${constants/* PLUGIN_NAME */.AF}@${latestVersion}/dist/release-notes.json`;
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
      name: bannerMatch?.[1]?.trim() || constants/* PLUGIN_NAME */.AF,
      displayName:
        bannerMatch?.[2]?.trim() || `${constants/* PLUGIN_NAME */.AF}_v${latestVersion}`,
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
    const parsed = (0,script_updater/* parsePluginScript */.o)(scriptContent);

    return (0,script_updater/* scriptUpdater */.d)(parsed); 
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

  const skipKey = `${constants/* PLUGIN_NAME */.AF}_skip_version`;
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
    const skipKey = `${constants/* PLUGIN_NAME */.AF}_skip_version`;
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

    const currentVersion = constants/* PLUGIN_VERSION */.jN;
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
      name: constants/* PLUGIN_NAME */.AF,
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
        const { initHotReload } = __webpack_require__(383);
        initHotReload();
        console.log(`[${constants/* PLUGIN_NAME */.AF}] 🔥 Hot Reload enabled`);
      } catch (error) {
        console.warn('[App] Hot reload initialization failed:', error);
      }
    }

    // 3. 업데이트 체크 (백그라운드, silent 모드-로그 최소화)
    checkForUpdates({ silent: true }).catch(err => {
      console.warn('[App] Update check failed:', err);
    });

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