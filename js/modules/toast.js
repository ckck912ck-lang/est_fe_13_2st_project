// 토스트에 표시할 문구를 넣고 active 클래스 추가

// 일정 시간이 지나면 active 클래스 제거

const TOAST_ACTIVE_CLASS = "is-active";
const DEFAULT_TOAST_DURATION = 2000;

let toastTimerId;

function normalizeDuration(duration) {
  const parsedDuration = Number(duration);

  if (!Number.isFinite(parsedDuration) || parsedDuration < 0) {
    return DEFAULT_TOAST_DURATION;
  }

  return parsedDuration;
}

export function showToast(message, duration = DEFAULT_TOAST_DURATION) {
  const toastElement = document.querySelector('[data-component="toast"]');

  if (!toastElement || !message) {
    return;
  }

  toastElement.textContent = message;
  toastElement.classList.add(TOAST_ACTIVE_CLASS);

  clearTimeout(toastTimerId);

  toastTimerId = setTimeout(() => {
    toastElement.classList.remove(TOAST_ACTIVE_CLASS);
  }, normalizeDuration(duration));
}