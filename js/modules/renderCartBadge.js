// localStorage.js로부터 함수를 import해서 로컬스토리지를 읽고

// 전체 상품 수량을 계산해 갱신
// 헤더, 바텀내비, 햄버거, 장바구니 페이지 등에 사용

// localStorage.js로부터 장바구니에 담긴 상품의 총 수량을 계산하는 함수를 import
import { getCartTotalQuantity } from "../utils/localStorage.js";

// 장바구니 관련 숫자를 렌더링하는 함수
export function renderCartBadge() {
  const totalQuantity = getCartTotalQuantity();

  const cartCountElements = document.querySelectorAll('[data-render="cart-count"]');

  cartCountElements.forEach(element => {
    element.textContent = totalQuantity;
  });
}