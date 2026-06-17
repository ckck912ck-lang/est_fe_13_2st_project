// swiperjs 적용 (import해서 특정 class마다 적용하기)

// 히어로 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O

// 상품 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 X

// 상품 목록 필터 슬라이더

// 상품 상세

// 상품 상세 메인 이미지 슬라이더 : 좌우 슬라이더, 좌우버튼 직접 구현, 페이지네이션 O

// 상품 상세 썸네일 슬라이더 : 상품 이미지 개수만큼 썸네일 슬라이드 생성, 상품 데이터를 받아서 각 썸네일 이미지에 연결

// 썸네일 슬라이더와 메인 이미지 슬라이더를 연동 - 메인 이미지 슬라이더를 현재 선택된 썸네일 번호로 이동
export function initProductDetailCarousel(carousel) {
  if (!carousel) return;

  const main = carousel.querySelector("[data-product-main]");
  const thumbnails = carousel.querySelectorAll("[data-product-thumbnail]");
  const prevButton = carousel.querySelector("[data-product-prev]");
  const nextButton = carousel.querySelector("[data-product-next]");
  const dots = carousel.querySelectorAll("[data-product-dot]");

  if (!main || thumbnails.length === 0) return;

  let currentIndex = 0;

  const updateCarousel = (index) => {
    currentIndex = index;

    const currentThumbnail = thumbnails[currentIndex];
    const galleryType = currentThumbnail.dataset.galleryType;

    if (!galleryType) return;

    // 메인 이미지 모양 변경
    main.classList.remove(
      "product-gallery__main--angle",
      "product-gallery__main--clear",
      "product-gallery__main--bold"
    );

    main.classList.add(`product-gallery__main--${galleryType}`);

    // 썸네일 활성화
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      const isActive = thumbnailIndex === currentIndex;

      thumbnail.classList.toggle("is-active", isActive);
      thumbnail.setAttribute("aria-selected", isActive);
    });

    // 페이지네이션 dot 활성화
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;

      dot.classList.toggle("is-active", isActive);
    });
  };

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
      updateCarousel(index);
    });
  });

  prevButton?.addEventListener("click", () => {
    const prevIndex = currentIndex === 0 ? thumbnails.length - 1 : currentIndex - 1;

    updateCarousel(prevIndex);
  });

  nextButton?.addEventListener("click", () => {
    const nextIndex = currentIndex === thumbnails.length - 1 ? 0 : currentIndex + 1;

    updateCarousel(nextIndex);
  });

  updateCarousel(0);
}
