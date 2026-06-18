// 폼에 입력된 키워드가 포함된 상품들만 필터링된 상품목록 페이지로 이동 (필터 링크와 동일 기능)

// 검색 모달 HTML 생성 (모든 페이지에서 동일한 구조 보장)
function getSearchModalHTML() {
  return `
    <dialog class="modal search-modal" id="search-modal" aria-label="검색">
      <form class="search-modal__form" role="search" aria-label="상품 검색">
        <div class="inner">
          <div class="search-modal__form-row">
            <span class="material-icons search-modal__form__icon" aria-hidden="true">search</span>
            <input
              class="search-modal__form__input"
              type="search"
              name="keyword"
              placeholder="브랜드, 상품명 검색..."
              autocomplete="off"
              aria-label="검색어 입력"
            />
            <button
              type="button"
              class="icon-button search-modal__form__close"
              aria-label="검색 닫기"
              data-action="close-search"
            >
              <span class="material-icons" aria-hidden="true">close</span>
            </button>
          </div>
        </div>
      </form>
      <section class="popular-keywords" aria-labelledby="popular-keywords-title">
        <div class="inner">
          <h2 id="popular-keywords-title" class="popular-keywords__title">인기 검색어</h2>
          <ul class="popular-keywords__list" aria-label="인기 검색어 목록">
            <li><button type="button" class="keyword-pill" data-keyword="CARIN">CARIN</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="GENTLE MONSTER">GENTLE MONSTER</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="라운드">라운드</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="티타늄">티타늄</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="웰링턴">웰링턴</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="가벼운 안경">가벼운 안경</button></li>
            <li><button type="button" class="keyword-pill" data-keyword="얼굴형 추천">얼굴형 추천</button></li>
          </ul>
        </div>
      </section>
    </dialog>
  `;
}

export function initSearch() {
  // 기존 모달 제거 후 표준 구조로 교체 (페이지마다 다른 구조 문제 해결)
  const existing = document.getElementById("search-modal");
  if (existing) existing.remove();
  document.body.insertAdjacentHTML("beforeend", getSearchModalHTML());

  const dialog = document.getElementById("search-modal");
  const form = dialog.querySelector(".search-modal__form");
  const input = dialog.querySelector(".search-modal__form__input");

  function navigateToSearch(keyword) {
    if (!keyword.trim()) return;
    dialog.close();
    window.location.href = `product-list.html?keyword=${encodeURIComponent(keyword.trim())}`;
  }

  // 폼 제출 → 키워드로 상품 목록 이동
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    navigateToSearch(input.value);
  });

  // 닫기 버튼
  dialog.querySelector('[data-action="close-search"]').addEventListener("click", () => {
    dialog.close();
  });

  // 인기 검색어 클릭
  dialog.querySelectorAll(".keyword-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      navigateToSearch(pill.dataset.keyword);
    });
  });

  // 헤더 검색 버튼에 data-action 추가
  document.querySelectorAll(".header-btn.search").forEach((btn) => {
    btn.setAttribute("data-action", "open-search");
  });

  // 검색 열기 트리거 (헤더 검색 버튼, 하단 네비 검색 버튼)
  document.querySelectorAll('[data-action="open-search"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      input.value = "";
      dialog.showModal();
      input.focus();
    });
  });
}
