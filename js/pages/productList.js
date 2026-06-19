// productList.js : 배정호 작성

// 들여오기
import { fetchData } from "../utils/fetchData.js";
import { renderProducts } from "../modules/renderProducts.js";
import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { sortProducts } from "../modules/sort.js";
import { filterProducts } from "../modules/filter.js";
import {
  getPagedProducts,
  renderPagination,
  getNextPage,
  getTotalPage,
} from "../modules/pagination.js";
import { showSkeleton } from "../modules/renderSkeleton.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
import { addCartItem } from "../utils/localStorage.js";
import { openCloseHamburger, renderHamburger } from "../modules/hamburgerNav.js";
import { showToast } from "../modules/toast.js";
import { renderChatting, openChattingModal, closeChattingModal } from "../modules/fixedBtn.js";
import { getQueryParams } from "../utils/getQueryParam.js";

// 변수
const container = document.querySelector(".product-list .product-list-grid");

// 변수
const pagination = document.querySelector("[data-render='pagination']");
const sortArea = document.querySelector(".sort-area");
const filterGroup = document.querySelector(".filter-panel .filter-group");
const countPerPage = 12;
const fixedBtn = document.querySelector(".fixed-chat-button");

// 스켈레톤 UI — 데이터 받기 전에 먼저 표시
showSkeleton(container, countPerPage);

const data = await fetchData("./data/products.json");
const products = data.products;
const productCount = document.querySelector("[data-render='product-count']");

// 필터링 조건 객체
const selectedFilters = {
  categories: [],
  brands: [],
  shapes: [],

  isBest: false,
  isNew: false,

  priceRange: { min: null, max: null },
  customPrice: { min: null, max: null },
};

const filteredProducts = filterProducts(products, selectedFilters);

let currentProducts = [...products];
let currentSortType = "basic";

let currentPage = 1;
let paginationCount = 0;

// 상품 목록 기능 : 조승아 작성, 배정호 수정 및 주석

// 상품 개수 갱신 함수
function renderProductCount(totalCount, currentPage, countPerPage, currentCount) {
  if (!productCount) return;

  const startNumber = totalCount === 0 ? 0 : (currentPage - 1) * countPerPage + 1;
  const endNumber = Math.min(startNumber + currentCount - 1, totalCount);

  productCount.innerHTML = `
    <span class="product-count-mobile">전체 ${totalCount}개 중 ${startNumber}-${endNumber > 0 ? endNumber : 0} 표시</span>
    `;
  // <span class="product-count-pc">전체 ${totalCount}개 중 ${startNumber}-${endNumber}</span>
}

// 상품 목록 갱신 함수
function renderProductList() {
  const sortedProducts = sortProducts(currentProducts, currentSortType);
  const pagedProducts = getPagedProducts(sortedProducts, currentPage, countPerPage);

  renderProductCount(sortedProducts.length, currentPage, countPerPage, pagedProducts.length);
  renderProducts(pagedProducts, container);
  renderPagination(sortedProducts.length, currentPage, countPerPage, pagination);

  initLazyLoadImages(container);
}
renderProductList();

// 주요 기능

// 정렬 영역을 누르면
sortArea.addEventListener("click", (event) => {
  // 이벤트 위임
  const sortButton = event.target.closest(".sort-button");
  if (!sortButton) return;

  // 현재 클릭된 요소의 data-sort속성의 값을 정렬 타입으로 저장
  currentSortType = sortButton.dataset.sort || "basic";

  // 정렬 영역의 버튼들 is-active 클래스 모두 제거하고 클릭한 버튼에만 활성화
  sortArea.querySelectorAll(".sort-button").forEach((button) => {
    button.classList.remove("is-active");
  });
  sortButton.classList.add("is-active");

  // 페이지 초기화하고 렌더
  currentPage = 1;
  renderProductList();
});

if (pagination) {
  // 페이지네이션 영역을 누르면
  pagination.addEventListener("click", (event) => {
    // 기본기능 방지하고 이벤트 위임
    event.preventDefault();
    const pageButton = event.target.closest("[data-page]");
    if (!pageButton) return;

    // 정렬된 배열
    const sortedProducts = sortProducts(currentProducts, currentSortType);
    // 정렬된 배열 수를 나누어 전체 페이지 수 계산
    const totalPage = Math.ceil(sortedProducts.length / countPerPage);
    // 클릭된 요소의 data-page을 저장
    const pageValue = pageButton.dataset.page;

    // 이전버튼이면 1빼고, 다음버튼이면 1더해서 현재 페이지로 저장
    if (pageValue === "prev") {
      currentPage -= 1;
    } else if (pageValue === "next") {
      currentPage += 1;
    } else {
      currentPage = Number(pageValue);
    }

    // 현재 페이지가 1미만이면 1로 고정
    if (currentPage < 1) {
      currentPage = 1;
    }

    // 현재 페이지가 전체 페이지를 초과하면 전체 페이지로 고정
    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    // 페이지에 맞는 새로운 상품을 렌더링
    renderProductList();
  });
}

// 헤더 렌더링
renderHeader("B");

// 햄버거 렌더링
const hamburgerMenu = document.querySelector(".hamburger-menu");
renderHamburger(hamburgerMenu);

// 햄버거 열기
const openHamburger = document.querySelector(".hamburger-btn-open");
if (openHamburger) openCloseHamburger(openHamburger);

// 필터 모달 띄우기
const openModalBtn = document.querySelector(".filter-toggle-button");
const filterModal = document.querySelector(".product-filter-dialog");
const closeModalBtn = document.querySelector(".filter-close-button");

openModalBtn.addEventListener("click", () => {
  filterModal.showModal();
});

closeModalBtn.addEventListener("click", () => {
  filterModal.close();
});

// 필터 영역을 누르면
filterGroup.addEventListener("click", (e) => {
  // 이벤트 위임
  const filterButton = e.target.closest(".filter-chip");
  if (!filterButton) return;

  // 필터 리셋
  resetSelectedFilters();

  // 필터 입력
  selectedFilters.categories = [filterButton.dataset.filterValue];

  // 렌더링할 상품 배열에 저장
  currentProducts = filterProducts(products, selectedFilters);

  // 필터 영역의 버튼들 is-active 클래스 모두 제거하고 클릭한 버튼에만 활성화
  filterGroup.querySelectorAll(".filter-chip").forEach((button) => {
    button.classList.remove("is-active");
  });
  filterButton.classList.add("is-active");

  // 페이지 초기화하고 렌더
  currentPage = 1;
  renderProductList();
});

// 선택한 필터를 필터 객체에 저장하고 실행
const filterForm = document.querySelector(".filter-form");

filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedFilters = getSelectedFilters(filterForm);

  currentProducts = filterProducts(products, selectedFilters);
  currentPage = 1;
  filterModal.close();
  renderProductList();
});

// 객체를 수정하는 함수
function getSelectedFilters(filterCondition) {
  return {
    categories: [...filterCondition.querySelectorAll('[name="category"]:checked')].map(
      (el) => el.value
    ),

    brands: [...filterCondition.querySelectorAll('[name="brand"]:checked')].map((el) => el.value),

    shapes: [...filterCondition.querySelectorAll('[name="eyeWearShape"]:checked')].map(
      (el) => el.value
    ),

    isBest: filterCondition.querySelector('[name="best"]')?.checked ?? false,
    isNew: filterCondition.querySelector('[name="new"]')?.checked ?? false,

    priceRange: getPriceRange(filterCondition.querySelector('[name="priceRange"]:checked')?.value),

    customPrice: {
      min: null,
      max: null,
    },
  };
}

function getPriceRange(value) {
  if (!value) {
    return { min: null, max: null };
  }

  const [min, max] = value.split("-");

  return {
    min: min ? Number(min) : null,
    max: max ? Number(max) : null,
  };
}

// 객체를 초기화하는 함수
function resetSelectedFilters() {
  selectedFilters.categories = [];
  selectedFilters.brands = [];
  selectedFilters.shapes = [];

  selectedFilters.isBest = false;
  selectedFilters.isNew = false;

  selectedFilters.priceRange = { min: null, max: null };
  selectedFilters.customPrice = { min: null, max: null };
}

// 문의 모달 렌더링
renderChatting();

// 문의 고정버튼을 누르면 문의 모달창을 여는 함수
openChattingModal(fixedBtn);

// 문의 모달창의 닫기 버튼을 누르면 문의 모달창을 닫는 함수
closeChattingModal();

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

// 무한 스크롤 : (후순위 추가기능) 누르면 페이지네이션 지우고 화면 감지로 펼치는 기능 활성화

// 푸터 렌더링
renderFooter();
