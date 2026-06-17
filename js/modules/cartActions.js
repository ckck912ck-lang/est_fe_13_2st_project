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
        selectedColor: cartItem.selectedColor,
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
    quantity,
    selected,
    selectedColor,
  } = cartProduct;

  const detailUrl = `product-detail.html?id=${productId}`;
  const colorText = selectedColor || "기본";
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
        <p class="cart-item__option">${colorText}</p>
        
        <div class="cart-item__bottom">
          <div class="cart-item__actions" aria-label="상품 수량">
            <button type="button" data-action="cart-decrease" aria-label="수량 감소">−</button>
            <span>${quantity}</span>
            <button type="button" data-action="cart-increase" aria-label="수량 증가">+</button>
          </div>
          <p class="cart-item__price">${formattedPrice}</p>
        </div>
      </div>
      <button
        type="button"
        class="cart-item__remove"
        data-action="cart-remove"
        aria-label="${title} 삭제"
      >
        <span>삭제</span>
      </button>
    </article>
  `
}

// 요약 금액 렌더링
function renderCartSummary(cartProducts) {
  const subtotalElement = document.querySelector('[data-render="cart-subtotal"]');
  const shippingElement = document.querySelector('[data-render="cart-shipping"]');
  const totalElement = document.querySelector('[data-render="cart-total"]');

  const subtotal = cartProducts.reduce((total, product) => {
    if (!product.selected) {
      return total;
    }

    return total + product.price * product.quantity;
  }, 0);

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  if (subtotalElement) {
    subtotalElement.textContent = formatPrice(subtotal);
  }

  if (shippingElement) {
    shippingElement.textContent = shippingFee === 0 ? "무료" : formatPrice(shippingFee);
  }

  if (totalElement) {
    totalElement.textContent = formatPrice(total);
  }
}

// 카운트 렌더링
function renderCartCounts(cartProducts) {
  const totalCountElement = document.querySelector('[data-render="cart-total-count"]');
  const selectedCountElement = document.querySelector('[data-render="cart-selected-count"]');
  const selectAllElement = document.querySelector('[data-action="cart-select-all"]');

  const totalCount = cartProducts.length;
  const selectedCount = cartProducts.filter(product => product.selected).length;

  if (totalCountElement) {
    totalCountElement.textContent = `총 ${totalCount}개의 상품`;
  }

  if (selectedCountElement) {
    selectedCountElement.textContent = `(${selectedCount}/${totalCount})`;
  }

  if (selectAllElement) {
    selectAllElement.checked = totalCount > 0 && selectedCount === totalCount;
  }
}

// 이벤트 연결
function bindCartEvents(products) {
  const cartItemsContainer = document.querySelector('[data-render="cart-items"]');
  const selectAllElement = document.querySelector('[data-action="cart-select-all"]');
  const removeSelectedButton = document.querySelector('[data-action="cart-remove-selected"]');

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", event => {
      handleCartItemClick(event, products);
    });

    cartItemsContainer.addEventListener("change", event => {
      handleCartItemChange(event, products);
    });
  }

  if (selectAllElement) {
    selectAllElement.addEventListener("change", event => {
      updateAllCartItemsSelected(event.target.checked);
      renderCartPage(products);
    });
  }

  if (removeSelectedButton) {
    removeSelectedButton.addEventListener("click", () => {
      handleRemoveSelected(products);
    });
  }
}

// 상품 액션 처리
function handleCartItemClick(event, products) {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  const cartItemElement = actionElement.closest("[data-product-id]");

  if (!cartItemElement) {
    return;
  }

  const productId = cartItemElement.dataset.productId;
  const cartItems = getCartItems();
  const cartItem = cartItems.find(item => item.productId === productId);

  if (!cartItem) {
    return;
  }

  const action = actionElement.dataset.action;

  if (action === "cart-increase") {
    updateCartItemQuantity(productId, cartItem.quantity + 1);
    renderCartPage(products);
    return;
  }

  if (action === "cart-decrease") {
    const nextQuantity = Math.max(1, cartItem.quantity - 1);
    updateCartItemQuantity(productId, nextQuantity);
    renderCartPage(products);
    return;
  }

  if (action === "cart-remove") {
    removeCartItem(productId);
    showToast("상품이 장바구니에서 삭제되었습니다.");
    renderCartPage(products);
  }
}

// 선택 상태 처리
function handleCartItemChange(event, products) {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) {
    return;
  }

  if (actionElement.dataset.action !== "cart-select-item") {
    return;
  }

  const cartItemElement = actionElement.closest("[data-product-id]");

  if (!cartItemElement) {
    return;
  }

  const productId = cartItemElement.dataset.productId;

  updateCartItemSelected(productId, actionElement.checked);
  renderCartPage(products);
}

// 선택 삭제 처리
function handleRemoveSelected(products) {
  const cartItems = getCartItems();
  const hasSelectedItem = cartItems.some(item => item.selected);

  if (!hasSelectedItem) {
    showToast("선택된 상품이 없습니다.");
    return;
  }

  removeSelectedCartItems();
  showToast("선택한 상품이 삭제되었습니다.");
  renderCartPage(products);
}

// 상태 전환
function updateCartState(cartProducts) {
  const emptyStateElement = document.querySelector(".cart-page__state--empty");
  const filledStateElement = document.querySelector(".cart-page__state--filled");

  const isEmpty = cartProducts.length === 0;

  document.body.dataset.cartState = isEmpty ? "empty" : "filled";

  if (emptyStateElement) {
    emptyStateElement.hidden = !isEmpty;
  }

  if (filledStateElement) {
    filledStateElement.hidden = isEmpty;
  }
}

// 가격 포맷
function formatPrice(price) {
  return `${price.toLocaleString("ko-KR")}원`;
}