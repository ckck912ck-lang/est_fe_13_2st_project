// 장바구니 기능

// 데이터 렌더링, 상품수량 조절, 상품 삭제

// 상품선택/전체선택/선택삭제/비우기

// 전체 개수 표시, 전체 금액 계산

// 추천 상품 슬라이드
import { fetchData } from "../utils/fetchData.js";
import { initCartPage } from "../modules/cartActions.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";

async function initCart() {
  try {
    const data = await fetchData("./data/products.json");
    const products = Array.isArray(data.products) ? data.products : [];

    initCartPage(products);
    renderCartBadge();
  } catch (error) {
    console.error("장바구니 페이지를 초기화하지 못했습니다.", error);
    showToast("장바구니 정보를 불러오지 못했습니다.");
  }
}

initCart();