// filter.js : 배정호 작성

// 상품 필터링
// products (전체 상품 데이터) 배열과 filterState (필터 조건)를 매개변수로 받음
// 카테고리, 브랜드, 가격, 얼굴형 등 조건에 맞는 상품만 filter
// 정렬은 sort.js에서 처리

// 받은 전체 상품 데이터에 대해서, 각 상품의 A조건을 만족하는 조건만 걸러서 새 배열을 생성
// 카테고리 별, 브랜드 별, 입력된 가격 범위 별, 정해진 가격 범위 별, 베스트상품만, 신상품만, 랜덤상품(AI추천 대체기능), 안경 모양별

// products = fetch된 전체 데이터 배열
// selectedFilters = 조건들 설정된 객체 (페이지에서 객체에 변수 입력, 인수로 전해받음)
// 객체 중 다중 선택이 가능한 속성의 값은 배열
// 최종적으로 필터링된 객체 반환
export function filterProducts(products, selectedFilters) {
  const filteredProducts = products.filter((product) => {
    // 데이터의 categories 값이 받은 조건 객체의 categories 값 중 하나라도 포함하고 있는 상품만 필터링
    // const matchCategory =

    // 카테고리 조건 비교
    // selectedFilters.categories를 받지 않았거나, (카테고리 필터 선택 안했으면 true)
    // selectedFilters.categories가 현재 상품 데이터의 category와 같은 값을 포함하고 있으면 true를 반환
    let matchCategory =
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(product.category);

    // 브랜드 조건 비교
    // selectedFilters.brands를 받지 않았거나, (브랜드 필터 선택 안했으면 true)
    // selectedFilters.brands가 현재 상품 데이터의 brand와 같은 값을 포함하고 있으면 true를 반환
    let matchBrand =
      selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand);

    // 모양 조건 비교
    // selectedFilters.shapes를 받지 않았거나, (모양 필터 선택 안했으면 true)
    // selectedFilters.shapes가 현재 상품 데이터의 eyeWearShape와 같은 값을 포함하고 있으면 true를 반환
    let matchShape =
      selectedFilters.shapes.length === 0 || selectedFilters.shapes.includes(product.eyeWearShape);

    // 베스트 조건 비교
    // selectedFilters.isBest를 받지 않았거나, (베스트 필터 선택 안했으면 true)
    // selectedFilters.isBest와 현재 상품 데이터의 isBest가 모두 true이면 true 반환
    // 베스트 상품 누르면 다른 필터 다 취소하고 isBest만 조건에 넣고 이 함수 돌리기
    let matchBest =
      !selectedFilters.isBest || (selectedFilters.isBest === true && product.isBest === true);

    // 신상품 조건 비교
    // selectedFilters.isNew를 받지 않았거나, (신상품 필터 선택 안했으면 true)
    // selectedFilters.isNew와 현재 상품 데이터의 isNew가 모두 true이면 true 반환
    // 신상품 누르면 다른 필터 다 취소하고 isNew만 조건에 넣고 이 함수 돌리기
    let matchNew =
      !selectedFilters.isNew || (selectedFilters.isNew === true && product.isNew === true);

    // 가격 조건 비교 : matchCustomPrice와 priceRange를 통틀어 최솟값/최댓값을 비교
    let matchPrice = true;
    // 커스텀 필터의 값을 사용하되 비었으면 범위 필터를 사용하고, 그것도 없으면 null을 반환
    let minPrice = selectedFilters.customPrice.min ?? selectedFilters.priceRange?.min ?? null;
    let maxPrice = selectedFilters.customPrice.max ?? selectedFilters.priceRange?.max ?? null;

    // 최소값/최대값이 있고 (null이 아니면), 현재 상품의 가격이 최소 가격보다 작으면 false, 현재 상품의 가격이 최대 가격보다 크면 false
    if (minPrice !== null && product.price < minPrice) {
      matchPrice = false;
    }

    if (maxPrice !== null && product.price > maxPrice) {
      matchPrice = false;
    }

    // matchCategory, matchBrand, matchShape, matchBest, matchNew, matchPrice 모두 true인 상품이면 반환
    return matchCategory && matchBrand && matchShape && matchBest && matchNew && matchPrice;
  });

  // 최종적으로 100개 복합 필터링한 객체를 반환
  return filteredProducts;
}
