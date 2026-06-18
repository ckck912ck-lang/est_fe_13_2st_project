import { renderTestimonials } from "../modules/testimonial.js";
import { initTabs } from "../modules/tabs.js";
import { initProductDetailCarousel } from "../modules/carousel.js";
import { fetchData } from "../utils/fetchData.js";
import { addCartItem } from "../utils/localStorage.js";
import { renderCartBadge } from "../modules/renderCartBadge.js";
import { showToast } from "../modules/toast.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
// 상품 상세 기능

// 상품 이미지 : 현재 선택한 썸네일에 맞는 큰 이미지 띄우기, 슬라이드
// 썸네일 : 해당 상품의 썸네일 전체 개수 감지해서 가로스크롤 (swiperjs 찾아볼것)

// 상품정보 : 데이터 렌더링, 별점에 따라 별 개수 조정, 장바구니 담기

// 후기 : 데이터 렌더링

// 비슷한 상품 : 슬라이드
const reviews = [
  {
    author: "김*연",
    date: "2026-01-15",
    rating: 5,
    content:
      "가벼워서 하루종일 써도 불편하지 않아요. 티타늄 소재라 그런지 정말 가볍고 코 위에 자국도 덜 남아요.",
  },
  {
    author: "이*준",
    date: "2026-01-10",
    rating: 5,
    content: "디자인이 예상보다 훨씬 깔끔하고 고급스럽습니다. 색상은 실제로 보면 더 멋있어요.",
  },
  {
    author: "박*희",
    date: "2025-12-28",
    rating: 4.5,
    content:
      "AI 가상피팅으로 미리 착용해보고 구매했는데 실제로 받아보니 딱 제가 생각한 스타일이었어요.",
  },
  {
    author: "최*수",
    date: "2025-12-20",
    rating: 5,
    content:
      "파트너 안경원에서 렌즈까지 맞춰서 쓰고 있는데 너무 만족스러워요. 배송도 빠르고 포장도 고급스러웠습니다.",
  },
];
const reviewList = document.querySelector('[data-render="product-review-list"]');
const productTabs = document.querySelector(".product-detail-tabs");
const productSummary = document.querySelector('[data-render="product-summary"]');
const productBrandLink = document.querySelector(".product-summary-brand a");
const productTitle = document.querySelector("#product-title");
const productPrice = document.querySelector(".product-summary-price");
const productDescription = document.querySelector('[data-render="product-description"]');
const productColorOption = document.querySelector(".product-color-option");
const productGalleryMainWrapper = document.querySelector(
  ".product-gallery-main-swiper .swiper-wrapper"
);
const productGalleryThumbWrapper = document.querySelector(
  ".product-gallery-thumb-swiper .swiper-wrapper"
);
function getProductImages(product) {
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }

  if (product.thumbnail) {
    return [product.thumbnail];
  }

  return [];
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

  const frameShape = product["eye-wear-shape"] || "안경";

  return `${product.brand}의 ${product.title} 상품입니다. ${frameShape} 형태의 프레임으로 데일리 착용에 자연스럽게 어울리며, 다양한 스타일에 활용하기 좋습니다.`;
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
  // 상품 상세 설명 렌더링
  if (productDescription) {
    productDescription.textContent = getProductDescription(product);
  }

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
    const data = await fetchData("/data/products.json");
    const products = Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : [];

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
    initProductDetailCarousel(".product-gallery-main-swiper", ".product-gallery-thumb-swiper");
  } catch (error) {
    console.error("상품 상세 정보를 불러오지 못했습니다.", error);
    showToast("상품 정보를 불러오지 못했습니다.");
  }
}

renderCartBadge();
initProductDetail();
initProductQuantity();
initAddCartButton();

if (reviewList) {
  renderTestimonials(reviews, reviewList, 4);
}

if (productTabs) {
  initTabs(productTabs);
}
