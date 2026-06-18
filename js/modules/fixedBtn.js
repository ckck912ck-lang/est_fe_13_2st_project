// fixedBtn.js : 배정호 작성

// 고정 문의 버튼 클릭 시 문의 dialog 모달을 연다
// dialog mdn 참조 : 모달 열기 .show(), 닫기 .close(), 닫기 속성 closedby="none/closerequest/any", 배경 CSS에서 dialog::backdrop

const dialog = document.querySelector(".inquiry-dialog");

// container 받아서 container 클릭하면 문의 모달 showModal();
export function openChattingModal(fixedBtn) {
  fixedBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.showModal();
  });
}

export function closeChattingModal() {
  const closeBtn = dialog.querySelector(".dialog-close-button");
  closeBtn.addEventListener("click", () => {
    dialog.close();
  });
}

// 무조건 .inquiry-dialog 클래스에 문의 모달 HTML 넣어줌
export function renderChatting() {
  let html = "";
  html = chatHTML();
  dialog.innerHTML = html;
}

function chatHTML() {
  return `
    <div class="dialog-inner">
      <header class="dialog-header">
        <h2 id="inquiry-title">온라인 문의</h2>

        <button
          type="button"
          class="dialog-close-button"
          data-action="close-inquiry"
          aria-label="온라인 문의 닫기"
        >
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
      </header>

      <form class="inquiry-form">
        <div class="form-field">
          <label for="inquiry-name">이름</label>
          <input id="inquiry-name" name="name" type="text" placeholder="홍길동" />
        </div>

        <div class="form-field">
          <label for="inquiry-phone">연락처</label>
          <input id="inquiry-phone" name="phone" type="tel" placeholder="010-0000-0000" />
        </div>

        <div class="form-field">
          <label for="inquiry-message">문의 내용</label>
          <textarea
            id="inquiry-message"
            name="message"
            placeholder="문의 내용을 입력해주세요"
          ></textarea>
        </div>

        <button type="submit" class="inquiry-submit-button">문의 접수</button>
      </form>
    </div>
  `;
}
