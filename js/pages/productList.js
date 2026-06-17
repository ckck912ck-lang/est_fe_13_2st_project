// 상품목록 : 배정호 작성

// 들여오기 목록
import { fetchData } from "/js/utils/fetchData.js";
import { renderProducts } from "/js/modules/renderProducts.js";
import { renderHeader } from "/js/modules/renderHeader.js";
import { renderFooter } from "/js/modules/renderFooter.js";
import { sortProducts } from "/js/modules/sort.js";
import { getPagedProducts, renderPagination } from "/js/modules/pagination.js";
// 변수 목록
const data = await fetchData("/data/products.json");
const products = data.products;
// const filteredData = data.products.slice(0, 12);
const container = document.querySelector(".product-list .product-list-grid");
const productCount = document.querySelector("[data-render='product-count']");
const pagination = document.querySelector("[data-render='pagination']");
const countPerPage = 12;

const sortArea = document.querySelector(".sort-area");

let currentProducts = [...products];
let currentSortType = "basic";

let currentPage = 1;
let paginationCount = 0;

let selectedCategories = [];
let selectedBrands = [];
let selectedPrice = "";
let eyeWearShape = "";

function renderProductCount(products) {
  if (!productCount) return;

  productCount.innerHTML = `
    <span class="product-count-mobile">총 ${products.length}개 상품</span>
    <span class="product-count-pc">총 ${products.length}개 상품</span>
  `;
}
function renderProductList() {
  const sortedProducts = sortProducts(currentProducts, currentSortType);
  const pagedProducts = getPagedProducts(sortedProducts, currentPage, countPerPage);

  renderProducts(pagedProducts, container);
  renderPagination(sortedProducts.length, currentPage, countPerPage, pagination);
}
// 메인 페이지 기능

// 상품 목록 기능 : 조승아 작성
renderProductCount(currentProducts);
renderProductList();
if (sortArea) {
  sortArea.addEventListener("click", (event) => {
    const sortButton = event.target.closest(".sort-button");

    if (!sortButton) return;

    currentSortType = sortButton.dataset.sort || "basic";

    currentPage = 1;
    renderProductList();

    sortArea.querySelectorAll(".sort-button").forEach((button) => {
      button.classList.remove("is-active");
    });

    sortButton.classList.add("is-active");
  });
}
if (pagination) {
  pagination.addEventListener("click", (event) => {
    event.preventDefault();

    const pageButton = event.target.closest("[data-page]");

    if (!pageButton) return;

    const sortedProducts = sortProducts(currentProducts, currentSortType);
    const totalPage = Math.ceil(sortedProducts.length / countPerPage);
    const pageValue = pageButton.dataset.page;

    if (pageValue === "prev") {
      currentPage -= 1;
    } else if (pageValue === "next") {
      currentPage += 1;
    } else {
      currentPage = Number(pageValue);
    }

    if (currentPage < 1) {
      currentPage = 1;
    }

    if (currentPage > totalPage) {
      currentPage = totalPage;
    }

    renderProductList();
  });
}
// 헤더 렌더링
renderHeader("B");

// 타이틀 : 전체 개수 출력

// 필터/정렬 : 필터 슬라이드, 필터 모달 띄우기, 복합 필터, 정렬

// 상품 출력:
// pagination.js에서 사용자가 선택한 현재 페이지 번호를 전달받음
// 전체 상품 중에서 필터/정렬된 상품 배열을 현재 페이지 기준으로 잘라냄
// 잘라낸 상품 배열과 상품을 넣을 태그를 renderProducts.js에 인수로 전달해 상품 목록 렌더링

// 무한 스크롤 : (후순위 추가기능) 누르면 페이지네이션 지우고 화면 감지로 펼치는 기능 활성화

// 푸터 렌더링
renderFooter();
