// 상품 정렬
// products(전체 상품 데이터) 배열과 sortType(정렬 조건)을 매개변수로 받음
// 가격순, 최신순, 리뷰순 등의 기준으로 정렬된 새 배열 반환
// 원본 배열 변경을 피하기 위해 함수 내에서 변수에 할당해 복사한 뒤 정렬 ()

// 상품 목록 정렬
// 매개변수:
// - products: 정렬할 상품 배열
// - sortType: 정렬 기준 문자열
//   - "basic": 기본순
//   - "popular": 별점 높은 순
//   - "like": 좋아요 많은 순
//   - "price-low": 가격 낮은 순
//   - "price-high": 가격 높은 순
//   - "name": 상품명 가나다순
// 반환값:
// - sortType 기준으로 정렬된 새 상품 배열
// 동작:
// - 원본 products 배열을 직접 수정하지 않기 위해 복사본을 만듦
// - sortType 값에 따라 복사본 배열을 정렬해서 반환함
// - sortType 값이 없거나 맞지 않으면 기본순으로 반환함
export function sortProducts(products, sortType) {
  const copiedProducts = [...products];

  switch (sortType) {
    case "rating-high":
      return copiedProducts.sort((a, b) => {
        return (b.rating || 0) - (a.rating || 0);
      });

    case "like-high":
      return copiedProducts.sort((a, b) => {
        return (b.likeCount || 0) - (a.likeCount || 0);
      });

    case "discount-high":
      return copiedProducts.sort((a, b) => {
        return (b.discountRate || 0) - (a.discountRate || 0);
      });

    case "price-low":
      return copiedProducts.sort((a, b) => {
        return (a.price || 0) - (b.price || 0);
      });

    case "price-high":
      return copiedProducts.sort((a, b) => {
        return (b.price || 0) - (a.price || 0);
      });

    case "name":
      return copiedProducts.sort((a, b) => {
        return (a.title || "").localeCompare(b.title || "", "ko-KR");
      });

    case "basic":
    default:
      return copiedProducts;
  }
}
