// formValidation.js : 배정호 작업

// 로그인/회원가입 검사기능
// 입력 중(form이 change되면) 즉시 피드백
// 이메일 형식 맞는지, 비밀번호 길이/형식 맞는지, 비밀번호 = 비밀번호 확인인지
// 비밀번호 입력 폼 우측 눈 버튼 누르면 비밀번호 보기/숨기기(active 클래스 추가/제거)

// =======================================
// 패스워드/확인 비교, 클래스 부여하는 함수
// =======================================

// 매개변수로 form 전체를 받음
// form의 비밀번호와 비밀번호 확인의 value를 비교해서 피드백을 줌
export function compareInputValue(form) {
  // 패스워드와 패스워드 확인 인풋
  const passwordInput = form.querySelector("#signup-password");
  const passwordConfirmInput = form.querySelector("#signup-password-confirm");
  // 각 인풋의 가장 가까운 부모 라벨
  const passwordField = passwordInput.closest(".signup-field");
  const confirmField = passwordConfirmInput.closest(".signup-field");
  // 각 라벨의 피드백 메시지를 찾아 변수에 저장
  const passwordMessage = passwordField.querySelector(".field-message");
  const confirmMessage = confirmField.querySelector(".field-message");

  // 두 인풋 중 하나라도 없으면 가드
  if (!passwordInput || !passwordConfirmInput) return;

  // 각 필드에 메시지가 없으면 가드
  if (!passwordField || !passwordMessage) return;
  if (!confirmField || !confirmMessage) return;

  function validatePasswordConfirm() {
    // 비밀번호와 비밀번호 확인에서 error, success 클래스와 피드백 메시지를 모두 제거
    passwordField.classList.remove("is-error", "is-success");
    confirmField.classList.remove("is-error", "is-success");
    passwordMessage.textContent = "";
    confirmMessage.textContent = "";

    // 비밀번호 확인에 입력값이 없으면 가드
    if (!passwordConfirmInput.value) return;

    // 두 인풋에 입력된 value가 같으면 각 필드에 is-success 클래스 추가, 각 피드백 메시지 입력
    if (passwordInput.value === passwordConfirmInput.value) {
      passwordField.classList.add("is-success");
      confirmField.classList.add("is-success");
      passwordMessage.textContent = "비밀번호가 일치합니다.";
      confirmMessage.textContent = "비밀번호가 일치합니다.";
      return;
    }

    // 두 인풋에 입력된 value가 다르면 각 필드에 is-error 클래스 추가, 각 피드백 메시지 입력
    passwordField.classList.add("is-error");
    confirmField.classList.add("is-error");
    passwordMessage.textContent = "비밀번호가 일치하지 않습니다.";
    confirmMessage.textContent = "비밀번호가 일치하지 않습니다.";
  }

  // 각 인풋에 입력이 진행될 때마다 함수 주소를 이벤트에 전달해서 실행
  passwordInput.addEventListener("input", validatePasswordConfirm);
  passwordConfirmInput.addEventListener("input", validatePasswordConfirm);
}

// =======================================
// 비밀번호 visibility 토글 함수
// =======================================

// 비밀번호 보기/점으로 표시
export function passwordVisibility(toggleButtons) {
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input");
      const icon = button.querySelector(".material-icons");

      if (input.type === "password") {
        input.type = "text";
        icon.textContent = "visibility_off";
      } else {
        input.type = "password";
        icon.textContent = "visibility";
      }
    });
  });
}

// 인풋 밸류 형식 확인

// formValidation.js

// 성공/실패 UI 표시
function updateFieldState(input, isValid, successMessage, errorMessage) {
  const field = input.closest(".signup-field");
  if (!field) return;

  const message = field.querySelector(".field-message");

  field.classList.remove("is-success", "is-error");

  if (!input.value.trim()) {
    if (message) message.textContent = "";
    return false;
  }

  if (isValid) {
    field.classList.add("is-success");
    if (message) message.textContent = successMessage;
    return true;
  }

  field.classList.add("is-error");
  if (message) message.textContent = errorMessage;
  return false;
}

// 이메일 검사
function validateEmail(value) {
  const email = value.trim();
  const atIndex = email.indexOf("@");

  return email.includes("@") && email.includes(".") && atIndex >= 3;
}

// 비밀번호 검사
function validatePassword(value) {
  return value.length >= 8;
}

// 이름 검사
function validateName(value) {
  return value.trim().length >= 2;
}

// 휴대폰 번호 검사
function validatePhone(value) {
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  return phoneRegex.test(value.trim());
}

// 비밀번호 확인 검사
function validatePasswordConfirm(passwordInput, confirmInput) {
  const isValid = passwordInput.value === confirmInput.value;

  return updateFieldState(
    confirmInput,
    isValid,
    "비밀번호가 일치합니다.",
    "비밀번호가 일치하지 않습니다."
  );
}

// 회원가입 검사 초기화
export function initSignupValidation() {
  const form = document.querySelector(".signup-form");
  if (!form) return;

  const emailInput = form.querySelector("#signup-email");
  const passwordInput = form.querySelector("#signup-password");
  const passwordConfirmInput = form.querySelector("#signup-password-confirm");
  const nameInput = form.querySelector("#signup-name");
  const phoneInput = form.querySelector("#signup-phone");

  initPasswordToggle(form);

  emailInput?.addEventListener("input", () => {
    updateFieldState(
      emailInput,
      validateEmail(emailInput.value),
      "사용 가능한 이메일입니다.",
      "이메일 형식을 확인해주세요."
    );
  });

  passwordInput?.addEventListener("input", () => {
    updateFieldState(
      passwordInput,
      validatePassword(passwordInput.value),
      "사용 가능한 비밀번호입니다.",
      "비밀번호는 8자 이상 입력해주세요."
    );

    if (passwordConfirmInput?.value) {
      validatePasswordConfirm(passwordInput, passwordConfirmInput);
    }
  });

  passwordConfirmInput?.addEventListener("input", () => {
    validatePasswordConfirm(passwordInput, passwordConfirmInput);
  });

  nameInput?.addEventListener("input", () => {
    updateFieldState(
      nameInput,
      validateName(nameInput.value),
      "사용 가능한 이름입니다.",
      "이름은 2자 이상 입력해주세요."
    );
  });

  phoneInput?.addEventListener("input", () => {
    updateFieldState(
      phoneInput,
      validatePhone(phoneInput.value),
      "사용 가능한 휴대폰 번호입니다.",
      "휴대폰 번호 형식을 확인해주세요."
    );
  });
}
