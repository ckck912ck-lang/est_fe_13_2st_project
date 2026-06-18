// renderHeader : 배정호 작업

import { renderCartBadge } from "./renderCartBadge.js";
import { initSearch } from "./search.js";

const header = document.querySelector("header");

// 헤더 1 : 메인, 회원가입 입력폼/약관동의, 장바구니 페이지

function getHeaderTypeA() {
  return `
      <div class="container header-A">
        <div class="header-top">
          <div class="header-left">
            <button
              type="button"
              class="header-btn hamburger-btn-open"
              aria-expanded="false"
              aria-label="전체 메뉴 열기"
            >
              <span class="material-icons" aria-hidden="true">menu</span>
            </button>
          </div>
          <div class="header-center">
            <h1 class="logo">
              <a href="index.html" aria-label="ROUNZ 홈">
                <img src="assets/images/common/logo.png" alt="ROUNZ logo" />
                <span class="visually-hidden">ROUNZ</span>
              </a>
            </h1>
          </div>
          <div class="header-right">
            <div class="site-header-btns">
              <button type="button" class="header-btn search" aria-label="검색 열기">
                <span class="material-icons">search</span>
              </button>
              <a class="header-btn cart" href="cart.html" aria-label="장바구니">
                <span class="material-icons">local_mall</span>
                <span class="cart-badge" data-render="cart-count" aria-label="장바구니 상품 수"
                  >2</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
  `;
}

// 헤더 2 : 상품 목록 페이지 (현재 대분류(안경테/선글라스/고글 등)를 헤더 텍스트로 표시)
function getHeaderTypeB() {
  return `
      <div class="container header-B">
        <div class="header-top">
          <div class="header-left">
            <a href="/index.html" class="header-btn">
              <span class="material-icons">chevron_left</span>
            </a>
            <h2 class="category">상품</h2>
          </div>
          <div class="header-center">
            <h1 class="logo">
              <a href="index.html" aria-label="ROUNZ 홈">
                <img src="assets/images/common/logo.png" alt="ROUNZ logo" />
                <span class="visually-hidden">ROUNZ</span>
              </a>
            </h1>
          </div>              
          <div class="header-right">
            <div class="site-header-btns">
              <button type="button" class="header-btn search" aria-label="검색 열기">
                <span class="material-icons">search</span>
              </button>
              <a class="header-btn cart" href="cart.html" aria-label="장바구니">
                <span class="material-icons">local_mall</span>
                <span class="cart-badge" data-render="cart-count" aria-label="장바구니 상품 수"
                  >2</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
  `;
}

// 헤더 3 : 상품 상세, 로그인 페이지
function getHeaderTypeC() {
  return `
      <div class="container header-C">
        <div class="header-top">
          <div class="header-left">
            <button class="header-btn">
              <span class="material-icons">chevron_left</span>
            </button>
          </div>
          <div class="header-center">
            <h1 class="logo">
              <a href="index.html" aria-label="ROUNZ 홈">
                <img src="assets/images/common/logo.png" alt="ROUNZ logo" />
                <span class="visually-hidden">ROUNZ</span>
              </a>
            </h1>
          </div>
          <div class="header-right">
            <div class="site-header-btns">
              <a href="index.html" aria-label="ROUNZ 홈">
                <button type="button" class="header-btn home" aria-label="처음으로 돌아가기">
                  <span class="material-icons">home</span>
                </button>
              </a>
              <button type="button" class="header-btn search" aria-label="검색 열기">
                <span class="material-icons">search</span>
              </button>
              <a class="header-btn cart" href="cart.html" aria-label="장바구니">
                <span class="material-icons">local_mall</span>
                <span class="cart-badge" data-render="cart-count" aria-label="장바구니 상품 수"
                  >2</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
  `;
}

// 헤더 4 : PC 고정
function getHeaderPC() {
  return `
      <div class="container header-PC">
        <div class="header-top">
          <div class="header-left">
            <button
              type="button"
              class="header-btn hamburger-btn-open"
              aria-expanded="false"
              aria-label="전체 메뉴 열기"
            >
              <span class="material-icons" aria-hidden="true">menu</span>
            </button>
          </div>
          <div class="header-center">
            <h1 class="logo">
              <a href="index.html" aria-label="ROUNZ 홈">
                <img src="assets/images/common/logo.png" alt="ROUNZ logo" />
                <span class="visually-hidden">ROUNZ</span>
              </a>
            </h1>
          </div>
          <div class="header-right">
            <div class="site-header-btns">
              <button type="button" class="header-btn search" aria-label="검색 열기">
                <span class="material-icons">search</span>
              </button>
              <a class="header-btn cart" href="cart.html" aria-label="장바구니">
                <span class="material-icons">local_mall</span>
                <span class="cart-badge" data-render="cart-count" aria-label="장바구니 상품 수"
                  >2</span
                >
              </a>
              <a class="header-btn login" href="login.html" aria-label="로그인">
                <span class="material-icons">account_circle</span>
              </a>
            </div>
          </div>
        </div>
        <nav class="header-nav" aria-label="주요 내비게이션">
          <a class="" href="product-list.html">전체</a>
          <a class="" href="product-list.html?category=glasses">안경</a>
          <a class="" href="product-list.html?category=sunglasses">선글라스</a>
          <a class="" href="product-list.html?category=best">베스트</a>
          <a class="" href="product-list.html?category=new">신상품</a>
        </nav>
      </div>
  `;
}

// 받는 매개변수에 따라 헤더타입 바꿔서 container의 innerHTML 교체
export function renderHeader(headerType) {
  const header = document.querySelector("header");
  const isPc = window.matchMedia("(min-width: 1280px)").matches;

  let html = "";

  // PC에서는 무조건 공통 헤더
  if (isPc) {
    html = getHeaderPC();
  } else {
    // 모바일/태블릿
    switch (headerType) {
      case "A":
        html = getHeaderTypeA();
        break;

      case "B":
        html = getHeaderTypeB();
        break;

      case "C":
        html = getHeaderTypeC();
        break;

      default:
        html = getHeaderTypeA();
        break;
    }
  }

  header.innerHTML = html;
  renderCartBadge();
  initSearch();
}
