// signup.js : 배정호 작성

import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { initSearch } from "../modules/search.js";
import { openCloseHamburger, renderHamburger } from "../modules/hamburgerNav.js";
import { renderChatting, openChattingModal, closeChattingModal } from "../modules/fixedBtn.js";
import { initSignupValidation } from "../modules/formValidation.js";

const fixedBtn = document.querySelector(".fixed-chat-button");

// ===========================
// 회원가입 기능
// ===========================

// ===========================
// 실시간 피드백
// ===========================

// 비밀번호랑 비밀번호 확인이 다르면 피드백
// 인수로 비밀번호/비밀번호 확인의 value를 넣어서 함수 실행
const signupForm = document.querySelector(".signup-form");
initSignupValidation();

// ===========================
// 공통 기능
// ===========================

// 공용 모듈 불러오기
renderHeader("");
renderFooter();
initSearch();

// 문의 모달 렌더링
renderChatting();

// 문의 고정버튼을 누르면 문의 모달창을 여는 함수
openChattingModal(fixedBtn);

// 문의 모달창의 닫기 버튼을 누르면 문의 모달창을 닫는 함수
closeChattingModal();

// 햄버거 렌더링
const hamburgerMenu = document.querySelector(".hamburger-menu");
renderHamburger(hamburgerMenu);

// 햄버거 열기
const openHamburger = document.querySelector(".hamburger-btn-open");
openCloseHamburger(openHamburger);
