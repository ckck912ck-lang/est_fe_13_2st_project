import { renderHeader } from "../modules/renderHeader.js";
import { renderFooter } from "../modules/renderFooter.js";
import { openCloseHamburger, renderHamburger } from "../modules/hamburgerNav.js";
import { renderChatting, openChattingModal, closeChattingModal } from "../modules/fixedBtn.js";

const fixedBtn = document.querySelector(".fixed-chat-button");

// 공용 모듈 불러오기
renderHeader("C");
renderFooter();

// 로그인 기능
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector('[data-login-input="email"]');
const passwordInput = document.querySelector('[data-login-input="password"]');
const emailMessage = document.querySelector('[data-login-message="email"]');
const passwordMessage = document.querySelector('[data-login-message="password"]');
const passwordToggleButton = document.querySelector('[data-action="toggle-password"]');

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// 이메일 형식 피드백
function validateEmail() {
  const value = emailInput.value.trim();

  if (!value) {
    emailMessage.textContent = "이메일을 입력해 주세요.";
    return false;
  }

  if (!isValidEmail(value)) {
    emailMessage.textContent = "이메일 형식을 확인해 주세요.";
    return false;
  }

  emailMessage.textContent = "";
  return true;
}

// 비밀번호 형식 피드백
function validatePassword() {
  const value = passwordInput.value;

  if (!value) {
    passwordMessage.textContent = "비밀번호를 입력해 주세요.";
    return false;
  }

  if (value.length < 8) {
    passwordMessage.textContent = "비밀번호는 8자 이상 입력해 주세요.";
    return false;
  }

  passwordMessage.textContent = "";
  return true;
}

// 비밀번호 보기/점으로 표시
function togglePasswordVisibility() {
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  passwordToggleButton.setAttribute("aria-pressed", String(isPassword));
  passwordToggleButton.setAttribute(
    "aria-label",
    isPassword ? "비밀번호 숨기기" : "비밀번호 보기"
  );

  const icon = passwordToggleButton.querySelector(".material-icons");
  if (icon) {
    icon.textContent = isPassword ? "visibility_off" : "visibility";
  }
}

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
passwordToggleButton.addEventListener("click", togglePasswordVisibility);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (!isEmailValid || !isPasswordValid) return;

  // 백엔드 연동 전 임시 처리
  alert("로그인 API 연동이 필요합니다.");
});

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
