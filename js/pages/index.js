import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { renderHamburger, openCloseHamburger } from "../modules/hamburgerNav.js";
import { fetchData } from "../utils/fetchData.js";
import { renderProductCard } from "../modules/renderProductCard.js";
import { initHeroSlider, initProductSlider } from "../modules/carousel.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
import { renderChatting, openChattingModal } from "../modules/fixedBtn.js";

// 메인 페이지 기능
renderHeader("");
renderFooter();

// 문의 모달 렌더링
renderChatting();
const fixedBtn = document.querySelector(".fixed-chat-button");
openChattingModal(fixedBtn);

// 햄버거 렌더링
const hamburgerMenu = document.querySelector(".hamburger-menu");
renderHamburger(hamburgerMenu);

// 햄버거 열기
const openHamburger = document.querySelector(".hamburger-btn-open");
openCloseHamburger(openHamburger);

// 공통 헤더, A타입

// 히어로 슬라이더 초기화
initHeroSlider(".hero-slider", ".hero-prev-btn", ".hero-next-btn", ".hero-pagination");

// 얼굴형별 추천 : 슬라이드, 필터된 상품목록으로 이동

// AI 추천 상품 : 슬라이드, 전체 상품 필터해서 AI 추천 상품만 출력 (현재 구현 불가 : 랜덤 상품으로 대체)
async function renderAiProducts() {
  const data = await fetchData("./data/products.json");
  if (!data) return;

  // 랜덤으로 상품 섞어서 8개 선택 (AI 추천 로직 대체)
  const shuffled = [...data.products].sort(() => Math.random() - 0.5);
  const aiProducts = shuffled.slice(0, 8);

  const wrapper = document.querySelector('[data-render="recommended-products"]');
  if (!wrapper) return;

  wrapper.innerHTML = aiProducts
    .map((product) => `<div class="swiper-slide">${renderProductCard(product)}</div>`)
    .join("");

  // AI 추천 상품 이미지 지연 로딩 적용
  initLazyLoadImages(wrapper);

  initProductSlider(".ai-product-swiper", ".ai-prev-btn", ".ai-next-btn");
}

renderAiProducts();

// 스타일 큐레이션 : 필터된 상품목록으로 이동

// 베스트 상품 : 슬라이드, 전체 상품 필터해서 베스트 상품만 출력
async function renderBestProducts() {
  const data = await fetchData("./data/products.json");
  if (!data) return;

  const bestProducts = data.products.filter((product) => product.isBest);

  const wrapper = document.querySelector('[data-render="best-products"]');
  if (!wrapper) return;

  wrapper.innerHTML = bestProducts
    .map((product) => `<div class="swiper-slide">${renderProductCard(product)}</div>`)
    .join("");

  // 베스트 상품 이미지 지연 로딩 적용
  initLazyLoadImages(wrapper);

  initProductSlider(".best-product-swiper", ".best-prev-btn", ".best-next-btn");
}

renderBestProducts();

// 신상품 : 전체 상품 필터해서 신상품 중 4개만 출력
async function renderNewProducts() {
  const data = await fetchData("./data/products.json");
  if (!data) return;

  const newProducts = data.products.filter((product) => product.isNew).slice(0, 4);

  const wrapper = document.querySelector('[data-render="new-products"]');
  if (!wrapper) return;

  wrapper.innerHTML = newProducts
    .map((product) => `<div class="swiper-slide">${renderProductCard(product)}</div>`)
    .join("");

  // 신상품 이미지 지연 로딩 적용
  initLazyLoadImages(wrapper);

  initProductSlider(".new-product-swiper", ".new-prev-btn", ".new-next-btn");
}

renderNewProducts();

// 인기 브랜드 : 필터된 상품목록으로 이동

// 안경원 찾기 : (후순위 추가기능) API활용

// 공지사항 : 탭, notics.json, events.json 파일 데이터 렌더링
initNoticeTab();

async function initNoticeTab() {
  // 공지사항/이벤트 패널 요소와 탭 버튼 가져오기
  const noticePanel = document.querySelector('[data-render="notice"]');
  const eventPanel = document.querySelector('[data-render="events"]');
  const tabButtons = document.querySelectorAll('.notice-section [role="tab"]');

  // notice.json, events.json 동시에 불러오기
  const [noticeData, eventData] = await Promise.all([
    fetchData("./data/notice.json"),
    fetchData("./data/events.json"),
  ]);

  // 공지사항 목록 렌더링 (isImportant 여부에 따라 "중요" / "공지" 뱃지 구분)
  if (noticePanel && noticeData) {
    noticePanel.innerHTML = noticeData.notices
      .map(
        (item) => `
      <article class="notice-item">
        <span class="badge badge--line">${item.isImportant ? "중요" : "공지"}</span>
        <a href="#">${item.title}</a>
        <time datetime="${item.createdAt}">${item.createdAt.replace(/-/g, ".")}</time>
      </article>`
      )
      .join("");
  }

  // 이벤트 목록 렌더링 (종료일 표시)
  if (eventPanel && eventData) {
    eventPanel.innerHTML = eventData.events
      .map(
        (item) => `
      <article class="notice-item">
        <span class="badge badge--line badge--line-long">이벤트</span>
        <a href="#">${item.title}</a>
        <time datetime="${item.endDate}">${item.endDate.replace(/-/g, ".")}</time>
      </article>`
      )
      .join("");
  }

  // 탭 버튼 클릭 시 aria-selected 토글 + 패널 hidden 속성으로 전환
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");

      tabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
      button.setAttribute("aria-selected", "true");

      [noticePanel, eventPanel].forEach((panel) => {
        panel.hidden = panel.id !== targetId;
      });
    });
  });
}
