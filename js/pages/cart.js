// 장바구니 기능
import { fetchData } from "../utils/fetchData.js";
import { initCartPage } from "../modules/cartActions.js";
import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { renderHamburger, openCloseHamburger } from "../modules/hamburgerNav.js";
import { initSearch } from "../modules/search.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";
import { renderProductCard } from "../modules/renderProductCard.js";
import { initProductSlider } from "../modules/carousel.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
import { renderChatting, openChattingModal, closeChattingModal } from "../modules/fixedBtn.js";
import { addCartItem } from "../utils/localStorage.js";

// 데이터 렌더링
async function initCart() {
  try {
    const data = await fetchData("./data/products.json");
    const products = Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : [];

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

// 햄버거 렌더링
const hamburgerMenu = document.querySelector(".hamburger-menu");
renderHamburger(hamburgerMenu);

// 햄버거 열기
const openHamburger = document.querySelector(".hamburger-btn-open");
openCloseHamburger(openHamburger);

initCart();
renderFooter();
initSearch();

// 문의 모달 렌더링
renderChatting();
const fixedBtn = document.querySelector(".fixed-chat-button");
// 문의 고정버튼을 누르면 문의 모달창을 여는 함수
openChattingModal(fixedBtn);

// 문의 모달창의 닫기 버튼을 누르면 문의 모달창을 닫는 함수
closeChattingModal();

const container = document.querySelector("body");
// 장바구니에 추가하는 기능
container.addEventListener("click", (e) => {
  const cartButton = e.target.closest(".cart-add");
  if (!cartButton) return;

  e.preventDefault();
  e.stopPropagation();

  const productId = cartButton.dataset.productId;
  if (!productId) return;

  addCartItem(productId, 1, "기본");

  console.log("장바구니 추가:", productId);
  // 토스트
  showToast(`상품이 장바구니에 추가되었습니다.`, 2000);
});
