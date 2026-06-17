// 상품 목록 페이지네이션
// 전체 페이지 수와 현재 페이지 번호를 기준으로 페이지 버튼 생성
// 페이지가 많을 경우, 첫 페이지와 마지막 페이지는 유지하고, 중간 생략 구간은 ...으로 표시

// 사용자가 페이지 번호 버튼을 클릭하면 클릭된 페이지 번호를 가져옴
// 사용자가 이전/다음 버튼을 클릭하면 현재 페이지 기준으로 이전/다음 페이지를 가져옴

// 가져온 페이지 번호를 productList.js의 페이지 변경 함수에 전달
// 실제 상품 배열 자르기와 상품 카드 렌더링은 productList.js에서 처리

// 현재 페이지에 보여줄 상품 배열 가져오기
// 매개변수:
// - products: 페이지네이션을 적용할 상품 배열
// - currentPage: 현재 페이지 번호
// - countPerPage: 한 페이지에 보여줄 상품 개수
// 반환값:
// - 현재 페이지에 해당하는 상품만 잘라낸 새 배열
// 동작:
// - currentPage와 countPerPage를 기준으로 시작/끝 인덱스를 계산함
// - products 배열에서 해당 범위만 slice로 잘라 반환함
export function getPagedProducts(products, currentPage, countPerPage) {
  const startIndex = (currentPage - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;

  return products.slice(startIndex, endIndex);
}

// 페이지네이션 버튼 렌더링
// 매개변수:
// - totalCount: 전체 상품 개수
// - currentPage: 현재 페이지 번호
// - countPerPage: 한 페이지에 보여줄 상품 개수
// - container: 페이지네이션 버튼 HTML을 넣을 DOM 요소
// 반환값:
// - 없음
// 동작:
// - 전체 상품 개수와 한 페이지당 상품 개수로 전체 페이지 수를 계산함
// - 페이지가 1개 이하이면 페이지네이션 영역을 비움
// - 이전 버튼, 페이지 번호 버튼, 다음 버튼을 생성해 container에 출력함
// - 현재 페이지에는 aria-current="page"를 적용함
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
