// 탭 버튼 클릭 시 data-tab 속성의 값을 읽음
// 같은 data-tab 값을 가진 패널에 active 클래스를 추가
// 나머지 탭 버튼과 패널에서는 active 클래스를 제거
// 탭 내부 콘텐츠 렌더링은 각 페이지 JS에서 처리
export function initTabs(tabContainer) {
  if (!tabContainer) return;

  const tabButtons = tabContainer.querySelectorAll(".tab-button");
  const tabPanels = tabContainer.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;

      tabButtons.forEach((tabButton) => {
        tabButton.classList.remove("active");
        tabButton.setAttribute("aria-selected", "false");
      });

      tabPanels.forEach((panel) => {
        panel.classList.remove("active");
        panel.hidden = true;
      });

      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      const targetPanel = tabContainer.querySelector(`.tab-panel[data-tab="${targetTab}"]`);

      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.hidden = false;
      }
    });
  });
}
