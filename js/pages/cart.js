// 장바구니 기능
import { fetchData } from "../utils/fetchData.js";
import { initCartPage } from "../modules/cartActions.js";
import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { initSearch } from "../modules/search.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";
import { renderProductCard } from "../modules/renderProductCard.js";
import { initProductSlider } from "../modules/carousel.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";

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
    renderCartRecommendProducts(products);
    renderCartBadge();
  } catch (error) {
    console.error("장바구니 페이지를 초기화하지 못했습니다.", error);
    showToast("장바구니 정보를 불러오지 못했습니다.");
  }
}

function renderCartRecommendProducts(products) {
  const wrappers = document.querySelectorAll('[data-render="cart-recommend-products"]');
  if (!wrappers.length) return;

  const recommendProducts = products
    .filter((product) => product.isBest || product.isNew)
    .slice(0, 10);

  wrappers.forEach((wrapper) => {
    wrapper.innerHTML = recommendProducts
      .map((product) => `<div class="swiper-slide">${renderProductCard(product)}</div>`)
      .join("");

    initLazyLoadImages(wrapper);
  });

  document.querySelectorAll(".cart-recommend-swiper").forEach((swiper, index) => {
    swiper.classList.add(`cart-recommend-swiper-${index}`);
    initProductSlider(
      `.cart-recommend-swiper-${index}`,
      ".cart-recommend-prev",
      ".cart-recommend-next"
    );
  });
}

renderHeader("");
initCart();
renderFooter();
initSearch();
