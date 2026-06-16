// renderProducts : 배정호 작업

import { renderProductCard } from "/js/modules/renderProductCard.js";

// renderProductCard.js를 import해 상품 카드 HTML 생성
// 렌더링할 filteredProducts 배열(전체 번호 중 페이지네이션으로 걸러진 n개 배열)과 container(HTML이 들어갈 태그)를 매개변수로 받음
// 전달받은 filteredProducts 배열만 순회해 상품 카드 목록 생성
// 기존 container 내용을 비우고 생성한 상품 카드를 HTML로 출력
// 페이지네이션 계산은 productList.js에서 처리

export function renderProducts(filteredProducts, container) {
  const html = filteredProducts.map((p) => renderProductCard(p));

  container.innerHTML = html.join("");
}
