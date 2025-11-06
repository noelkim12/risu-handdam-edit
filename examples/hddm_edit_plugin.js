//@name Handdam Edit Plugin
//@display-name Handdam Edit Plugin_v0.8
//@version 0.8
//@description Handdam Edit Plugin for RISU AI
//@args excludeBotName string

// ----------------------------------------------------------------
// LBI 긴빠이
const pluginApis = globalThis.__pluginApis__;
const risuAPI = {
  risuFetch: pluginApis.risuFetch,
  nativeFetch: pluginApis.nativeFetch,
  getArg: pluginApis.getArg,
  getChar: pluginApis.getChar,
  setChar: pluginApis.setChar,
  addProvider: pluginApis.addProvider,
  addRisuScriptHandler: pluginApis.addRisuScriptHandler,
  removeRisuScriptHandler: pluginApis.removeRisuScriptHandler,
  addRisuReplacer: pluginApis.addRisuReplacer,
  removeRisuReplacer: pluginApis.removeRisuReplacer,
  onUnload: pluginApis.onUnload,
  setArg: pluginApis.setArg,
  getDatabase: null,
};
{
  try {
    risuAPI.getDatabase = eval("getDatabase");
  } catch (error) {}
}

// auto title 플러그인 버그패치 긴빠이
if (globalThis.__pluginApis__ && globalThis.__pluginApis__.setArg) {
  const originalSetArg = globalThis.__pluginApis__.setArg;
  globalThis.__pluginApis__.setArg = function (arg, value) {
    if (typeof arg !== "string") {
      return;
    }
    return originalSetArg.call(this, arg, value);
  };
}

const b64deleteImg1 = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAA9hAAAPYQGoP6dpAAAOQ0lEQVR4nO2deWxVVR7Hn4AKRBAhqLUsmbgQmWICxA6yKEhGBeaPApmgQJDpyCYopECIEIg6DpsyQZsQUAKBsi9aZZRlWhgKyHZZFBBRQIGyyA5FKVt/k+9vPC+np3e/577eB++X3OQtd/197m8759x7YmQihmFUWLxKYWEhDRgwgJo3b05paWn00EMPUdOmTemVV16hxYsX05UrV8qtv2TJEnruuefo119/9XQu+D5jxgzq378/tWzZkmKxGC/4jN/wn5/zryyJWf3hF8r3339PnTt3jivGaoHCjhw5wtusWLGCqlSpQsuWLdN2YWagkgGSViDr1q2jBx98MK70evXqUVZWFo0ZM4beeecd6tu3L2VkZFB2djZ9/fXXvM2XX35J1atXp/T0dLp69areq1OuAyAEDL+WnzRA9u/fzwAA4q677qKcnBw6duxYhfVu3LgR/7xy5UqqWbMmb9OlSxdKhMhgZECRB+IFyq1bt6hDhw6s2GrVqlFeXp7jgWUYWBBbEilRBaMFCJQrFAv35CRYHzFDjikvvfQSVYboSGASBsTtCffq1YuV2qBBA7p8+bLt/r766itet3379lRQUECZmZn8vUmTJnTt2jVKtFWoMSXyQJygQImPP/44K3XgwIG2+8nPz+cAPmrUqHgsyc3N5W3vvfde+vHHH4Nej6vrkLMvsUQl+3IFxA7KiRMn6P7772elfvLJJ5bbL126lBo3bkzLly+vUK8It7V+/fog12J6zkL5MgCh/CgA8A3ECsrRo0epVq1arND58+ebbof6AumvmQUUFRXFgRQWFvq/EofzlcGIJemBmMmlS5fokUceYYVOnDixwv+rVq2iKVOmUGlpqen2CxcujKfKO3futDyOVUWuFpuyoqMWsEOxELOA+Pzzz8cDtZCysjL64YcfaNOmTab7EHfpE088wdvC7X344YeWCnfj59XzM4MTdQnssiAfffQRKw2pLLIoAURulzKD+emnn9J9993H2/bp06fCsdTg68bNyMdRXdNtBcTO/NF+dc8997Bi0Yh48uRJR6Vu3LiRnn32Wd6matWqtGPHDl/HtlpfjRlRjBehAUETCdJWKHf06NHcTmWnELiyjh07xt0R0mC/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`;
const b64deleteImg2 = `data:image/png;base64,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`;
(async () => {
  let intersectionObserver = null;
  let mutationObserver = null;
  let createdButtons = [];
  const excludeBotStr = risuAPI.getArg("HANDDM EDIT::excludeBotName") == 1;
  const EXCLUDE_BOT_NAMES = excludeBotStr ? excludeBotStr.split(",") : [];

  const { getChar, onUnload } = globalThis.__pluginApis__;
  // CSS 스타일 추가
  const style = document.createElement("style");
  style.textContent = `
    .x-risu-lb-nai-character-card, .x-risu-lb-nai-comp-card {
      overflow: visible !important;
    }
    .hddm-btn-appended:hover {
      outline: 1px solid rgba(100, 100, 100, 0.2);
      outline-offset: 2px;
    }
    .hddm-button-wrapper {
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
    .hddm-edit-button, .hddm-delete-button {
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
    .floating-img {
      position: absolute;
      width: 50px;
      height: 50px;
      opacity: 0;
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
      pointer-events: none;
      z-index: 10000;
    }
    .from-left {
      transform: translateX(-150%);
    }
    .from-right {
      transform: translateX(150%);
    }
    .appear {
      transform: translateX(0);
      opacity: 1;
    }
  `;
  document.head.appendChild(style);

  // 버튼 래퍼 생성
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "hddm-button-wrapper";

  // 편집 버튼 생성
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerHTML = "✏️";
  editButton.title = "수정";
  editButton.className = "chat-modi-btn hddm-edit-button";

  // 삭제 버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.innerHTML = "🗑️";
  deleteButton.title = "삭제";
  deleteButton.className = "chat-modi-btn hddm-delete-button";

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

  /**
   * TARGET_SELECTOR를 활용한 요소 검증 함수
   */
  function isTargetElement(element) {
    if (!element || !element.classList) return false;

    // TARGET_SELECTOR를 파싱하여 동적으로 패턴 생성
    const selectors = TARGET_SELECTOR.map((selector) => selector.trim());

    for (const selector of selectors) {
      if (matchesSelector(element, selector)) {
        return true;
      }
    }

    // 추가 검증: className에 "message"가 포함된 경우
    if (element.className && element.className.includes("message")) {
      return true;
    }

    return false;
  }

  /**
   * CSS Selector 매칭 함수
   */
  function matchesSelector(element, selector) {
    try {
      // 간단한 선택자 매칭 로직
      const parts = selector.split(" ");
      const lastPart = parts[parts.length - 1];

      // 태그명과 클래스명 추출
      const tagMatch = lastPart.match(/^(\w+)/);
      const classMatch = lastPart.match(/\.([\w-]+)/);

      if (!tagMatch) return false;

      const tagName = tagMatch[1];
      const className = classMatch ? classMatch[1] : null;

      // 태그명 검증
      if (element.tagName.toLowerCase() !== tagName) return false;

      // 클래스명 검증
      if (className && !element.classList.contains(className)) return false;

      // 부모 요소 검증 (span.text p, span.text li의 경우)
      if (parts.length > 1) {
        const parentSelector = parts.slice(0, -1).join(" ");
        const parentElement = element.parentElement;

        if (
          parentElement &&
          !matchesParentSelector(parentElement, parentSelector)
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
   * Parent Selector 매칭 함수
   */
  function matchesParentSelector(element, parentSelector) {
    try {
      // span.text 같은 부모 선택자 매칭
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
   * overflow 속성 복원
   */
  function restoreOverflow(changedElements) {
    changedElements.forEach(({ element, originalOverflow }) => {
      if (originalOverflow === "") {
        element.style.removeProperty("overflow");
      } else {
        element.style.overflow = originalOverflow;
      }
    });
  }

  /**
   * 단일 Element에 편집 버튼 추가
   */
  function addEditButtonToElement(element) {
    // 예외처리 봇일 경우 return
    if (EXCLUDE_BOT_NAMES.includes(getChar().name)) return;
    // 메시지가 없을 경우 return
    if (getChar().chats[getChar().chatPage].message.length === 0) return;

    // 텍스트 내용 확인 (button.x-risu-button-default 제외)
    const tempElement = element.cloneNode(true);
    const risuButtons = tempElement.querySelectorAll("button");
    risuButtons.forEach((btn) => btn.remove());
    const textContent = tempElement.textContent.trim();

    // 텍스트가 없으면 hddm-btn-appended만 추가하고 종료
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

    // 요소 자체를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // wrapper와 button 클론 생성
    const wrapperClone = buttonWrapper.cloneNode(true);
    const buttonClone = editButton.cloneNode(true);
    const deleteButtonClone = deleteButton.cloneNode(true);
    buttonClone.onclick = () => editSingleChat(buttonClone);
    deleteButtonClone.onclick = () => deleteSingleChat(deleteButtonClone);

    // button을 wrapper에 추가
    wrapperClone.appendChild(buttonClone);

    // WIP : DELETE BUTTON? 기능 추가에 대한 논의가 필요할 듯
    //wrapperClone.appendChild(deleteButtonClone);

    // 마우스 호버 이벤트 추가 (wrapper의 opacity 제어 + overflow 변경)
    element.addEventListener("mouseenter", () => {
      wrapperClone.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapperClone.style.opacity = "0";
    });

    // wrapper를 요소에 추가
    element.appendChild(wrapperClone);
    createdButtons.push(wrapperClone);

    // classList에 hddm-btn-appended 추가
    element.classList.add("hddm-btn-appended");
  }

  /**
   * HTML을 편집 가능한 특수 포맷으로 변환
   * <ruby>텍스트<rt>루비</rt></ruby> → :텍스트[루비]:
   * <br> → 줄바꿈
   */
  function convertHTMLToEditFormat(element) {
    const cloned = element.cloneNode(true);

    // 버튼들 제거
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
   * :텍스트[루비]: → <ruby>텍스트<rt>루비</rt></ruby>
   */
  function convertEditFormatToHTML(text) {
    // :텍스트[루비]: 패턴을 <ruby> 태그로 변환
    let result = text.replace(
      /:([^\[\]:]+)\[([^\]]+)\]:/g,
      "<ruby>$1<rt>$2</rt></ruby>"
    );

    // 줄바꿈을 <br>로 변환
    result = result.replace(/\n/g, "<br>\n");

    return result;
  }

  /**
   * 요소가 현재 화면에 보이는지 확인하는 함수
   */
  function isElementVisible(element) {
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
    const EXTEND_EOL = !!opts.extendToEOL; // ← 추가
    const EXTEND_MAX = opts.extendMax ?? 5000; // 안전 캡(선택)
    const SNAP_BOL = !!opts.snapStartToPrevEOL; // ← 추가: fuzzy+eol 시 start를 줄 시작으로 스냅
    const SNAP_BACK = opts.snapMaxBack ?? 4; // ← 추가: start 기준 뒤로 최대 탐색 길이
    const SNAP_TRIM = opts.snapTrimSpaces ?? true; // ← 추가: 줄 시작 공백/탭 스킵

    // --- 1) HTML → 평문 ---
    const plain = htmlToPlain(replacedHtml);
    if (!plain) return null;

    // --- 2) 정규화 + (md 전용) 인덱스 맵 생성 ---
    const { norm: mdN, map: mdMap } = normalizeWithMap(originalMd);
    const { norm: plN } = normalizeWithMap(plain); // 비교만 필요, 맵 불필요

    // --- 3) 1순위: 전체 일치 ---
    let idx = mdN.indexOf(plN);
    if (idx >= 0) {
      console.log;
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
        let nEnd = best.pos + plN.length; // exclusive

        if (EXTEND_EOL) {
          // 끝은 다음 줄바꿈 전까지(또는 문서 끝/extendMax까지)
          const nl = mdN.indexOf("\n", nEnd);
          const hardCapEnd = Math.min(mdN.length, nEnd + EXTEND_MAX);
          nEnd = nl === -1 ? hardCapEnd : Math.min(nl, hardCapEnd);

          if (SNAP_BOL) {
            // start를 이전 줄바꿈 다음으로 스냅(근처만 허용)
            const scanStart = Math.max(0, nStart - SNAP_BACK);
            const local = mdN.slice(scanStart, nStart);
            const nlLocalIdx = local.lastIndexOf("\n");
            if (nlLocalIdx !== -1) {
              let s = scanStart + nlLocalIdx + 1; // '\n' 바로 다음
              if (SNAP_TRIM) {
                while (s < nStart && (mdN[s] === " " || mdN[s] === "\t")) s++;
              }
              // 안전 가드: 스냅 후 start가 end보다 크지 않도록
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

    // --- 헬퍼 함수 영역 ---
    /**
     *
     * @param {*} nStart
     * @param {*} nEnd
     * @param {*} method
     * @returns
     */
    function mapBack(nStart, nEnd, method = "exact") {
      // 정규화 문자열 인덱스를 원본으로 역투영
      const start = mdMap[nStart];
      // 끝 인덱스: nEnd는 'exclusive'로 처리 → 마지막 문자 맵을 이용해 +1
      const end =
        nEnd - 1 < mdMap.length ? mdMap[nEnd - 1] + 1 : originalMd.length;
      return { start, end, method };
    }

    function htmlToPlain(htmlOrFragment) {
      // 문자열/DOM 모두 지원
      let html = "";
      if (typeof htmlOrFragment === "string") html = htmlOrFragment;
      else if (htmlOrFragment && htmlOrFragment.outerHTML)
        html = htmlOrFragment.outerHTML;
      else if (htmlOrFragment && htmlOrFragment.innerHTML)
        html = htmlOrFragment.innerHTML;
      else return "";

      const div = document.createElement("div");
      div.innerHTML = html;

      // ruby 보정: <ruby>베이스<rt>루비</rt></ruby> → "베이스(루비)"
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

      // 타이포그래픽 문자 매핑 테이블 (필요시 확장)
      const typomap = {
        "\u2018": "'", // ‘
        "\u2019": "'", // ’
        "\u201C": '"', // “
        "\u201D": '"', // ”
        "\u2013": "-", // –
        "\u2014": "-", // —
        "\u3000": " ", // 전각 공백
      };

      while (i < len) {
        const ch = s[i];

        // CRLF/CR → \n
        if (ch === "\r") {
          const next = s[i + 1];
          out.push("\n");
          map.push(i);
          i += next === "\n" ? 2 : 1;
          continue;
        }

        // 제로폭 제거
        if ((ch >= "\u200B" && ch <= "\u200D") || ch === "\uFEFF") {
          i++;
          continue;
        }

        // NBSP → space
        if (ch === "\u00A0") {
          out.push(" ");
          map.push(i);
          i++;
          continue;
        }

        // 타이포그래픽 치환(1:1)
        if (typomap[ch]) {
          out.push(typomap[ch]);
          map.push(i);
          i++;
          continue;
        }

        // 줄임표 … → ...
        if (ch === "\u2026") {
          out.push(".", ".", ".");
          map.push(i, i, i); // 세 글자 모두 같은 원본 위치를 가리키게
          i++;
          continue;
        }

        // 공백/탭 런 축약
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

        // 일반 문자
        out.push(ch);
        map.push(i);
        i++;
      }

      // 좌우 trim (필요하면)
      // 앞쪽 trim
      while (out.length && out[0] === " ") {
        out.shift();
        map.shift();
      }
      // 뒤쪽 trim
      while (out.length && out[out.length - 1] === " ") {
        out.pop();
        map.pop();
      }

      return { norm: out.join(""), map };
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
        if (rowMin > cutoff) return cutoff + 1; // 가지치기
      }
      return dp[m];
    }
  }
  /**
   * 삭제 애니메이션 실행 함수
   */
  async function performDeleteAnimation(element) {
    const rect = element.getBoundingClientRect();
    const container = document.body;
    
    // 중앙 기준 X, Y 좌표
    const centerX = rect.left + window.scrollX + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2 - 25;
    
    // 좌측 이미지 생성
    const imgLeft = document.createElement('img');
    imgLeft.src = b64deleteImg1;
    imgLeft.width = 100;
    imgLeft.height = 100;
    imgLeft.className = 'floating-img from-left';
    imgLeft.style.top = `${centerY}px`;
    imgLeft.style.left = `${centerX - 25}px`;
    container.appendChild(imgLeft);
    
    // 우측 이미지 생성
    const imgRight = document.createElement('img');
    imgRight.src = b64deleteImg2;
    imgRight.width = 100;
    imgRight.height = 100;
    imgRight.className = 'floating-img from-right';
    imgRight.style.top = `${centerY}px`;
    imgRight.style.left = `${centerX + 25}px`;
    container.appendChild(imgRight);
    
    // 순차 등장
    requestAnimationFrame(() => {
      imgLeft.classList.add('appear');
    });
    await new Promise(r => setTimeout(r, 400));
    requestAnimationFrame(() => {
      imgRight.classList.add('appear');
    });
    
    // 잠시 후 대상 제거
    await new Promise(r => setTimeout(r, 800));
    element.remove();
    
    // 이미지들도 제거
    await new Promise(r => setTimeout(r, 400));
    imgLeft.remove();
    imgRight.remove();
  }

  /**
   * 삭제 버튼 클릭 핸들러
   */
  async function deleteSingleChat(element) {
    const targetElement = element.closest(
      "h1, h2, h3, p, li, div.x-risu-regex-quote-block, div.x-risu-regex-thought-block, div.x-risu-regex-sound-block, div.x-risu-message, div.x-risu-lb-nai-character-tags, div.x-risu-lb-nai-comp-tags, ol, ul"
    );
    
    if (!targetElement) return;
    
    // 삭제 확인
    if (!confirm("정말 삭제하시겠습니까?")) return;
    
    // 애니메이션 실행
    await performDeleteAnimation(targetElement);
  }
  /**
   * 편집모드 전환
   */
  function editSingleChat(element) {
    // editButton 클릭 시 해당 요소를 감싸고 있는 li 혹은 p태그를 textarea로 변경 후, 편집 모드로 전환
    // textarea에는 현재 대화의 id가 포함되어야 함
    // 가장 가까운 .chat-message-container 를 찾아서, 그 안의 div에서 data-chat-index, data-chat-id를 찾아서 textarea에 data attribute로 추가  }
    // textarea 하단에는 save 버튼과 cancel 버튼 추가
    // save 버튼 클릭 시 saveSingleChat 함수 호출
    // cancel 버튼 클릭 시 textarea 제거 및 p태그 혹은 li태그로 원상복구

    // 편집 버튼의 부모 요소 (p 또는 li) 찾기
    const targetElement = element.closest(
      "h1, h2, h3,p, li, div.x-risu-regex-quote-block, div.x-risu-regex-thought-block, div.x-risu-regex-sound-block, div.x-risu-message, div.x-risu-lb-nai-character-tags, div.x-risu-lb-nai-comp-tags, ol, ul"
    );
    if (!targetElement) return;

    // 이미 편집 모드인지 확인
    if (targetElement.classList.contains("hddm-editing")) return;

    element.remove();

    // 현재 텍스트 내용 저장 (버튼 제외)
    const tempElement = targetElement.cloneNode(true);
    // 편집 버튼들과 기타 버튼들 제거
    const buttons = tempElement.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    // HTML을 편집 가능한 포맷으로 변환 (:텍스트[루비]: 형식)
    const originalText = convertHTMLToEditFormat(targetElement);

    // 원본 HTML 구조 보존 (버튼 제외)
    const originalHTML = tempElement.innerHTML;

    // 가장 가까운 .chat-message-container 찾기
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

    // 편집 모드 표시
    targetElement.classList.add("hddm-editing");

    // 기존 요소의 실제 화면 크기 가져오기
    const rect = targetElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(targetElement);
    const actualWidth = rect.width + 10;
    const actualHeight = Math.max(rect.height + 10, 60); // 최소 60px 보장

    // textarea 생성
    const textarea = document.createElement("textarea");

    let currentChatMessage =
      getChar().chats[getChar().chatPage].message[chatIndex].data;
    let hit = findOriginalRangeFromHtml(currentChatMessage, originalText, {
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
      height: ${actualHeight}px;y
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

    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "chat-edit-buttons";
    buttonContainer.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: 8px;
    `;

    // Save 버튼
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
      saveSingleChat(textarea, targetElement, taValue, originalHTML, hit);

    // Cancel 버튼
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
      cancelEdit(targetElement, originalText, originalHTML);

    // 버튼들을 컨테이너에 추가
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    // 원본 요소의 내용을 textarea와 버튼으로 교체
    targetElement.innerHTML = "";
    targetElement.appendChild(textarea);
    targetElement.appendChild(buttonContainer);

    // textarea에 포커스
    textarea.focus();
    textarea.select();
  }

  // 이전 EOL 다음으로 start를 스냅(최대 maxBack 문자까지만 뒤를 살핌)
  function snapStartAfterPrevEOL(str, start, maxBack = 32, trimSpaces = true) {
    if (start <= 0) return 0;
    const scanStart = Math.max(0, start - maxBack);
    const local = str.slice(scanStart, start);
    const nlLocalIdx = local.lastIndexOf("\n");
    if (nlLocalIdx === -1) return start; // 근처에 EOL 없음 → 그대로

    let newStart = scanStart + nlLocalIdx + 1; // '\n' 바로 다음
    if (trimSpaces) {
      // 줄 시작의 앞공백 스킵(선택)
      while (
        newStart < start &&
        (str[newStart] === " " || str[newStart] === "\t")
      ) {
        newStart++;
      }
    }
    return newStart;
  }
  /**
   * 편집모드 저장
   * @param {*} textarea
   * @param {*} targetElement
   * @param {*} originalText - 편집 포맷 텍스트 (:텍스트[루비]:)
   * @param {*} originalHTML - 원본 HTML 구조
   * @returns
   */
  function saveSingleChat(
    textarea,
    targetElement,
    originalText,
    originalHTML,
    hit
  ) {
    const newText = textarea.value;

    if (newText === originalText) {
      // 변경사항이 없으면 편집 모드만 종료
      cancelEdit(targetElement, originalText, originalHTML);
      return;
    }

    // 변경사항이 있으면 저장 처리
    let chatId = textarea.getAttribute("data-chat-id");
    let chatIndex = textarea.getAttribute("data-chat-index");

    // 편집 포맷을 HTML로 변환
    const newHTML = convertEditFormatToHTML(newText);

    // 전체 메시지 데이터에서 원본 HTML을 새 HTML로 교체
    let oldFullText =
      getChar().chats[getChar().chatPage].message[chatIndex].data;

    if (hit) {
      // 오프셋 기반 치환
      let { start, end } = hit;
      const updated =
        oldFullText.slice(0, start) + newText + oldFullText.slice(end);
      getChar().chats[getChar().chatPage].message[chatIndex].data = updated;
    } else {
      let replacedText = oldFullText.replaceAll(originalText, newText);
      getChar().chats[getChar().chatPage].message[chatIndex].data =
        replacedText;
    }

    // 편집 모드 종료 및 새 HTML로 업데이트
    targetElement.classList.remove("hddm-editing");
    targetElement.innerHTML = newHTML;

    // 편집 버튼 다시 추가
    appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 모드 취소 함수
   */
  function cancelEdit(targetElement, originalText, originalHTML) {
    // 편집 모드 종료
    targetElement.classList.remove("hddm-editing");

    // 원본 HTML 구조로 복원
    targetElement.innerHTML = originalHTML;

    // 편집 버튼 다시 추가
    appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 버튼을 요소에 다시 추가하는 헬퍼 함수
   */
  function appendEditButtonToElement(element) {
    // 요소 자체를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // wrapper와 button 클론 생성
    const wrapperClone = buttonWrapper.cloneNode(true);
    const buttonClone = editButton.cloneNode(true);
    buttonClone.onclick = () => editSingleChat(buttonClone);

    // button을 wrapper에 추가
    wrapperClone.appendChild(buttonClone);

    // 마우스 호버 이벤트 추가 (wrapper의 opacity 제어 + overflow 변경)
    element.addEventListener("mouseenter", () => {
      wrapperClone.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapperClone.style.opacity = "0";
    });

    // wrapper를 요소에 추가
    element.appendChild(wrapperClone);
    createdButtons.push(wrapperClone);
  }

  // SPA 화면 전환 감지를 위한 변수
  let currentUrl = location.href;
  let reinitTimeout = null;

  // 옵저버 재설정
  function reinitializeObservers() {
    // 기존 타임아웃 취소
    if (reinitTimeout) clearTimeout(reinitTimeout);

    // Observer 재설정
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
    }

    // 짧은 지연 후 재초기화 (DOM 렌더링 대기)
    reinitTimeout = setTimeout(() => {
      startObserver();
    }, 300);
  }

  /**
   * 옵저버 시작
   */
  function startObserver() {
    if (intersectionObserver) intersectionObserver.disconnect();
    if (mutationObserver) mutationObserver.disconnect();

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 보일 때 편집 버튼 추가
            setTimeout(() => {
              const element = entry.target;
              if (
                isElementVisible(element) &&
                !element.classList.contains("hddm-btn-appended")
              ) {
                addEditButtonToElement(element);
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

    // 기존 요소들에 대해 IntersectionObserver 적용
    const existingContainers = document.querySelectorAll(TARGET_SELECTOR);
    existingContainers.forEach((container) => {
      intersectionObserver.observe(container);
    });

    // 새로운 요소 감지를 위한 MutationObserver (IntersectionObserver와 함께 사용)
    mutationObserver = new MutationObserver((mutations) => {
      let shouldReinitialize = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // 대규모 DOM 변경 감지 (SPA 화면 전환)
          if (
            mutation.addedNodes.length > 5 ||
            mutation.removedNodes.length > 5
          ) {
            shouldReinitialize = true;
          }

          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              try {
                // TARGET_SELECTOR를 활용한 동적 검증
                if (node?.classList && isTargetElement(node)) {
                  intersectionObserver.observe(node);
                }
              } catch (error) {}
              try {
                // 하위 요소들도 확인
                const childContainers = node.querySelectorAll(TARGET_SELECTOR);
                childContainers.forEach((container) => {
                  intersectionObserver.observe(container);
                });
              } catch (error) {}
            }
          });
        }
      });

      // 대규모 변경 감지 시 재초기화
      if (shouldReinitialize) {
        reinitializeObservers();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  // History API 감지 (SPA 라우팅)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    reinitializeObservers();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    reinitializeObservers();
  };

  // popstate 이벤트 감지 (뒤로가기/앞으로가기)
  window.addEventListener("popstate", () => {
    reinitializeObservers();
  });

  // URL 변경 감지 (폴링 방식 백업)
  setInterval(() => {
    if (currentUrl !== location.href) {
      currentUrl = location.href;
      reinitializeObservers();
    }
  }, 1000);

  onUnload(() => {
    // Observer 정리
    if (intersectionObserver) intersectionObserver.disconnect();
    if (mutationObserver) mutationObserver.disconnect();

    // 타임아웃 정리
    if (reinitTimeout) clearTimeout(reinitTimeout);

    // History API 복원
    history.pushState = originalPushState;
    history.replaceState = originalReplaceState;

    // 버튼 래퍼 제거
    document
      .querySelectorAll(".hddm-button-wrapper")
      .forEach((wrapper) => wrapper.remove());
    createdButtons.forEach((wrapper) => wrapper?.remove());

    // CSS 스타일 제거
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }

    console.log("Chat Modi 플러그인이 언로드되었습니다.");
  });
  startObserver();
})();
