// 상품목록 : 배정호 작성

// 들여오기 목록
import { fetchData } from "/js/utils/fetchData.js";
import { renderProducts } from "/js/modules/renderProducts.js";
import { renderHeader } from "/js/modules/renderHeader.js";
import { renderFooter } from "/js/modules/renderFooter.js";

// 변수 목록
const data = await fetchData("/data/products.json");
const product = data.products;
const filteredData = data.products.slice(0, 12);
const container = document.querySelector(".product-list .product-list-grid");
const countPerPage = 12;

let currentPage = 1;
let paginationCount = 0;

let selectedCategories = [];
let selectedBrands = [];
let selectedPrice = "";
let eyeWearShape = "";

// 메인 페이지 기능

// 상품 목록 기능
renderProducts(filteredData, container);

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
