// swiperjs 적용 (import해서 특정 class마다 적용하기)

// 히어로 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O

// 상품 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 X

// 상품 목록 필터 슬라이더

// 상품 상세

// 상품 상세 메인 이미지 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O

// 상품 상세 썸네일 슬라이더 : 상품 이미지 개수만큼 썸네일 슬라이드 생성, 상품 데이터를 받아서 각 썸네일 이미지에 연결

// 썸네일 슬라이더와 메인 이미지 슬라이더를 연동 - 메인 이미지 슬라이더를 현재 선택된 썸네일 번호로 이동
export function initProductDetailCarousel() {
  const productGalleryMain = document.querySelector(".product-gallery-main-swiper");
  const productGalleryThumb = document.querySelector(".product-gallery-thumb-swiper");

  if (!productGalleryMain || !productGalleryThumb || !window.Swiper) return;

  const productThumbSwiper = new window.Swiper(productGalleryThumb, {
    slidesPerView: "auto",
    spaceBetween: 10,
    watchSlidesProgress: true,
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
