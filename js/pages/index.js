import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { openCloseHamburger, renderHamburger } from "../modules/hamburgerNav.js";
import { fetchData } from "../utils/fetchData.js";
import { renderProductCard } from "../modules/renderProductCard.js";
import { initHeroSlider, initProductSlider } from "../modules/carousel.js";
import { initLazyLoadImages } from "../utils/lazyLoadImage.js";
import { renderChatting, openChattingModal, closeChattingModal } from "../modules/fixedBtn.js";
import { addCartItem } from "../utils/localStorage.js";
import { showToast } from "../modules/toast.js";

// 메인 페이지 기능
renderHeader("");
renderFooter();

// 문의 모달 렌더링
renderChatting();
const fixedBtn = document.querySelector(".fixed-chat-button");
openChattingModal(fixedBtn);
// 문의 모달창의 닫기 버튼을 누르면 문의 모달창을 닫는 함수
closeChattingModal();

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

// 스타일 큐레이션 : 각 스타일 기준으로 대표 상품 이미지를 카드 배경에 적용
async function renderCurationImages() {
  const data = await fetchData("./data/products.json");
  if (!data) return;

  const products = data.products;

  // 큐레이션 스타일별 상품 선별 기준 (미니멀&클래식, 스트리트&볼드, 빈티지&레트로, 심플&모던 순서에 대응)
  const curationFilters = [
    (p) => p.eyeWearShape === "Round", // 미니멀 & 클래식 : 라운드 메탈 프레임
    (p) => p.eyeWearShape === "Browline", // 스트리트 & 볼드 : 브라우라인 볼드 프레임
    (p) => p.eyeWearShape === "Cat-eye", // 빈티지 & 레트로 : 캣아이 레트로 프레임
    (p) => p.eyeWearShape === "Rimless", // 심플 & 모던 : 무테 경량 프레임
  ];

  const curationCards = document.querySelectorAll(".curation-card");

  // 카드마다 필터에 맞는 첫 번째 상품의 썸네일을 배경 이미지로 설정
  curationCards.forEach((card, i) => {
    const matched = products.find(curationFilters[i]);
    if (!matched) return;

    // ::before 의 CSS 커스텀 프로퍼티에 이미지 URL 전달 (hover 확대 애니메이션 대상)
    card.style.setProperty("--curation-bg", `url('${matched.thumbnail}')`);
  });
}

renderCurationImages();

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

// 브랜드 비디오 재생/정지 토글
function initBrandVideo() {
  const video = document.querySelector(".brand-video");
  const playBtn = document.querySelector(".video-play-btn");
  const icon = document.querySelector(".video-btn-icon");

  if (!video || !playBtn || !icon) return;

  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      icon.textContent = "stop";
      playBtn.setAttribute("aria-label", "영상 정지");
    } else {
      video.pause();
      icon.textContent = "play_arrow";
      playBtn.setAttribute("aria-label", "영상 재생");
    }
  });

  video.addEventListener("ended", () => {
    icon.textContent = "play_arrow";
    playBtn.setAttribute("aria-label", "영상 재생");
  });
}

initBrandVideo();

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

// 문의 모달 렌더링
renderChatting();

// 문의 고정버튼을 누르면 문의 모달창을 여는 함수
openChattingModal(fixedBtn);

// 문의 모달창의 닫기 버튼을 누르면 문의 모달창을 닫는 함수
closeChattingModal();
