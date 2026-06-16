// 장바구니 페이지 전용 액션

// 외부 함수들 import
import {
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  updateCartItemSelected,
  updateAllCartItemsSelected,
  removeSelectedCartItems,
} from "../utils/localStorage.js";

import { renderCartBadge } from "./renderCartBadge.js";
import { showToast } from "./toast.js";

// products.json으로부터 데이터를 받아 최초 장바구니를 렌더링.
export function initCartPage(products) {
  renderCartPage(products);
  bindCartEvents(products);
}

// 장바구니 전체 렌더링
function renderCartPage(products) {
  const cartItems = getCartItems();
  const cartProducts = getCartProducts(products, cartItems);

  updateCartState(cartProducts);
  renderCartItems(cartProducts);
  renderCartSummary(cartProducts);
  renderCartCounts(cartProducts);
  renderCartBadge();
}

// 장바구니 상품 데이터 매칭
function getCartProducts(products, cartItems) {
  return cartItems
    .map(cartItem => {
      const product = products.find(product => String(product.id) === cartItem.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        selected: cartItem.selected,
      };
    })
    .filter(Boolean);
}

// 상품 목록 렌더링
function renderCartItems(cartProducts) {
  const cartItemsContainer = document.querySelector('[data-render="cart-items"]');

  if (!cartItemsContainer) {
    return;
  }

  cartItemsContainer.innerHTML = cartProducts
    .map(cartProduct => createCartItemTemplate(cartProduct))
    .join("");
}

// 상품 카드 HTML 생성
function createCartItemTemplate(cartProduct) {
  const {
    productId,
    brand,
    title,
    price,
    thumbnail,
    colors,
    quantity,
    selected,
  } = cartProduct;

  const detailUrl = `product-detail.html?id=${productId}`;
  const colorText = Array.isArray(colors) && colors.length > 0
    ? colors.join(", ")
    : "기본";
  const formattedPrice = formatPrice(price * quantity);

  return `
    <article class="cart-item" data-product-id="${productId}">
      <label class="cart-item__check">
        <input
          type="checkbox"
          data-action="cart-select-item"
          ${selected ? "checked" : ""}
        />
        <span class="sr-only">${brand} ${title} 선택</span>
      </label>
      <a
        class="cart-item__media"
        href="${detailUrl}"
        aria-label="${brand} ${title} 상품 상세 보기"
      >
        <img src="${thumbnail}" alt="${brand} ${title}" />
      </a>
      <div class="cart-item__content">
        <p class="cart-item__brand">${brand}</p>
        <h3 class="cart-item__name">
          <a href="${detailUrl}">${title}</a>
        </h3>
        <p class="cart-item__option">색상: ${colorText} / 수량: ${quantity}개</p>
        <p class="cart-item__price">${formattedPrice}</p>
        <div class="cart-item__bottom">
          <div class="cart-item__actions" aria-label="상품 수량">
            <button type="button" data-action="cart-decrease" data-product-id="${productId}" aria-label="수량 감소">−</button>
            <span>${quantity}</span>
            <button type="button" data-action="cart-increase" data-product-id="${productId}" aria-label="수량 증가">+</button>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="cart-item__remove"
        data-action="cart-remove"
        data-product-id="${productId}"
        aria-label="${title} 삭제"
      >
        <span>삭제</span>
      </button>
    </article>
  `
}

// 요약 금액 렌더링
function renderCartSummary(cartProducts) {}

// 카운트 렌더링
function renderCartCounts(cartProducts) {}

// 이벤트 연결
function bindCartEvents(products) {}

// 상품 액션 처리
function handleCartItemClick(event, products) {}

// 선택 상태 처리
function handleCartItemChange(event, products) {}

// 선택 삭제 처리
function handleRemoveSelected(products) {}

// 상태 전환
function updateCartState(cartProducts) {}

// 가격 포맷
function formatPrice(price) {
  return `${price.toLocaleString("ko-KR")}원`;
}