import { renderTestimonials } from "../modules/testimonial.js";
import { initTabs } from "../modules/tabs.js";
import { initProductDetailCarousel } from "../modules/carousel.js";
// 상품 상세 기능

// 상품 이미지 : 현재 선택한 썸네일에 맞는 큰 이미지 띄우기, 슬라이드
// 썸네일 : 해당 상품의 썸네일 전체 개수 감지해서 가로스크롤 (swiperjs 찾아볼것)

// 상품정보 : 데이터 렌더링, 별점에 따라 별 개수 조정, 장바구니 담기

// 후기 : 데이터 렌더링

// 비슷한 상품 : 슬라이드
const reviews = [
  {
    author: "김*연",
    date: "2026-01-15",
    rating: 5,
    content:
      "가벼워서 하루종일 써도 불편하지 않아요. 티타늄 소재라 그런지 정말 가볍고 코 위에 자국도 덜 남아요.",
  },
  {
    author: "이*준",
    date: "2026-01-10",
    rating: 5,
    content: "디자인이 예상보다 훨씬 깔끔하고 고급스럽습니다. 색상은 실제로 보면 더 멋있어요.",
  },
  {
    author: "박*희",
    date: "2025-12-28",
    rating: 4.5,
    content:
      "AI 가상피팅으로 미리 착용해보고 구매했는데 실제로 받아보니 딱 제가 생각한 스타일이었어요.",
  },
  {
    author: "최*수",
    date: "2025-12-20",
    rating: 5,
    content:
      "파트너 안경원에서 렌즈까지 맞춰서 쓰고 있는데 너무 만족스러워요. 배송도 빠르고 포장도 고급스러웠습니다.",
  },
];

const reviewList = document.querySelector('[data-render="product-review-list"]');
const productTabs = document.querySelector(".product-detail-tabs");

initProductDetailCarousel();

if (reviewList) {
  renderTestimonials(reviews, reviewList, 4);
}

if (productTabs) {
  initTabs(productTabs);
}
