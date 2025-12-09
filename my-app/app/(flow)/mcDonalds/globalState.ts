// app/(flow)/mcDonalds/globalState.ts

let touchCount = 0;

export const resetMcDonaldsTouch = () => {
  touchCount = 0;
};

export const recordMcDonaldsTouch = () => {
  touchCount++;
  // console.log("McDonalds Touch:", touchCount); // 디버깅용
};

export const getMcDonaldsTouchCount = () => {
  return touchCount;
};
