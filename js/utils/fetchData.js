// json 파일의 경로를 받아서 데이터를 가져온 후 반환하는 함수
export async function fetchData(jsonPath) {
  try {
    // JSON 파일을 요청하고 응답 기다렸다가 객체를 response에 저장
    const response = await fetch(jsonPath);

    // 응답이 실패한 경우 에러 발생
    if (!response.ok) {
      throw new Error(`로딩에 실패했습니다. error : ${response.status}`);
    }

    // JSON 데이터를 JS 객체로 변환 기다렸다가 반환
    return await response.json();
  } catch (error) {
    console.error(`fetchData error :`, error);
  }
}
