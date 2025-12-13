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
export function findOriginalRangeFromHtml(originalMd, replacedHtml, opts = {}) {
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
export function findAllMatches(originalMd, searchText, opts = {}) {
  const matches = [];
  const contextLength = opts.contextLength ?? 30;
  const FUZZY_MAX = opts.fuzzyMaxLen ?? 200;
  const CUTOFF = opts.fuzzyCutoff ?? 20;
  const FUZZY_THRESHOLD = opts.fuzzyThreshold ?? 0.15;
  const ANCH = opts.anchorLength ?? 5;

  // normalizeWithMap으로 정규화 (스마트 따옴표, 말줄임표 등 타이포 처리)
  const { norm: normalizedOriginal, map: indexMap } = normalizeWithMap(originalMd);
  const { norm: normalizedSearch } = normalizeWithMap(searchText);

  // 이미 찾은 위치 추적 (중복 방지)
  const foundPositions = new Set();

  // 컨텍스트 및 매칭 생성 헬퍼
  const addMatch = (normalizedStart, normalizedEnd, method, distance = null) => {
    // normalizeWithMap의 map을 사용하여 원본 인덱스 복원
    const start = indexMap[normalizedStart] ?? normalizedStart;
    const end = normalizedEnd - 1 < indexMap.length
      ? indexMap[normalizedEnd - 1] + 1
      : originalMd.length;

    const positionKey = `${start}-${end}`;
    if (foundPositions.has(positionKey)) {
      return false;
    }

    foundPositions.add(positionKey);
    const context = extractContext(originalMd, start, end, contextLength);

    const match = {
      start,
      end,
      context: context.text, 
      contextStart: context.start,
      method,
    };

    if (distance !== null) {
      match.distance = distance;
    }

    matches.push(match);
    return true;
  };

  // 1순위: 정확한 매칭
  findExactMatches(normalizedOriginal, normalizedSearch, addMatch);

  // 2순위: Head/Tail 앵커 매칭 (매칭이 없을 때만)
  if (matches.length === 0 && normalizedSearch.length >= ANCH * 2) {
    findAnchorMatches(normalizedOriginal, normalizedSearch, ANCH, addMatch);
  }

  // 3순위: Fuzzy 매칭 (정확한 매칭이 없거나 적을 때)
  if (matches.length === 0 || (normalizedSearch.length <= FUZZY_MAX && matches.length < 3)) {
    findFuzzyMatches(
      normalizedOriginal,
      normalizedSearch,
      FUZZY_MAX,
      CUTOFF,
      FUZZY_THRESHOLD,  
      addMatch
    );
  }

  // start 위치로 정렬
  // matches.sort((a, b) => a.start - b.start);

  return matches;
}

// ==================== Private Helper Functions ====================

/**
 * HTML을 평문으로 변환
 */
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

/**
 * 텍스트 정규화 (공백, 타이포 처리) + 인덱스 맵 생성
 */
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

/**
 * Levenshtein Distance 계산 (편집 거리)
 */
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
 * 컨텍스트 추출
 */
function extractContext(originalText, start, end, contextLength) {
  const contextStart = Math.max(0, start - contextLength);
  const contextEnd = Math.min(originalText.length, end + contextLength);
  const context = originalText.slice(contextStart, contextEnd);
  const trimmedContext = context.trim();

  // trim으로 인한 앞쪽 공백 길이 계산
  const leadingWhitespace = context.length - context.trimStart().length;
  const adjustedContextStart = contextStart + leadingWhitespace;

  return {
    text: trimmedContext,
    start: adjustedContextStart
  };
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

/**
 * 정확한 매칭 찾기
 */
function findExactMatches(normalizedOriginal, normalizedSearch, addMatch) {
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();

  let searchIndex = 0;
  while (true) {
    const index = lowerNormalized.indexOf(lowerSearch, searchIndex);
    if (index === -1) break;

    const normalizedStart = index;
    const normalizedEnd = index + normalizedSearch.length;

    addMatch(normalizedStart, normalizedEnd, 'exact');
    searchIndex = normalizedEnd;
  }
}

/**
 * Fuzzy 매칭으로 매칭 위치 찾기
 */
function findFuzzyMatches(
  normalizedOriginal,
  normalizedSearch,
  FUZZY_MAX,
  CUTOFF,
  FUZZY_THRESHOLD,
  addMatch
) {
  const MAX_FUZZY_MATCHES = 3; // Fuzzy 매칭 결과 최대 개수
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();

  if (lowerSearch.length > FUZZY_MAX) {
    return;
  }

  const step = Math.max(1, Math.floor(lowerSearch.length / 4));
  const maxDistance = Math.max(5, Math.floor(lowerSearch.length * FUZZY_THRESHOLD));

  let matchCount = 0;
  for (let i = 0; i + lowerSearch.length <= lowerNormalized.length; i += step) {
    if (matchCount >= MAX_FUZZY_MATCHES) {
      break;
    }

    const seg = lowerNormalized.slice(i, i + lowerSearch.length);
    const d = fastEditDistance(lowerSearch, seg, CUTOFF);

    if (d <= maxDistance) {
      const normalizedStart = i;
      const normalizedEnd = i + lowerSearch.length;

      if (addMatch(normalizedStart, normalizedEnd, 'fuzzy', d)) {
        matchCount++;
      }
    }
  }
}

/**
 * Head/Tail 앵커로 매칭 위치 찾기
 */
function findAnchorMatches(
  normalizedOriginal,
  normalizedSearch,
  ANCH,
  addMatch
) {
  const lowerNormalized = normalizedOriginal.toLowerCase();
  const lowerSearch = normalizedSearch.toLowerCase();

  const N = Math.max(8, Math.min(ANCH, Math.floor(lowerSearch.length / 3)));
  if (lowerSearch.length < N * 2) {
    return;
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

      addMatch(normalizedStart, normalizedEnd, 'anchor');
      searchIndex = tailPos + N;
    } else {
      searchIndex = headPos + 1;
    }
  }
}
