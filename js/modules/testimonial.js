// renderStars.js에서 renderStars 함수를 import해 후기 별점 렌더링에 사용
// reviews(데이터) 배열, container(HTML이 들어갈 태그), maxCount(변수)를 매개변수로 받음
// reviews 배열에서 최대 maxCount개만큼 후기 데이터를 선택
// 각 후기의 rating 값은 renderStars(rating)에 전달해 별점 HTML 생성
// 후기의 작성자, 작성일, 내용 값을 사용해 후기 카드 HTML 생성
// 생성한 후기 카드를 frag에 모은 뒤 container에 HTML로 생성
import { renderStars } from "./renderStars.js";

export function renderTestimonials(reviews, container, maxCount = reviews.length) {
  if (!container || !Array.isArray(reviews)) return;

  const selectedReviews = reviews.slice(0, maxCount);

  container.innerHTML = selectedReviews
    .map((review) => {
      return `
        <article class="review-item">
          <div class="review-item__meta">
            <strong>${review.author} <span>구매확인</span></strong>
            <time datetime="${review.date}">${review.date.replaceAll("-", ".")}</time>
          </div>

          <p class="review-item__stars" aria-label="별점 ${review.rating}점">
            ${renderStars(review.rating)}
          </p>

          <p>${review.content}</p>
        </article>
      `;
    })
    .join("");
}
