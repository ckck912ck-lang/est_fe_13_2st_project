// hamburgerNav.js : 배정호 작업

// 클래스 토글 is-open 추가/제거

// 매개변수 : 구현 대상 컨테이너
export function openCloseHamburger(container) {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeHamburgerBtn = document.querySelector(".hamburger-menu-close-button");
  container.addEventListener("click", (e) => {
    e.preventDefault();
    hamburgerMenu.classList.add("is-open");
  });

  console.log(closeHamburgerBtn);

  closeHamburgerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hamburgerMenu.classList.remove("is-open");
  });
}

// 매개변수로 HTML을 요소를 받아서 그 요소 안에 HTML을 넣어줌
export function renderHamburger(container) {
  let html = "";
  html = hamburgerHTML();
  container.innerHTML = html;
}

// 햄버거 렌더
function hamburgerHTML() {
  return `
      <!-- 햄버거내비 (모듈) -->
        <div class="hamburger-menu-header">
          <strong class="hamburger-menu-logo">ROUNZ</strong>

          <button
            type="button"
            class="hamburger-menu-close-button"
            aria-label="전체 메뉴 닫기"
            data-action="close-menu"
          >
            <span class="material-icons" aria-hidden="true">clear</span>
          </button>
        </div>

        <nav class="hamburger-menu-quick" aria-label="빠른 메뉴">
          <a href="index.html">
            <span class="material-icons" aria-hidden="true">home</span>
            홈
          </a>
          <a href="product-list.html">
            <span class="material-icons" aria-hidden="true">apps</span>
            상품
          </a>
          <a href="cart.html">
            <span class="material-icons" aria-hidden="true">shopping_bag</span>
            장바구니 (2)
          </a>
          <a href="login.html">
            <span class="material-icons" aria-hidden="true">person</span>
            로그인
          </a>
        </nav>

        <nav class="hamburger-menu-section" aria-label="카테고리">
          <h2>카테고리</h2>
          <a href="product-list.html">전체 상품</a>
          <a href="product-list.html?category=glasses">안경</a>
          <a href="product-list.html?category=sunglasses">선글라스</a>
          <a href="product-list.html?category=clip-on">클립온</a>
          <a href="product-list.html?category=smart">스마트 안경</a>
        </nav>

        <nav class="hamburger-menu-section" aria-label="브랜드">
          <h2>브랜드</h2>
          <a href="product-list.html?brand=carin">CARIN</a>
          <a href="product-list.html?brand=gentle-monster">GENTLE MONSTER</a>
          <a href="product-list.html?brand=lindberg">LINDBERG</a>
          <a href="product-list.html?brand=ray-ban">RAY-BAN</a>
          <a href="product-list.html?brand=mykita">MYKITA</a>
          <a href="product-list.html?brand=moscot">MOSCOT</a>
        </nav>

        <div class="hamburger-menu-service">
          <h2>서비스</h2>

          <a href="#partner-store">
            <span class="material-icons" aria-hidden="true">location_on</span>
            파트너 안경원 찾기
          </a>

          <a href="tel:15880000">
            <span class="material-icons" aria-hidden="true">call</span>
            고객센터 1588-0000
          </a>
        </div>

        <div class="hamburger-menu-footer">
          <div class="hamburger-menu-sns">
            <a href="#" aria-label="인스타그램">
              <span class="material-icons" aria-hidden="true">photo_camera</span>
            </a>
            <a href="#" aria-label="유튜브">
              <span class="material-icons" aria-hidden="true">smart_display</span>
            </a>
          </div>

          <button type="button" class="hamburger-menu-dark-button">
            <span class="material-icons" aria-hidden="true">dark_mode</span>
            다크 모드
          </button>
        </div>
`;
}
