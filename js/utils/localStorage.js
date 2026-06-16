// localStorage 저장/읽기/삭제

//장바구니 localStorage key는 "rounzCart"
const CART_STORAGE_KEY = "rounzCart";

// productId 유효성 체크 함수
function normalizeProductId(productId) {
  return String(productId ?? "").trim();
}

// 불러온 값을 숫자로 변환해주는 함수
function normalizeQuantity(quantity) {
  const parsedQuantity = Number(quantity);

  if (!Number.isFinite(parsedQuantity) || parsedQuantity < 1) {
    return 1;
  }

  return Math.floor(parsedQuantity);
}

// 장바구니 데이터를 localStorage에서 불러오는 함수
export function getCartItems() {
  try {
    const cartItems = localStorage.getItem(CART_STORAGE_KEY);
    const parsedCartItems = cartItems ? JSON.parse(cartItems) : [];

    return Array.isArray(parsedCartItems) ? parsedCartItems : [];
  } catch (error) {
    console.error("장바구니 데이터를 불러오지 못했습니다.", error);
    return [];
  }
}

// 장바구니 데이터를 localStorage에 저장하는 함수
export function setCartItems(cartItems) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error("장바구니 데이터를 저장하지 못했습니다.", error);
  }
}

// 장바구니에 상품을 추가하는 함수
export function addCartItem(productId, quantity = 1) {
  const id = normalizeProductId(productId);
  const safeQuantity = normalizeQuantity(quantity);

  if (!id) {
    console.error("상품 ID가 올바르지 않습니다.");
    return;
  }

  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.productId === id);

  if (existingItem) {
    existingItem.quantity += safeQuantity;
  } else {
    cartItems.push({
      productId: id,
      quantity: safeQuantity,
      selected: true,
    });
  }

  setCartItems(cartItems);
}

// 장바구니에 있는 상품의 수량을 업데이트하는 함수
export function updateCartItemQuantity(productId, quantity) {
  const id = normalizeProductId(productId);
  const safeQuantity = normalizeQuantity(quantity);

  if (!id) {
    console.error("상품 ID가 올바르지 않습니다.");
    return;
  }

  const cartItems = getCartItems();
  const item = cartItems.find(item => item.productId === id);

  if (item) {
    item.quantity = safeQuantity;
    setCartItems(cartItems);
  }
}

// 장바구니에서 상품을 제거하는 함수
export function removeCartItem(productId) {
  const id = normalizeProductId(productId);

  if (!id) {
    console.error("상품 ID가 올바르지 않습니다.");
    return;
  }

  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter(item => item.productId !== id);

  setCartItems(updatedCartItems);
}

// 장바구니에서 상품의 선택 상태를 업데이트하는 함수
export function updateCartItemSelected(productId, selected) {
  const id = normalizeProductId(productId);

  if (!id) {
    console.error("상품 ID가 올바르지 않습니다.");
    return;
  }

  const cartItems = getCartItems();
  const item = cartItems.find(item => item.productId === id);

  if (item) {
    item.selected = Boolean(selected);
    setCartItems(cartItems);
  }
}

// 장바구니의 모든 상품의 선택 상태를 업데이트하는 함수
export function updateAllCartItemsSelected(selected) {
  const cartItems = getCartItems();

  cartItems.forEach(item => {
    item.selected = selected;
  });

  setCartItems(cartItems);
}

// 선택된 상품만 장바구니에서 제거하는 함수
export function removeSelectedCartItems() {
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter(item => !item.selected);
  setCartItems(updatedCartItems);
}

// 장바구니를 완전히 비우는 함수
export function clearCartItems() {
  setCartItems([]);
}

// 장바구니에 담긴 상품의 총 수량을 계산하는 함수
export function getCartTotalQuantity() {
  const cartItems = getCartItems();
  
  return cartItems.reduce((total, item) => {
    return total + normalizeQuantity(item.quantity);
  }, 0);
}
