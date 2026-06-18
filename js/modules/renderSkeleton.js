// 스켈레톤 UI 생성 : 로딩하는 동안만 빈 카드 n개 생성, 로딩 끝나면 삭제

// 상품 카드 스켈레톤 1개 HTML 생성
function createSkeletonCard() {
  return `
    <article class="product-card skeleton-card" aria-hidden="true">
      <div class="skeleton skeleton-image"></div>
      <div class="product-info">
        <div class="skeleton skeleton-brand"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-rating"></div>
        <div class="skeleton skeleton-price"></div>
      </div>
    </article>
  `;
}

// container에 스켈레톤 카드 count개 렌더링
export function showSkeleton(container, count = 12) {
  if (!container) return;
  container.innerHTML = Array.from({ length: count }, createSkeletonCard).join("");
}

// container의 스켈레톤 카드 삭제
export function hideSkeleton(container) {
  if (!container) return;
  container.querySelectorAll(".skeleton-card").forEach((el) => el.remove());
}
