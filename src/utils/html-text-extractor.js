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
export function normalizeSelectedText(selectedText, range) {
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
export function extractMarkdownFromElement(element) {
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

