// app/(flow)/mcDonalds/globalState.ts

let touchCount = 0;
let successTouchCount = 0; // [추가] 성공 터치 카운트

export const resetMcDonaldsTouch = () => {
  touchCount = 0;
  successTouchCount = 0; // [추가] 초기화
};

// 전체 터치 (화면 아무곳이나 누를 때 _layout.tsx에서 호출됨)
export const recordMcDonaldsTouch = () => {
  touchCount++;
};

// [추가] 성공 터치 (유의미한 버튼을 눌렀을 때만 직접 호출)
export const recordMcDonaldsSuccess = () => {
  successTouchCount++;
  console.log("Success Touch!", successTouchCount);
};

export const getMcDonaldsTouchCount = () => {
  return touchCount;
};

// [추가] 성공 터치 횟수 반환
export const getMcDonaldsSuccessCount = () => {
  return successTouchCount;
};
