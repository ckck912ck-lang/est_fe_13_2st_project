// renderProductCard : 배정호 작업

// 상품 데이터 1개를 매개변수로 받아 상품 카드 HTML 생성
// 베스트/뉴/할인율 라벨을 조건에 따라 표시
// 상품 상세 링크는 product-detail.html?id=${product.id} 형태로 연결
// 장바구니 버튼에는 data-id를 부여
// 장바구니 저장 기능은 이 파일에서 처리하지 않고 페이지 JS에서 localStorage와 cartActions를 호출

export function renderProductCard(product) {
  return `
            <article class="product-card">
              <a
                href="product-detail.html?id=${product.id}"
                class="product-image-link"
                aria-label="${product.brand}${product.title} 상품 상세 보기"
              >
                <img
                  src="${product.thumbnail}"
                  alt="${product.brand}${product.title}"
                  class="product-image"
                />

                <div class="badge-box">
                  ${product.isBest ? "<span class='product-badge product-badge-best'>BEST</span>" : ""}
                  ${product.isNew ? "<span class='product-badge product-badge-new'>NEW</span>" : ""}
                </div>
                  ${product.discountRate > 0 ? "<span class='product-badge product-discount'>" + product.discountRate + "%</span>" : ""}
                  
                <button
                  type="button"
                  class="cart-add"
                  aria-label="${product.title} 장바구니 담기"
                  data-action="add-cart"
                  data-product-id="${product.id}">
                    <span class="material-icons">local_mall</span>
                </button>
              </a>

              <div class="product-info">
                <div class="product-header">
                  <p class="product-brand">${product.brand}</p>

                  <h3 class="product-title">
                    <a href="product-detail.html?id=${product.id}">${product.title}</a>
                  </h3>
                </div>

                <p class="product-rating" aria-label="평점 ${product.rating && product.rating !== 0 ? product.rating.toFixed(1) : "--"}점, 리뷰 ${product.reviewCount}개">
                  <span aria-hidden="true" class="rating-star material-icons">star</span>
                  <span>${product.rating}</span>
                  <span>(${product.reviewCount})</span>
                </p>

                <p class="product-price">
                  <strong>${product.price.toLocaleString()}원</strong>
                  <del>${product.originalPrice.toLocaleString()}</del>
                  <span class="product-sale">-${product.discountRate}%</span>
                </p>
              </div>
            </article>
  `;
}
