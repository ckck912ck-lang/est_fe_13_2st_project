// URL로부터 쿼리 파라미터를 가져오는 유틸 함수.
// key에 해당하는 값이 없으면 defaultValue를 반환한다. defaultValue의 기본값은 null이다.
export function getQueryParam(key, defaultValue = null) {
  const params = new URLSearchParams(window.location.search);

  return params.get(key) ?? defaultValue;
}

// URL로부터 모든 쿼리 파라미터를 객체 형태로 가져오는 유틸 함수.
export function getQueryParams() {
  const params = new URLSearchParams(window.location.search);

  return Object.fromEntries(params.entries());
}
