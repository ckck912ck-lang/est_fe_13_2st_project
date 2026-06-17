// 장바구니 기능
import { fetchData } from "../utils/fetchData.js";
import { initCartPage } from "../modules/cartActions.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";

// 데이터 렌더링
async function initCart() {
  try {
    const data = await fetchData("./data/products.json");
    const products = Array.isArray(data)
      ? data
      : Array.isArray(data.products)
        ? data.products
        : [];

    initCartPage(products);
    renderCartBadge();
  } catch (error) {
    console.error("장바구니 페이지를 초기화하지 못했습니다.", error);
    showToast("장바구니 정보를 불러오지 못했습니다.");
  }
}

initCart();