# ROUNZ 리뉴얼 프로젝트 개발 컨벤션

이 문서는 팀원이 동일한 파일 구조, 브랜치 전략, SCSS/JavaScript 작성 규칙을 기준으로 작업하기 위한 개발 컨벤션입니다.

## 필수 규칙

- 구조 규칙 : 가능한 한 폴더 구조 유지. 필요 시 회의를 거쳐 수정
- CSS 규칙 : HTML에는 style.css만 연결, style.css 직접 수정 금지
- js 규칙 : pages/ 폴더 내 파일은 페이지 별 코드 조립 + 모듈로 나누기 애매한 크기의 페이지 전용 코드만 작성
- Github 규칙 : main 브랜치에 직접 push 금지
- 공통 기능 규칙 : 공통 기능(HTML/CSS/JS/에셋/데이터/설정 포함) 수정 전 담당자 또는 팀원 공유
- AI 규칙 : AI 생성 코드는 반드시 실행 및 검수 후 커밋, 기존 파일 구조와 컨벤션을 우선 적용, 함수명/폴더 구조/데이터 구조를 임의 생성하지 않음

## 1. 기본 방향 및 주의사항

- 컨벤션 목적 : 불필요한 중간 리팩토링 및 충돌 방지
- Github 버전 관리 관련 규칙
  - `main` 브랜치는 안정 버전 관리용으로 사용
  - 배포는 `deploy` 브랜치로 옮겨서 배포
  - 작업은 별도 브랜치에서 진행 후 main으로 PR
    - ex) `feat/header` , `refactor/index`
- CSS 관련 규칙
  - `css/style.css`는 직접 수정 X
  - 스타일은 `scss` 파일에서 수정
  - HTML에는 `style.css` 하나만 연결
  - 최종 CSS는 `style.css` 하나로 컴파일
  - HTML에서는 `css/style.css` 하나만 연결
  - SCSS는 기능별로 분리
- 모바일 퍼스트 기준으로 작성하고, `min-width` 으로 작성
- .gitignore = github 업로드 시 불필요한 파일 무시 (개인 설정 파일 .vscode/, 보안 관련 파일 등)
- .editorconfig = 개발 컨벤션 중 일부 설정 통일해주는 파일

---

## 2. 전체 파일 구조

```
est_fe_13_2nd_project/
│
├─ index.html                 : 메인 페이지
├─ product-list.html          : 상품 목록 페이지
├─ product-detail.html        : 상품 상세 페이지
├─ cart.html                  : 장바구니 페이지
├─ login.html                 : 로그인 페이지
├─ signup.html                : 회원가입 페이지
│
├─ assets/
│  ├─ images/
│  │  ├─ common/              : 공통 이미지 (로고/기본 배경/공통 UI 이미지 등)
│  │  ├─ banner/              : 메인 배너, 이벤트 배너 등 프로모션 이미지
│  │  └─ products/            : 상품 썸네일, 상품 상세 이미지 등 상품 관련 이미지
│  ├─ icons/
│  └─ videos/
│
├─ data/
│  ├─ notice.json
│  ├─ qna.json
│  └─ products.json
│
├─ css/
│  ├─ style.css               : 스타일 메인 파일 (style.scss에서 이 파일로 컴파일)
│  └─ style.css.map
│
├─ scss/
│  ├─ base/
│  │  ├─ _variables.scss      : css변수 모음
│  │  ├─ _mixins.scss         : 자주 쓰는 스타일 조각 모음
│  │  ├─ _typography.scss     : @font-face 모음
│  │  ├─ _reset.scss          : 기본 스타일 제거
│  │  └─ _normalize.scss      : 브라우저 차이 통일
│  │
│  ├─ layout/
│  │  ├─ _common.scss         : 공통 레이아웃 (컨테이너 너비, 섹션 상하패딩 등)
│  │  ├─ _header.scss         : 헤더 모듈
│  │  ├─ _hamburger-nav.scss  : 햄버거 내비게이션 모듈
│  │  ├─ _bottom-nav.scss     : 바텀 내비게이션 모듈
│  │  └─ _footer.scss         : 푸터 모듈
│  │
│  ├─ components/
│  │  ├─ _accordion.scss      : 아코디언 스타일 컴포넌트
│  │  ├─ _badge.scss          : 뱃지 스타일 컴포넌트
│  │  ├─ _button.scss         : 버튼 스타일 컴포넌트
│  │  ├─ _card-ui.scss        : 카드 스타일 컴포넌트 (일반/상품/장바구니/후기)
│  │  ├─ _carousel.scss       : 캐러셀(자동 슬라이드) 스타일 컴포넌트
│  │  ├─ _fixed-button.scss   : 고정 버튼 스타일 컴포넌트
│  │  ├─ _form.scss           : 입력 폼 스타일 컴포넌트
│  │  ├─ _modal.scss          : 모달(팝업창 등) 스타일 컴포넌트
│  │  ├─ _skeleton.scss       : 스켈레톤 UI 스타일 컴포넌트
│  │  ├─ _tabs.scss           : 탭 스타일 컴포넌트
│  │  └─ _toast.scss          : 토스트 스타일 컴포넌트
│  │
│  ├─ pages/
│  │  ├─ _index.scss          : 메인 페이지 세부 스타일
│  │  ├─ _product-list.scss   : 상품 목록 페이지 세부 스타일
│  │  ├─ _product-detail.scss : 상품 상세 페이지 세부 스타일
│  │  ├─ _cart.scss           : 장바구니 페이지 세부 스타일
│  │  ├─ _login.scss          : 로그인 페이지 세부 스타일
│  │  └─ _signup.scss         : 회원가입 페이지 세부 스타일
│  │
│  └─ style.scss              : 모든 scss 파일을 불러와 style.css로 컴파일
│
├─ js/
│  ├─ utils/                  : 여러 파일에서 공통으로 사용하는 작은 기능 함수 모음
│  │  ├─ dom.js               : selector 유틸 등 DOM 관련 자주 반복되는 함수
│  │  ├─ fetchData.js         : json데이터를 fetch하고 객체로 변환
│  │  ├─ localStorage.js      : 로컬스토리지 읽기/쓰기/수정/삭제
│  │  ├─ getQueryParam.js     : URL 파라미터 읽기
│  │  ├─ lazyLoadVideo.js     : 영상 지연 로딩
│  │  └─ format.js            : 가격 등 데이터를 화면에 표시하기 좋게 변환하는 함수
│  │
│  ├─ modules/                : 여러 페이지에서 재사용 가능한 공통 코드
│  │  ├─ carousel.js          : 배너/상품 슬라이드 등 움직이는 캐러셀 기능
│  │  ├─ cartAction.js        : 장바구니 페이지 전용 액션
│  │  ├─ filter.js            : 상품 필터링 기능
│  │  ├─ fixedBtn.js          : 고정 문의 버튼 모달 기능
│  │  ├─ formValidation.js    : 로그인/회원가입 검사기능
│  │  ├─ hamburgerNav.js      : 햄버거 메뉴 토글 온오프
│  │  ├─ header.js            : 헤더 3종 HTML 재사용
│  │  ├─ infiniteScroll.js    : 후순위 추가기능, 무한스크롤
│  │  ├─ modal.js             : 모달, 팝업 열기/닫기 : dialog
│  │  ├─ pagination.js        : 상품 목록 페이지네이션 기능
│  │  ├─ renderCartBadge.js   : 장바구니 뱃지 수량 갱신
│  │  ├─ renderProductCard.js : 상품 데이터 1개 렌더링
│  │  ├─ renderProducts.js    : 상품 데이터 map으로 새 배열 생성
│  │  ├─ renderSkeleton.js    : 후순위 추가기능, 스켈레톤 UI 생성
│  │  ├─ renderStars.js       : rating을 받아 별모양 HTML로 렌더링
│  │  ├─ search.js            : 후순위 추가기능, 검색기능
│  │  ├─ sort.js              : 상품 정렬 기능
│  │  ├─ tabs.js              : 공지/이벤트 탭 등 탭 전환 UI
│  │  ├─ testimonial.js       : 후기 데이터를 받아 HTML 렌더링
│  │  └─ toast.js             : 후순위 추가기능, 토스트 기능
│  │
│  └─ pages/                  : 페이지 별 코드 조립 + 나누기 애매한 페이지 전용 코드
│     ├─ common.js            : 모든 페이지 공통 실행 코드
│     ├─ index.js             : index.html에서만 필요한 코드
│     ├─ productList.js       : product-list.html에서만 필요한 코드
│     ├─ productDetail.js     : product-detail.html에서만 필요한 코드
│     ├─ cart.js              : cart.html에서만 필요한 코드
│     ├─ login.js             : login.html에서만 필요한 코드
│     └─ signup.js            : signup.html에서만 필요한 코드
│
├─ .gitignore                 : 일부 파일 Github 업로드 무시
└─ README.md
```

---

## 3. 개발 컨벤션

### 3-1. 코드 작성 스타일

### 파일/폴더 네이밍

- html/css/scss 메인 파일 : kebab-case 사용
- scss 모듈 : \_kebab-case 사용
- JavaScript : camelCase 사용

```
product-detail.html
_product-detail.scss
productDetail.js
```

---

### HTML/CSS 선택자 요소

- kebab-case 사용
- class, id, data 속성명 등에 적용
- JS 파일 내부에서 DOM 요소를 선택할 때도 동일 규칙 유지

```html
<!-- HTML -->
<section class="**product-list**"></section>
```

```css
/* CSS */
.**product-list** {
}
```

```jsx
// JavaScript
const **productList** = document.querySelector(".**product-list**");
```

---

### JavaScript 변수, 상수, 함수, 클래스

- 일반적인 컨벤션에 따름
  - 변수, 함수 = camelCase 사용
  - 상수 = SCREAMING_SNAKE_CASE 사용
  - 클래스 = PascalCase 사용
- 변수, 함수, 객체, 상태값 등에 적용

```jsx
// JavaScript
let **currentIdx** = 0;
function **renderProduct**() {}
const PRODUCT_LIST ****= [];
class Car extends Vehicle { constructor(name, color) }
```

---

#### 기타 코딩 컨벤션

- **기능 별 주석 작성**
  - 변수 모음, 개별 함수, 큰 단위 실행 시 **코드 바로 윗 줄에 주석 작성**
  - 주석을 포함한 하나의 기능 이후에는 반드시 한 줄을 비우기
  - 예시
    !image.png
- HTML 리소스 경로는 상대경로 사용
  - JS import는 가능한 동일 깊이 구조 유지
- link / import 순서 : 범위가 넓은 파일 → 범위가 좁은 파일 순
- 들여쓰기/공백 : 2칸으로 통일
- 줄바꿈 : 100자
- 큰따옴표 사용
- 세미콜론(;) 사용
- 에디터 : Prettier - Code formatter
  !image.png
- 그 외 기타 코딩 컨벤션은 Prettier 기본 설정에 따름
- 주석은 "왜"보다 "무엇을 하는지"를 우선 설명
- 코드 실행 순서 기준으로 작성

예시

// 상품 목록 렌더링
// 현재 페이지에 해당하는 상품만 잘라서 카드 생성

// 페이지네이션 UI 생성
// 전체 페이지 수를 기준으로 버튼 렌더링

---

### 3-2. HTML 컨벤션

#### 문서 구조

- HTML5 표준 문법 사용
- `<!DOCTYPE html>` 선언 필수
- 언어 속성(`lang`) 명시

---

#### 시맨틱 태그 사용

https://codepen.io/unionbjh/pen/QwGNMLQ

- div 대신 시맨틱 태그를 사용할 수 있는 경우에는 되도록 시맨틱 태그 사용
- **header, main, footer, nav, section, article, aside**
- strong, em, blockquote, figure, figcaption
- details, summary, fieldset, legend

---

#### 태그 속성 순서

중요하고 유일한 것부터 → 기능 또는 보조적인 속성

1. `id`, `class`
2. `name`, `data-*`
3. `src`, `href`, `type`, `alt`
4. `role`, `aria-*`

---

#### 접근성

- 이미지에 `alt` 속성 필수
- 폼 요소에는 `label` 연결
- 색상만으로 구분하지 않기
- 순수 장식용 콘텐츠/반복 콘텐츠/화면 밖 콘텐츠에는 aria-hidden="true"

---

### 3-3. CSS 컨벤션

#### **기본 원칙**

- CSS3 표준 속성 우선
- 불필요한 중복 스타일 제거

---

#### SCSS 컴파일 구조

1. scss 파일 → @use → **style.scss**
2. **scss/style.scss** → Live Sass Compiler로 컴파일(변환) → **css/style.css**
3. html에서 style.css만 링크

---

#### 단위

- 폰트 : Figma에서 가져온 variables.scss의 css변수를 최우선적으로 사용
- 여백/크기 : `px` 또는 `%`
- 색상 : HEX 또는 RGBA

---

### 3-4. JavaScript 컨벤션

#### 모듈 구조 규칙

- utils : 범용 유틸 함수
- modules : 여러 페이지에서 재사용 가능한 기능
- pages : 페이지 진입점 및 페이지 전용 코드

예시

fetchData.js → utils
pagination.js → modules
productList.js → pages

#### 문법 스타일

- ES6 이상 문법 사용
- `var` 대신 `let`, `const` 사용
- 세미콜론(`;`) 사용

---

#### 공백 스타일

- 연산자 앞뒤, 콤마 뒤에 공백
- 함수 괄호와 중괄호 사이 공백 function() {}

---

#### **함수 작성**

- 화살표 함수 사용 권장
- 함수 하나는 가능하면 하나의 목적만 수행
  - (데이터 처리 / DOM 생성 / 이벤트 연결 분리 권장)

---

### 3-5. GitHub 컨벤션

#### 브랜치 전략

- main : 안정 버전
- deploy : 배포용 브랜치
- 개별 브랜치 : 작업 목적에 따라 네이밍
  - feat/XXX : XXX 페이지에 기능 추가 작업 시
  - fix/XXX : 버그 수정 작업 시
  - refactor/XXX : 기능 변경 없이 구조만 개선
  - chore/XXX : 빌드 업무, 패키지 매니저 설정, 인프라 관련 작업

작업 흐름:

```
feature 브랜치에서 작업
→ 확인 후 main에 PR
→ Github 관리자가 코드리뷰 후 main에 merge, 브랜치 삭제
→ 안정화 후 deploy에 반영
→ GitHub Pages 배포
```

---

#### 커밋/PR 전략

- main/deploy 직접 push 금지
- 작업은 반드시 별도 브랜치 생성 후 작업
- merge 전 충돌 확인
- 하나의 단위(함수 하나, 기능 하나 등)가 완료되었을 때 커밋
- 커밋 접두사(feat: , fix: 등)은 기본 커밋 컨벤션에 따르고, 내용은 한글/영어 자유 작성. 단, 커밋 또는 PR 내용에 작업 내용이 포함되어야 함
- PR은 가능하면 한 번에 300줄 미만 (초기 AI 생성 시 제외)

---

### 3-6. 기타 개발 규칙

#### 이미지 관리 규칙

- 저장 위치 : 모든 이미지는 assets/images/ 하위에 저장
  - common : 공통 이미지 (로고/기본 배경/공통 UI 이미지 등)
  - banner : 메인 배너, 이벤트 배너 등 프로모션 이미지
  - products : 상품 썸네일, 상품 상세 이미지 등 상품 관련 이미지
- 파일명 : 영문 소문자, 숫자, 하이픈 사용 (kebab-case)
  - 예시 : estcamp-logo-2x.png

---

#### 라이브러리 규칙

- 기능 목적, 대상 UI를 팀원과 공유
- **cdn**으로 import, **js/modules/**의 별도 파일에서 작업 후 **pages/**의 파일에import
- 버전 관리 : 사용 버전을 명시하고 프로젝트 중간에 임의 변경 금지
- 라이브러리 파일을 먼저 불러오고, 커스텀 JS는 그 뒤에 작성
- 페이지별 전용 라이브러리는 해당 페이지에서만 연결

---

- 반응형 브레이크포인트
  - Mobile : 360px~767px
  - Tablet : 768px~1279px
  - PC : 1280px~

---

## 4. 각 파일 별 내용

<aside>
<img src="/icons/pencil_gray.svg" alt="/icons/pencil_gray.svg" width="40px" />

#### 구현 난이도 대비 중요도 평가

- **핵심 기능 : MVP 구현일까지 필수 - 상품 데이터 흐름/구매 흐름 구현**
- **주요 기능 : 종료일까지 필수 - 실제 서비스처럼 구현, UX 강화**
- 디테일 기능 : 종료일까지 권장 - 완성도 추가 향상
- 추가 기능 : 선택
</aside>

#### 0. 공통 요소 (js모듈 + 컴포넌트)

- **공통 Header** (sticky) : 햄버거 메뉴 버튼, 로고, 검색, 마이페이지, 장바구니
- **공통 Footer** : 플래그십 스토어 링크, 파트너 안경원 링크, 사업자정보, SNS링크 및 푸터 콘텐츠
- **햄버거 내비게이션** : 햄버거 메뉴 진입 내비게이션 카테고리 및 다크모드/설정
- **하단 내비게이션** : 모바일 하단 내비게이션
- **상품 카드 UI**
- **모달창**
- **Toast** (화면에 잠깐 뜨고 사라지는 알림) : 장바구니 알림 등
- **로딩 (Skeleton UI)**
- **에러 알림창**

#### 0. 공통 요소 (HTML + 컴포넌트)

- **CTA 버튼**
- **가로 n등분 카테고리**
- 문의 고정버튼 (Fixed) : 문의 안내, 문의 폼
- **필터 칩** (작은 radius 필터 버튼)

#### 0. 공통 요소 (전체 적용)

- 다크모드/기본모드 : @media (prefers-color-scheme: light) {}
- **반응형 구현**
- **메인/목록/상세에서 장바구니 버튼 누르면 alert으로 확인버튼** → 누르면 장바구니로 이동

### `1. index.html`

#### 메인 페이지

- **히어로 섹션** : 히어로 배너 슬라이드 캐러셀 - carousel.js) AI CTA
- **AI 얼굴형 추천 CTA**
- **얼굴형 별 추천 카테고리 그리드**
- **AI 추천 상품** (비동기 데이터 렌더링) : 가로 스크롤 카드, 상품 정보, 장바구니에 담기
- **스타일 큐레이션** (감성 기반 카테고리)
- **베스트 상품 섹션** (비동기 데이터 렌더링)
- **프로모션 / 브랜드 섹션**
- **비디오 영역**
- 안경원 예약 CTA
- 안경원 찾기 CTA
- **공지 / 이벤트 탭 UI**

### `2. product-list.html`

#### 상품 목록 페이지

- **상품 목록** (비동기 데이터 렌더링)
- **상품 클릭 시 상세 페이지 이동**
- **필터 기능** (카테고리/브랜드/모양/얼굴형/색상/가격)
- **필터 초기화/적용**
- **정렬 기능** (가격순/최신순/리뷰순)
- **페이지네이션**
- 리스트 보기/목록 보기
- 무한 스크롤 더보기 기능

### `3. product-detail.html`

#### 상품 상세 페이지

- **상품 상세 정보** (비동기 데이터 렌더링)
- **이미지 슬라이드**
- **장바구니 담기 버튼**
- 후기 보기/입력 폼
- 브랜드 버튼 (product-list로 이동 + 브랜드 검색)
- 비슷한 제품 추천 (비동기 데이터 렌더링)
- 공유 버튼
- **옵션 선택** (색상 등)

### `4. cart.html`

#### 장바구니 페이지

- **장바구니 리스트** : localStorage에 저장된 장바구니 상품 표시
- **비어있을 때 UI**
- **수량 변경**
- **삭제 버튼**
- **총 금액 계산**
- 추천 상품

### `5. login.html`, `signup.html`

#### 로그인/회원가입 페이지

- 실제 로그인 기능 없이 UI만 구현
- **로그인/회원가입 폼/버튼/링크**
- **소셜 로그인/게스트 로그인 버튼**
- **회원가입 약관동의 체크박스**
- **비밀번호 확인 (둘이 같은지 확인)**
- 회원가입 약관동의 모달창
- 가입 완료 CTA

---

## 5. 발표 자료 필수 내용

https://docs.google.com/document/d/1Ul6XkHvBtg92l1Mtq0pQR4E03ux1NsHgqNMRgRhamoQ/edit?tab=t.0

#### **1. 프로젝트 개요**

- 주제와 선정 배경, 기획 의도, 차별점

#### **2. 현황분석(장단점분석)**

https://rounz.com/home.php https://drive.google.com/file/d/0B0HRSf3dPjJiekFnQTMycnVKSlU/view?usp=sharing&resourcekey=0-LPsvnhfKOoAcKG8q3UK2LQ

(합목적성/심미성/경제성/독창성 + 편의성/신뢰성/흥미성/참여유도/사용자화 + 웹표준/웹접근성/반응형)

#### **3. 벤치마킹(타사이트)**

#### **4. 리뉴얼 방향 도출(프로젝트 내용)**

- 슬로건
- 주요 구현내용, 컨셉

#### **5. 제작계획 -** 간트차트

#### **6. 프로젝트 팀구성 및 역할**

#### **7. 스토리보드**

---

#### **8. 와이어프레임**

#### **9. 디자인 시안**

- 스타일 가이드 (폰트, 배색, 그리드, 오토레이아웃, 컴포넌트, 스타일)
- Figma 원본 링크(권한 view)
- 시연 - 프로토타입

---

#### **10. 주요구현내용**

- 웹표준 검사 결과
- 웹접근성 검사 결과
- 크로스 브라우징
- 주요 인터렉션

#### **11. 제작 비하인드**

- 소통 및 의사결정 방식
- 프로젝트 리뷰(자체평가 총평, 팀원별 평가)

#### **12. 활용방안 및 기대효과, 개선방향**

---

## 6. QA 체크리스트

https://docs.google.com/document/d/135SzdfjSOhFUSl6x6h9fbaSeZ1JqESkqKqUzAjpfEFY/edit?tab=t.0

-

* 기본
  - 모바일 360px 대응 확인
  - 콘솔 에러 없는지 확인
  - 이미지 alt 확인
  - 버튼 hover/focus 확인
  - localStorage 정상 작동 확인
  - 새로고침 시 상태 유지 확인
  - Lighthouse 점수 확인
* **기능 테스트 (Functional)**
  - **기본 동작 검증:** 결제, 데이터 조회 및 저장 등 핵심 워크플로우 정상 동작 여부
  - **입력값 검증:** 필수값 미입력, 이메일/비밀번호 폼 입력 형식
  - **링크 및 버튼:** 깨진 링크, 잘못 연결된 페이지, 빈 페이지(404) 여부 확인
* **UI/UX 및 반응형 (Design & Responsiveness)**
  - **반응형 웹:** 데스크톱, 태블릿, 모바일 기기별 화면 깨짐 및 레이아웃 오류 확인
  - **기기 호환성:** 다양한 해상도 및 가로/세로 방향 전환 시 UI 정상 표시
  - **디자인 일치도:** 폰트 크기, 간격, 컬러, 이미지 해상도 등이 디자인 시안과 일치 여부 확인
  - **인터랙션:** 마우스 호버(Hover), 클릭, 드래그 앤 드롭 등 애니메이션 효과 적용 확인
* **크로스 브라우징 (Cross-Browsing)**
  - **브라우저 호환성:** Chrome, Safari, Edge, Firefox 등 주요 브라우저에서 동일한 화면 및 기능 지원 여부 확인
  - **웹 표준 준수:** HTML/CSS 문법 오류, 웹 접근성(ALT 텍스트 등) 준수
* **성능 및 로딩 (Performance)**
  - **페이지 로딩 속도:** 사용자가 불편함을 느끼지 않는 수준의 리소스 로딩 속도
  - **이미지 및 에셋 최적화:** 용량이 과도하게 큰 이미지 사용 여부 확인
  - **예외 처리:** 네트워크 지연 시 로딩 스피너(Loading Spinner) 노출 여부
    - 스켈레톤 UI로 대체
