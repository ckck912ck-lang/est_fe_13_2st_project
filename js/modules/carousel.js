// carousel.js : Swiper 라이브러리 모듈
// Swiper는 각 페이지 HTML에서 CDN <script> 태그로 전역 로드됨

// 히어로 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O
// selector : .swiper 컨테이너 선택자 (내부에 .swiper-button-prev, .swiper-button-next, .swiper-pagination 필요)
export function initHeroSlider(selector) {
  const container = document.querySelector(selector);
  if (!container || !window.Swiper) return null;

  return new window.Swiper(selector, {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: container.querySelector(".swiper-pagination"),
      clickable: true,
    },
    navigation: {
      prevEl: container.querySelector(".swiper-button-prev"),
      nextEl: container.querySelector(".swiper-button-next"),
    },
  });
}

// 상품 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 X
// selector : .swiper 컨테이너 선택자
// prevSelector, nextSelector : 이전/다음 버튼 선택자 (Swiper 예약 클래스 충돌 방지를 위해 커스텀 클래스 권장)
export function initProductSlider(
  selector,
  prevSelector = ".swiper-button-prev",
  nextSelector = ".swiper-button-next"
) {
  const container = document.querySelector(selector);
  if (!container || !window.Swiper) return null;

  return new window.Swiper(selector, {
    slidesPerView: 2.2,
    spaceBetween: 8,
    navigation: {
      prevEl: container.querySelector(prevSelector),
      nextEl: container.querySelector(nextSelector),
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 28,
      },
    },
  });
}

// 상품 상세

// 상품 상세 메인 이미지 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O
// 상품 상세 썸네일 슬라이더 : 상품 이미지 개수만큼 썸네일 슬라이드 생성, 상품 데이터를 받아서 각 썸네일 이미지에 연결
// 썸네일 슬라이더와 메인 이미지 슬라이더를 연동 - 메인 이미지 슬라이더를 현재 선택된 썸네일 번호로 이동
export function initProductDetailCarousel(mainSelector, thumbSelector) {
  const productGalleryMain = document.querySelector(mainSelector);
  const productGalleryThumb = document.querySelector(thumbSelector);

  if (!productGalleryMain || !productGalleryThumb || !window.Swiper) return;

  const productThumbSwiper = new window.Swiper(productGalleryThumb, {
    slidesPerView: "auto",
    spaceBetween: 10,
    freeMode: true,
    watchSlidesProgress: true,
    scrollbar: {
      el: productGalleryThumb.querySelector(".product-gallery-thumb-scrollbar"),
      draggable: true,
    },
  });

  new window.Swiper(productGalleryMain, {
    slidesPerView: 1,
    spaceBetween: 0,

    navigation: {
      prevEl: "#product-gallery-prev",
      nextEl: "#product-gallery-next",
    },

    pagination: {
      el: ".product-gallery-dots",
      clickable: true,
    },

    thumbs: {
      swiper: productThumbSwiper,
    },
  });
}
