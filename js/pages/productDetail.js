// 조승아 작업
import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { renderHamburger, openCloseHamburger } from "../modules/hamburgerNav.js";
import { renderTestimonials } from "../modules/testimonial.js";
import { initTabs } from "../modules/tabs.js";
import { initProductDetailCarousel } from "../modules/carousel.js";
import { fetchData } from "../utils/fetchData.js";
import { addCartItem } from "../utils/localStorage.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
import { renderProductCard } from "../modules/renderProductCard.js";
import { renderStars } from "../modules/renderStars.js";
// 상품 상세 기능

// 상품 이미지 : 현재 선택한 썸네일에 맞는 큰 이미지 띄우기, 슬라이드
// 썸네일 : 해당 상품의 썸네일 전체 개수 감지해서 가로스크롤 (swiperjs 찾아볼것)

// 상품정보 : 데이터 렌더링, 별점에 따라 별 개수 조정, 장바구니 담기

// 후기 : 데이터 렌더링

// 비슷한 상품 : 슬라이드
const reviewList = document.querySelector('[data-render="product-review-list"]');
const reviewCountText = document.querySelector('[data-render="review-count"]');
const productTabs = document.querySelector(".product-detail-tabs");
const productSummary = document.querySelector('[data-render="product-summary"]');
const productBrandLink = document.querySelector(".product-summary-brand a");
const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector(".product-summary-price");
const productRating = document.querySelector(".product-summary-rating");
const productRatingStars = document.querySelector(".product-summary-stars");
const productRatingScore = document.querySelector(".product-summary-rating-score");
const productReviewCount = document.querySelector(".product-summary-review-count");
const productDescriptions = document.querySelectorAll('[data-render="product-description"]');
const productColorOption = document.querySelector(".product-color-option");
const productGalleryMainWrapper = document.querySelector(
  ".product-gallery-main-swiper .swiper-wrapper"
);
const productGalleryThumbWrapper = document.querySelector(
  ".product-gallery-thumb-swiper .swiper-wrapper"
);
const relatedProductsGrid = document.querySelector('[data-render="related-products"]');
function getProductImages(product) {
  const images = Array.isArray(product.images) ? product.images : [];
  const productImages = [product.thumbnail, ...images].filter(Boolean);

  return productImages.filter((image, index, array) => {
    return array.indexOf(image) === index;
  });
}

function renderProductGallery(product) {
  if (!productGalleryMainWrapper || !productGalleryThumbWrapper) {
    return;
  }

  const productImages = getProductImages(product);

  if (productImages.length === 0) {
    return;
  }

  productGalleryMainWrapper.innerHTML = productImages
    .map((image, index) => {
      return `
        <div class="swiper-slide product-gallery-main">
          <img
            data-src="${image}"
            alt="${product.brand} ${product.title} ${index + 1}번째 이미지"
            onerror="this.onerror=null; this.src='${product.thumbnail}'"
          />
        </div>
      `;
    })
    .join("");

  productGalleryThumbWrapper.innerHTML = productImages
    .map((image, index) => {
      return `
        <button
          class="swiper-slide product-gallery-thumb"
          type="button"
          aria-label="${index + 1}번째 상품 이미지"
        >
          <img
            data-src="${image}"
            alt=""
            aria-hidden="true"
            onerror="this.onerror=null; this.src='${product.thumbnail}'"
          />
        </button>
      `;
    })
    .join("");

  // 상품 갤러리 이미지 지연 로딩 적용
  initLazyLoadImages(productGalleryMainWrapper.closest(".product-gallery"));
}

const addCartButton = document.querySelector('[data-action="add-cart"]');
const quantityBox = document.querySelector(".product-quantity");
const quantityText = quantityBox?.querySelector("span");

let productQuantity = 1;

function getProductIdFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

function formatPrice(price) {
  return `${price.toLocaleString("ko-KR")}원`;
}

function createBrandUrl(brand) {
  return `product-list.html?brand=${encodeURIComponent(brand)}`;
}
// 상품 설명 문구 생성
// 매개변수:
// - product: 현재 상세페이지에 표시할 상품 객체
// 반환값:
// - 상품 상세 설명 문자열
// 동작:
// - products.json에 description 값이 있으면 해당 값을 사용함
// - description 값이 없으면 상품 데이터 기반으로 기본 설명 문구를 생성함
function getProductDescription(product) {
  if (product.description) {
    return product.description;
  }

  const frameShape = product.eyeWearShape || "안경";

  return `${product.brand}의 ${product.title} 상품입니다. ${frameShape} 형태의 프레임으로 데일리 착용에 자연스럽게 어울리며, 다양한 스타일에 활용하기 좋습니다.`;
}
function renderProductRating(product) {
  if (!productRating || !productRatingStars || !productRatingScore || !productReviewCount) {
    return;
  }

  const rating = Number(product.rating) || 0;
  const reviewCount = Number(product.reviewCount) || 0;

  productRatingStars.innerHTML = renderStars(rating);
  productRatingScore.textContent = rating.toFixed(1);
  productReviewCount.textContent = `(${reviewCount})`;
  productRating.setAttribute("aria-label", `평점 ${rating.toFixed(1)}점, 리뷰 ${reviewCount}개`);
}
function renderProductReviews(product, reviews) {
  if (!reviewList) {
    return;
  }

  const productReviews = Array.isArray(reviews)
    ? reviews.filter((review) => {
        return String(review.productId) === String(product.id);
      })
    : [];

  if (reviewCountText) {
    reviewCountText.textContent = `(${productReviews.length})`;
  }

  if (productReviews.length === 0) {
    reviewList.innerHTML = `
      <p class="review-empty">아직 작성된 후기가 없습니다.</p>
    `;
    return;
  }

  renderTestimonials(productReviews, reviewList, productReviews.length);
}

function renderProductSummary(product) {
  if (!productSummary) {
    return;
  }

  productSummary.dataset.productId = String(product.id);

  if (productBrandLink) {
    productBrandLink.href = createBrandUrl(product.brand);
    productBrandLink.innerHTML = `
      ${product.brand}
      <span class="material-icons" aria-hidden="true">keyboard_arrow_right</span>
    `;
  }

  if (productTitle) {
    productTitle.textContent = product.title;
  }

  if (productPrice) {
    productPrice.innerHTML = `
      <strong>${formatPrice(product.price)}</strong>
      ${
        product.originalPrice && product.originalPrice > product.price
          ? `<del>${formatPrice(product.originalPrice)}</del>`
          : ""
      }
      ${product.discountRate ? `<span>-${product.discountRate}%</span>` : ""}
    `;
  }
  renderProductRating(product);
  // 상품 상세 설명 렌더링
  productDescriptions.forEach((description) => {
    description.textContent = getProductDescription(product);
  });

  if (productColorOption) {
    renderProductColors(product.colors);
  }
}

function renderProductColors(colors) {
  if (!productColorOption) {
    return;
  }

  const colorList = Array.isArray(colors) && colors.length > 0 ? colors : ["기본"];

  productColorOption.innerHTML = `
    <legend>색상 선택</legend>
    <div class="product-chip-list">
      ${colorList
        .map((color, index) => {
          return `
            <label>
              <input
                type="radio"
                name="product-color"
                value="${color}"
                ${index === 0 ? "checked" : ""}
              />
              <span>${color}</span>
            </label>
          `;
        })
        .join("")}
    </div>
  `;
}
// 비슷한 상품 렌더링
// 매개변수:
// - currentProduct: 현재 상세페이지에 표시 중인 상품
// - products: 전체 상품 배열
// 동작:
// - 현재 보고 있는 상품은 제외함
// - 같은 category + 같은 eyeWearShape 상품을 우선 보여줌
// - 부족하면 같은 category 상품으로 채움
// - 그래도 부족하면 전체 상품 중 다른 상품으로 채움
function renderRelatedProducts(currentProduct, products) {
  if (!relatedProductsGrid) {
    return;
  }

  const currentProductId = String(currentProduct.id);

  const sameShapeProducts = products.filter((product) => {
    return (
      String(product.id) !== currentProductId &&
      product.category === currentProduct.category &&
      product.eyeWearShape === currentProduct.eyeWearShape
    );
  });

  const sameCategoryProducts = products.filter((product) => {
    return (
      String(product.id) !== currentProductId &&
      product.category === currentProduct.category &&
      product.eyeWearShape !== currentProduct.eyeWearShape
    );
  });

  const fallbackProducts = products.filter((product) => {
    return String(product.id) !== currentProductId;
  });

  const relatedProducts = [...sameShapeProducts, ...sameCategoryProducts, ...fallbackProducts]
    .filter((product, index, array) => {
      return array.findIndex((item) => item.id === product.id) === index;
    })
    .slice(0, 2);

  relatedProductsGrid.innerHTML = relatedProducts
    .map((product) => {
      return renderProductCard(product);
    })
    .join("");

  initLazyLoadImages(relatedProductsGrid);
}

function updateQuantity(nextQuantity) {
  productQuantity = Math.max(1, nextQuantity);

  if (quantityText) {
    quantityText.textContent = productQuantity;
  }
}

function initProductQuantity() {
  if (!quantityBox) {
    return;
  }

  quantityBox.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quantity-action]");

    if (!button) {
      return;
    }

    const action = button.dataset.quantityAction;

    if (action === "decrease") {
      updateQuantity(productQuantity - 1);
    }

    if (action === "increase") {
      updateQuantity(productQuantity + 1);
    }
  });
}

function initAddCartButton() {
  if (!productSummary || !addCartButton) {
    return;
  }

  addCartButton.addEventListener("click", () => {
    const productId = productSummary.dataset.productId;
    const checkedColorInput = document.querySelector('input[name="product-color"]:checked');
    const selectedColor = checkedColorInput?.value;

    if (!productId) {
      console.error("상품 ID가 없습니다.");
      showToast("상품 정보를 찾을 수 없습니다.");
      return;
    }

    if (!selectedColor) {
      showToast("색상을 선택해주세요.");
      return;
    }

    addCartItem(productId, productQuantity, selectedColor);
    renderCartBadge();
    showToast("장바구니에 상품을 담았습니다.");
  });
}

async function initProductDetail() {
  try {
    const [productData, reviewData] = await Promise.all([
      fetchData("/data/products.json"),
      fetchData("/data/reviews.json"),
    ]);

    const products = Array.isArray(productData)
      ? productData
      : Array.isArray(productData.products)
        ? productData.products
        : [];

    const reviews = Array.isArray(reviewData)
      ? reviewData
      : Array.isArray(reviewData?.reviews)
        ? reviewData.reviews
        : [];

    const productId = getProductIdFromUrl();

    if (!productId) {
      showToast("상품 ID가 없습니다.");
      return;
    }

    const product = products.find((product) => String(product.id) === productId);

    if (!product) {
      showToast("상품 정보를 찾을 수 없습니다.");
      return;
    }

    renderProductSummary(product);
    renderProductGallery(product);
    renderProductReviews(product, reviews);
    renderRelatedProducts(product, products);
    initProductDetailCarousel(".product-gallery-main-swiper", ".product-gallery-thumb-swiper");
  } catch (error) {
    console.error("상품 상세 정보를 불러오지 못했습니다.", error);
    showToast("상품 정보를 불러오지 못했습니다.");
  }
}

renderHeader("A");
const hamburgerMenu = document.querySelector(".hamburger-menu");

if (hamburgerMenu) {
  renderHamburger(hamburgerMenu);

  const openHamburger = document.querySelector(".hamburger-btn-open");

  if (openHamburger) {
    openCloseHamburger(openHamburger);
  }
}
renderFooter();
renderCartBadge();
initProductDetail();
initProductQuantity();
initAddCartButton();

if (productTabs) {
  initTabs(productTabs);
}
