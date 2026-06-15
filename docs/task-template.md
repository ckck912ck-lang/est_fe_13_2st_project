# 작업 요청 템플릿

AI 또는 팀원에게 작업을 요청할 때 이 양식을 복사해서 사용합니다.

## 작업 목표

예시: `product-list.html`에서 `products.json` 데이터를 불러와 상품 카드를 렌더링한다.

## 작업 배경

예시: 상품 목록 페이지 MVP 구현을 위해 데이터 fetch, 상품 카드 렌더링, 상세 페이지 이동 기능이 필요하다.

## 수정 가능한 파일

- `파일 경로를 적습니다`

예시:

- `product-list.html`
- `js/pages/productList.js`
- `js/modules/renderProductCard.js`
- `js/utils/fetchData.js`
- `scss/pages/_product-list.scss`

## 수정 금지 파일

- `css/style.css`
- `css/style.css.map`
- 작업 범위 밖의 파일

## 참고 문서

- `docs/convention.md`
- `docs/ai-harness.md`
- `docs/qa-checklist.md`

## 지켜야 할 규칙

- `css/style.css` 직접 수정 금지
- 모바일 퍼스트 기준 작성
- 반응형은 `min-width` 기준 작성
- 공통 기능은 `js/modules/` 또는 `js/utils/`로 분리
- 페이지 조립 코드는 `js/pages/`에 작성
- HTML에는 `css/style.css` 하나만 연결

## 완료 조건

- [ ] 요구 기능이 화면에서 동작한다.
- [ ] 콘솔 에러가 없다.
- [ ] 360px 모바일 화면에서 레이아웃이 깨지지 않는다.
- [ ] 접근성 기본 항목을 확인했다.
- [ ] 수정 파일 목록을 설명할 수 있다.

## 작업 후 보고 요청 형식

```md
## 수정한 파일

- 

## 구현한 내용

- 

## 확인한 항목

- 

## 추가 확인이 필요한 부분

- 
```
