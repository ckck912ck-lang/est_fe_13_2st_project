// 매개변수로 받은 인자에서 rating을 추출해, 범위에 맞춰 0.5단위로 별, 빈 별 출력
export function renderStars(rating) {
  const maxStars = 5;
  const safeRating = Math.max(0, Math.min(maxStars, Number(rating) || 0));
  const roundedRating = Math.round(safeRating * 2) / 2;

  let stars = "";

  for (let i = 1; i <= maxStars; i++) {
    if (roundedRating >= i) {
      stars += `<span class="material-icons star-icon" aria-hidden="true">star</span>`;
    } else if (roundedRating >= i - 0.5) {
      stars += `<span class="material-icons star-icon" aria-hidden="true">star_half</span>`;
    } else {
      stars += `<span class="material-icons star-icon star-icon--empty" aria-hidden="true">star_border</span>`;
    }
  }

  return stars;
}
