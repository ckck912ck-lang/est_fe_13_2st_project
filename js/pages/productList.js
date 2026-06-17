// 상품목록 : 배정호 작성
// 이 파일은 상품 목록 페이지의 조립 역할을 담당함
// 데이터 가져오기, 현재 상품 배열/정렬/페이지 상태 관리, 이벤트 연결을 처리함
// 정렬 계산은 sort.js에서 처리함
// 페이지네이션 계산/렌더링은 pagination.js에서 처리함
// 상품 카드 렌더링은 renderProducts.js에서 처리함

// 들여오기 목록
import { fetchData } from "/js/utils/fetchData.js";
import { renderProducts } from "/js/modules/renderProducts.js";
import { renderHeader } from "/js/modules/renderHeader.js";
import { renderFooter } from "/js/modules/renderFooter.js";
import { sortProducts } from "/js/modules/sort.js";
import {
  getPagedProducts,
  renderPagination,
  getNextPage,
  getTotalPage,
} from "/js/modules/pagination.js";

// 변수 목록
const data = await fetchData("/data/products.json");
const products = data.products;
const container = document.querySelector(".product-list .product-list-grid");
const productCount = document.querySelector("[data-render='product-count']");
const pagination = document.querySelector("[data-render='pagination']");
const countPerPage = 12;

const sortArea = document.querySelector(".sort-area");

let currentProducts = [...products];
let currentSortType = "basic";
let currentPage = 1;

// 상품 개수 렌더링
// 매개변수:
// - products: 개수를 표시할 기준 상품 배열
// 반환값:
// - 없음
// 동작:
// - products.length를 사용해 상품 개수를 화면에 출력함
function renderProductCount(products) {
  if (!productCount) return;

  productCount.innerHTML = `
    <span class="product-count-mobile">총 ${products.length}개 상품</span>
    <span class="product-count-pc">총 ${products.length}개 상품</span>
  `;
}
// 상품 목록 렌더링 흐름 조립
// 매개변수:
// - 없음
// 반환값:
// - 없음
// 동작:
// - sort.js의 sortProducts()를 호출해 현재 정렬 기준으로 상품 배열을 정렬함
// - pagination.js의 getPagedProducts()를 호출해 현재 페이지에 보여줄 상품만 가져옴
// - renderProducts()를 호출해 상품 카드를 렌더링함
// - pagination.js의 renderPagination()을 호출해 페이지네이션 버튼을 렌더링함
function renderProductList() {
  const sortedProducts = sortProducts(currentProducts, currentSortType);
  const pagedProducts = getPagedProducts(sortedProducts, currentPage, countPerPage);

  renderProducts(pagedProducts, container);
  renderPagination(sortedProducts.length, currentPage, countPerPage, pagination);
}
// 메인 페이지 기능

// 상품 목록 기능
// 상품 목록 초기 렌더링
// 페이지가 처음 열렸을 때 상품 개수와 첫 페이지 상품 목록을 출력함
renderProductCount(currentProducts);
renderProductList();

// 정렬 버튼 클릭 이벤트
// 역할:
// - 클릭한 정렬 버튼의 data-sort 값을 읽음
// - currentSortType 상태를 변경함
// - 정렬 기준이 바뀌면 currentPage를 1로 초기화함
// - renderProductList()를 다시 호출해 정렬/페이지네이션 결과를 화면에 반영함
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

// 페이지네이션 클릭 이벤트
// 역할:
// - 클릭한 페이지 값을 읽음
// - pagination.js의 getTotalPage(), getNextPage()를 사용해 이동할 페이지를 계산함
// - currentPage 상태를 갱신한 뒤 상품 목록을 다시 렌더링함
if (pagination) {
  pagination.addEventListener("click", (event) => {
    event.preventDefault();

    const pageButton = event.target.closest("[data-page]");

    if (!pageButton) return;

    const sortedProducts = sortProducts(currentProducts, currentSortType);
    const totalPage = getTotalPage(sortedProducts.length, countPerPage);
    const pageValue = pageButton.dataset.page;

    currentPage = getNextPage(pageValue, currentPage, totalPage);

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
