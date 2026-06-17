// 상품 목록 페이지네이션
// 전체 페이지 수와 현재 페이지 번호를 기준으로 페이지 버튼 생성
// 페이지가 많을 경우, 첫 페이지와 마지막 페이지는 유지하고, 중간 생략 구간은 ...으로 표시

// 이 파일은 페이지네이션 관련 기능을 담당함
// - 전체 페이지 수 계산
// - 현재 페이지에 보여줄 상품 배열 자르기
// - 화면에 표시할 페이지 번호 목록 계산
// - 페이지네이션 버튼 렌더링
// - 클릭한 페이지 값 기준으로 이동할 페이지 번호 계산

// 클릭 이벤트 연결과 현재 페이지 상태 관리는 productList.js에서 담당함
// productList.js는 이 파일의 함수들을 호출해 상품 목록 페이지 흐름을 조립함

// 전체 페이지 수 계산
// 매개변수:
// - totalCount: 전체 상품 개수
// - countPerPage: 한 페이지에 보여줄 상품 개수
// 반환값:
// - 전체 페이지 수
// 동작:
// - 전체 상품 개수를 한 페이지당 상품 개수로 나누어 필요한 페이지 수를 계산함
export function getTotalPage(totalCount, countPerPage) {
  return Math.ceil(totalCount / countPerPage);
}

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

// 화면에 보여줄 페이지 번호 목록 계산
// 매개변수:
// - totalPage: 전체 페이지 수
// - currentPage: 현재 페이지 번호
// 반환값:
// - 페이지 번호와 생략 표시가 들어 있는 배열
//   예: [1, 2, 3, "...", 9]
// 동작:
// - 전체 페이지가 7개 이하이면 모든 페이지 번호를 반환함
// - 페이지가 많으면 첫 페이지와 마지막 페이지는 항상 유지함
// - 현재 페이지 주변 번호만 보여주고 중간은 "..."으로 표시함
function getPaginationItems(totalPage, currentPage) {
  if (totalPage <= 7) {
    return Array.from({ length: totalPage }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPage];
  }

  if (currentPage >= totalPage - 3) {
    return [1, "...", totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage];
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
// - 전체 페이지 수를 계산함
// - 페이지가 1개 이하이면 페이지네이션 영역을 비움
// - 페이지가 많을 경우 중간 생략 구간을 "..."으로 표시함
// - 이전 버튼, 페이지 번호 버튼, 다음 버튼을 생성해 container에 출력함
// - 현재 페이지에는 aria-current="page"를 적용함
export function renderPagination(totalCount, currentPage, countPerPage, container) {
  if (!container) return;

  const totalPage = getTotalPage(totalCount, countPerPage);

  if (totalPage <= 1) {
    container.innerHTML = "";
    return;
  }

  const paginationItems = getPaginationItems(totalPage, currentPage);

  let html = "";

  html += `
    <a href="#" aria-label="이전 페이지" data-page="prev">‹</a>
  `;

  paginationItems.forEach((item) => {
    if (item === "...") {
      html += `
        <span class="pagination-ellipsis" aria-hidden="true">...</span>
      `;
      return;
    }

    html += `
      <a
        href="#"
        data-page="${item}"
        ${item === currentPage ? 'aria-current="page"' : ""}
      >
        ${item}
      </a>
    `;
  });

  html += `
    <a href="#" aria-label="다음 페이지" data-page="next">›</a>
  `;

  container.innerHTML = html;
}

// 다음 페이지 번호 계산
// 매개변수:
// - pageValue: 클릭한 페이지 값
//   - "prev": 이전 페이지
//   - "next": 다음 페이지
//   - 숫자 문자열: 이동할 페이지 번호
// - currentPage: 현재 페이지 번호
// - totalPage: 전체 페이지 수
// 반환값:
// - 이동할 페이지 번호
// 동작:
// - pageValue 값에 따라 이동할 페이지 번호를 계산함
// - 계산된 페이지 번호가 1보다 작으면 1을 반환함
// - 계산된 페이지 번호가 totalPage보다 크면 totalPage를 반환함
export function getNextPage(pageValue, currentPage, totalPage) {
  let nextPage = currentPage;

  if (pageValue === "prev") {
    nextPage -= 1;
  } else if (pageValue === "next") {
    nextPage += 1;
  } else {
    nextPage = Number(pageValue);
  }
  if (Number.isNaN(nextPage)) {
    return currentPage;
  }

  if (nextPage < 1) {
    return 1;
  }

  if (nextPage > totalPage) {
    return totalPage;
  }

  return nextPage;
}
