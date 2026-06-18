// renderFooter : 배정호 작업

import { renderCartBadge } from "./renderCartBadge.js";

renderCartBadge();

const footer = document.querySelector("footer");

function getFooter() {
  return `
      <div class="footer-container">
        <div class="footer-top">
          <!-- 브랜드 영역 -->
          <section class="footer-brand">
            <h2 class="footer-logo">
              <a href="/">ROUNZ</a>
            </h2>

            <p class="footer-description">
              AI 기반 가상피팅과 얼굴형 분석으로 나에게 꼭 맞는 안경을 찾아드립니다.
            </p>

            <div class="footer-social">
              <a href="#" aria-label="인스타그램">
                <span class="material-icons">photo_camera</span>
              </a>

              <a href="#" aria-label="유튜브">
                <span class="material-icons">smart_display</span>
              </a>
            </div>
          </section>

          <!-- 서비스 -->
          <section class="footer-section service">
            <h3 class="footer-title">서비스</h3>

            <ul class="footer-service-list">
              <li>
                <a href="#"> AI 얼굴형 분석 </a>
              </li>

              <li>
                <a href="#"> 가상 피팅 </a>
              </li>

              <li>
                <a href="tel:15880000"> 안경 추천 </a>
              </li>

              <li>
                <a href="mailto:help@rounz.com"> 파트너 안경원 </a>
              </li>
            </ul>
          </section>

          <!-- 매장 안내 -->
          <section class="footer-section store">
            <h3 class="footer-title">매장 안내</h3>

            <ul class="footer-list">
              <li>
                <a href="#">
                  <span class="material-icons">location_on</span>
                  플래그십 스토어
                </a>
              </li>

              <li>
                <a href="#">
                  <span class="material-icons">location_on</span>
                  파트너 안경원 찾기
                </a>
              </li>

              <li>
                <a href="tel:15880000">
                  <span class="material-icons">call</span>
                  1588-0000
                </a>
              </li>

              <li>
                <a href="mailto:help@rounz.com">
                  <span class="material-icons">mail</span>
                  help@rounz.com
                </a>
              </li>
            </ul>
          </section>

          <!-- 고객 지원 -->
          <section class="footer-section customer">
            <h3 class="footer-title">고객 지원</h3>

            <nav aria-label="푸터 고객 지원 메뉴">
              <ul class="footer-links">
                <li><a href="#">공지사항</a></li>
                <li><a href="#">자주 묻는 질문</a></li>
                <li><a href="#">교환/반품 안내</a></li>
                <li><a href="#">이벤트</a></li>
                <li><a href="#">개인정보처리방침</a></li>
                <li><a href="#">이용약관</a></li>
              </ul>
            </nav>
          </section>
        </div>

        <div class="footer-bottom">
          <!-- 회사 정보 -->
          <address class="footer-company">
            <div class="text-box">
              <p>주식회사 라운즈 | 대표 : 홍길동</p>
              <p>사업자등록번호 : 123-45-67890</p>
            </div>
            <div class="text-box">
              <p>통신판매업신고 : 2023-서울강남-0001</p>
              <p>주소 : 서울특별시 강남구 테헤란로 123</p>
            </div>
          </address>

          <!-- 저작권 -->
          <small class="footer-copyright"> © 2025 ROUNZ. All rights reserved. </small>
        </div>
      </div>
  `;
}

export function renderFooter() {
  let html = "";

  html = getFooter();
  footer.innerHTML = html;
}
