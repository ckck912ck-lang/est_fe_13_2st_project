// 상품 목록 페이지네이션
// 전체 페이지 수와 현재 페이지 번호를 기준으로 페이지 버튼 생성
// 페이지가 많을 경우, 첫 페이지와 마지막 페이지는 유지하고, 중간 생략 구간은 ...으로 표시

// 사용자가 페이지 번호 버튼을 클릭하면 클릭된 페이지 번호를 가져옴
// 사용자가 이전/다음 버튼을 클릭하면 현재 페이지 기준으로 이전/다음 페이지를 가져옴

// 가져온 페이지 번호를 productList.js의 페이지 변경 함수에 전달
// 실제 상품 배열 자르기와 상품 카드 렌더링은 productList.js에서 처리
export function getPagedProducts(products, currentPage, countPerPage) {
  const startIndex = (currentPage - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;

  return products.slice(startIndex, endIndex);
}

export function renderPagination(totalCount, currentPage, countPerPage, container) {
  if (!container) return;

  const totalPage = Math.ceil(totalCount / countPerPage);

  if (totalPage <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = "";

  html += `
    <a href="#" aria-label="이전 페이지" data-page="prev">‹</a>
  `;

  for (let page = 1; page <= totalPage; page++) {
    html += `
      <a
        href="#"
        data-page="${page}"
        ${page === currentPage ? 'aria-current="page"' : ""}
      >
        ${page}
      </a>
    `;
  }

  html += `
    <a href="#" aria-label="다음 페이지" data-page="next">›</a>
  `;

  container.innerHTML = html;
}
