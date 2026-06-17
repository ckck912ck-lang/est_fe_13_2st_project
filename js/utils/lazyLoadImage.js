// 이미지 지연 로딩 유틸리티
// data-src 속성을 가진 이미지를 IntersectionObserver로 감지해 뷰포트 진입 시 src로 전환

// 이미지가 뷰포트에 진입하면 data-src 값을 src로 이동하고 관찰 종료
const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const img = entry.target;
    const src = img.dataset.src;

    if (src) {
      img.src = src;
      img.removeAttribute("data-src");
    }

    observer.unobserve(img);
  });
};

// container 내 data-src 속성을 가진 img 요소에 IntersectionObserver 적용
// rootMargin으로 뷰포트 진입 200px 전에 미리 로드
export const initLazyLoadImages = (container = document) => {
  const images = container.querySelectorAll("img[data-src]");

  if (!images.length) return;

  const observer = new IntersectionObserver(onIntersect, {
    rootMargin: "0px 0px 200px 0px",
  });

  images.forEach((img) => observer.observe(img));
};
