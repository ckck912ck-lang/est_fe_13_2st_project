// formValidation.js : 배정호 작업

// 로그인/회원가입 검사기능
// 입력 중(form이 change되면) 즉시 피드백
// 이메일 형식 맞는지, 비밀번호 길이/형식 맞는지, 비밀번호 = 비밀번호 확인인지
// 비밀번호 입력 폼 우측 눈 버튼 누르면 비밀번호 보기/숨기기(active 클래스 추가/제거)

// =======================================
// 비밀번호 visibility 토글 함수
// =======================================

// 비밀번호 보기/점으로 표시
// 모든 비밀번호 토글버튼을 받아서, 텍스트일때 누르면 비밀번호로, 비밀번호일때 누르면 텍스트로 바꿈
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

// 피드백 UI 최종 출력 함수
// input 요소, 각 함수의 폼 검사 결과(true/false), true 시 문구, false 시 문구를 매개변수로 받음
// 받은 input과 검사 결과에 따라 피드백 UI 출력
function updateFieldState(input, isValid, successMessage, errorMessage) {
  // 매개변수로 받은 인풋의 가장 가까운 부모 라벨을 선택하고, 없으면 가드
  const field = input.closest(".signup-field");
  if (!field) return;
  // 필드에서 피드백 메시지 요소를 선택하고, 필드에서 성공, 에러 메시지를 전부 제거
  const message = field.querySelector(".field-message");
  field.classList.remove("is-success", "is-error");

  // 인풋 값에서 앞뒤 공백 제거한 값이 빈 값이고 = 실제 입력값이 없고,
  // 메시지가 있으면 : 메시지 텍스트 삭제하고 false 반환
  // (이유 : 공백도 true로 취급하기 때문)
  if (!input.value.trim()) {
    if (message) message.textContent = "";
    return false;
  }

  // 검사 결과가 true면 성공 클래스 추가하고 성공 메시지 출력
  if (isValid) {
    field.classList.add("is-success");
    if (message) message.textContent = successMessage;
    return true;
  }

  // 아니면 에러 클래스 추가하고 에러 메시지 출력
  field.classList.add("is-error");
  if (message) message.textContent = errorMessage;
  return false;
}

// 이메일 검사
function validateEmail(value) {
  const email = value.trim();
  // @이 몇번째 자리에 있는지 숫자를 저장
  const atIndex = email.indexOf("@");
  // .이 뒤에서 몇번째 자리에 있는지 숫자를 저장
  const dotIndex = email.lastIndexOf(".");

  // 이메일에 @ 들어가고, . 들어가고, @ 앞의 텍스트 길이가 3자 이상이고, @과 . 사이에 2자 이상이고, . 뒤에 2자 이상이면 true, 아니면 false 출력
  return (
    email.includes("@") &&
    email.includes(".") &&
    atIndex >= 3 &&
    dotIndex > atIndex + 2 &&
    dotIndex < email.length - 2
  );
}

// 비밀번호 검사
function validatePassword(value) {
  // 전체 길이가 8자 이상이면 true, 아니면 false 반환
  return value.length >= 8;
}

// 이름 검사
function validateName(value) {
  // 양 끝 공백 제거한 길이가 2자 이상이면 true, 아니면 false 반환
  return value.trim().length >= 2;
}

// 휴대폰 번호 검사
function validatePhone(value) {
  // 정규 표현식 : 숫자 2~3자 - 숫자 3~4자 - 숫자 4자 형태
  const phoneRegex = /^\d{2,3}-\d{3,4}-\d{4}$/;
  // 위 표현식을 test해보고, 맞으면 true, 아니면 false 반환
  return phoneRegex.test(value.trim());
}

// 비밀번호 확인 추가 검사
// 매개변수로 비밀번호, 비밀번호 확인의 인풋을 각각 받음
// 검사 결과와 내용을 넣고 출력함
function validatePasswordConfirm(passwordInput, confirmInput) {
  // 인수로 받은 두 요소의 value가 동일한지 확인, 동일하면 true, 다르면 false 반환
  const isValid = passwordInput.value === confirmInput.value;

  // 최종 출력 함수에 비밀번호 확인 요소, 검사한 boolean 값, 성공/에러 메시지를 넣고 출력
  return updateFieldState(
    confirmInput,
    isValid,
    "비밀번호가 일치합니다.",
    "비밀번호가 일치하지 않습니다."
  );
}

// 실제 검사 결과를 저장할 변수
let isEmailValid = false;
let isPasswordValid = false;
let isPasswordConfirmValid = false;
let isNameValid = false;
let isPhoneValid = false;

// 모든 인풋을 총괄해서 검사하고 출력하는 함수
export function initSignupValidation() {
  // 폼 전체를 저장하고, 없으면 가드
  const form = document.querySelector(".signup-form");
  if (!form) return;

  const toggleButtons = form.querySelectorAll(".password-toggle-button");

  // 이메일, 비밀번호, 확인, 이름, 전화번호 인풋을 각각 저장
  const emailInput = form.querySelector("#signup-email");
  const passwordInput = form.querySelector("#signup-password");
  const passwordConfirmInput = form.querySelector("#signup-password-confirm");
  const nameInput = form.querySelector("#signup-name");
  const phoneInput = form.querySelector("#signup-phone");

  // 모든 비밀번호 토글버튼을 위에서 만든 함수에 넣어서 실행
  passwordVisibility(toggleButtons);

  // 이메일 인풋이 있으면 인풋 이벤트 추가 : 검사한 값을 넣고 출력
  emailInput?.addEventListener("input", () => {
    isEmailValid = validateEmail(emailInput.value);
    updateFieldState(
      emailInput,
      isEmailValid,
      "사용 가능한 이메일입니다.",
      "이메일 형식을 확인해주세요."
    );
  });

  // 비밀번호 인풋이 있으면 인풋 이벤트 추가 : 검사한 값을 넣고 출력
  passwordInput?.addEventListener("input", () => {
    isPasswordValid = validatePassword(passwordInput.value);
    updateFieldState(
      passwordInput,
      isPasswordValid,
      "사용 가능한 비밀번호입니다.",
      "비밀번호는 8자 이상 입력해주세요."
    );

    // 비밀번호 인풋이 있는 상태로 확인 value가 있으면, 두 인풋을 인수로 넣어서 비밀번호 추가 검사 후 출력
    if (passwordConfirmInput?.value) {
      isPasswordConfirmValid = validatePasswordConfirm(passwordInput, passwordConfirmInput);
    }
  });

  // 비밀번호 확인 인풋이 있으면 인풋 이벤트 추가 : value 변경될 때마다 두 인풋을 인수로 넣어서 비밀번호 추가 검사 후 출력
  passwordConfirmInput?.addEventListener("input", () => {
    isPasswordConfirmValid = validatePasswordConfirm(passwordInput, passwordConfirmInput);
  });

  // 이름 인풋이 있으면 인풋 이벤트 추가 : 검사한 값을 넣고 출력
  nameInput?.addEventListener("input", () => {
    isNameValid = validateName(nameInput.value);
    updateFieldState(
      nameInput,
      isNameValid,
      "사용 가능한 이름입니다.",
      "이름은 2자 이상 입력해주세요."
    );
  });

  // 전화번호 인풋이 있으면 인풋 이벤트 추가 : 검사한 값을 넣고 출력
  phoneInput?.addEventListener("input", () => {
    isPhoneValid = validatePhone(phoneInput.value);
    updateFieldState(
      phoneInput,
      isPhoneValid,
      "사용 가능한 휴대폰 번호입니다.",
      "휴대폰 번호 형식을 확인해주세요."
    );
  });
}

// 이전/다음 단계 필드셋, 버튼
const basicStep = document.querySelector(".signup-basic-step");
const termsStep = document.querySelector(".signup-terms-step");
const nextButton = document.querySelector(".next-step");

//
const signupSteps = document.querySelector(".signup-steps");
const step1 = signupSteps.querySelector(".basic-step");
const step2 = signupSteps.querySelector(".terms-step");

// 다음 단계 버튼을 눌렀을 때,
nextButton.addEventListener("click", () => {
  console.log(isEmailValid);
  console.log(isPasswordValid);
  console.log(isPasswordConfirmValid);
  console.log(isNameValid);
  console.log(isPhoneValid);

  if (
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirmValid &&
    isNameValid &&
    isPhoneValid === true
  ) {
    basicStep.hidden = true;
    termsStep.hidden = false;
    step1.classList.remove("is-active");
    step2.classList.add("is-active");
  }
});

const checkAllTerms = document.querySelector('input[name="terms-all"]');
const terms = document.querySelectorAll('.signup-terms input[type="checkbox"]');
const prevStep = document.querySelector(".prev-step");
const form = document.querySelector("form");

// 모두선택 누르면 : 현재 체크된 terms가 전체수와 같으면 끄고, 하나라도 적으면 켜기
checkAllTerms.addEventListener("click", () => {
  const checkedCount = isTermsChecked();

  if (checkedCount < terms.length) {
    terms.forEach((t) => {
      t.checked = true;
    });
    checkAllTerms.checked = true;
    return;
  }

  if (checkedCount === terms.length) {
    terms.forEach((t) => {
      t.checked = false;
    });
    checkAllTerms.checked = false;
  }
});

function isTermsChecked() {
  let termsCheckedCount = 0;

  terms.forEach((t) => {
    if (t.checked) {
      termsCheckedCount += 1;
    }
  });

  return termsCheckedCount;
}

prevStep.addEventListener("click", () => {
  basicStep.hidden = false;
  termsStep.hidden = true;
  step1.classList.add("is-active");
  step2.classList.remove("is-active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  location.href = "index.html";
});
