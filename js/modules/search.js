// 폼에 입력된 키워드가 포함된 상품들만 필터링된 상품목록 페이지로 이동 (필터 링크와 동일 기능)

export function initSearch() {
  const dialog = document.getElementById('search-modal');
  if (!dialog) return;

  const form = dialog.querySelector('.search-modal__form');
  const input = dialog.querySelector('.search-modal__form__input');

  function navigateToSearch(keyword) {
    if (!keyword.trim()) return;
    dialog.close();
    window.location.href = `product-list.html?keyword=${encodeURIComponent(keyword.trim())}`;
  }

  // 폼 제출 → 키워드로 상품 목록 이동
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    navigateToSearch(input.value);
  });

  // 닫기 버튼
  dialog.querySelector('[data-action="close-search"]').addEventListener('click', () => {
    dialog.close();
  });

  // 인기 검색어 클릭
  dialog.querySelectorAll('.keyword-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      navigateToSearch(pill.dataset.keyword);
    });
  });

  // 검색 열기 트리거 (헤더 검색 버튼, 하단 네비 검색 버튼)
  document.querySelectorAll('[data-action="open-search"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = '';
      dialog.showModal();
      input.focus();
    });
  });
}
