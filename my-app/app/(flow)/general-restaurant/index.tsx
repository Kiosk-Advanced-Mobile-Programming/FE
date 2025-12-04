// app/(flow)/general-restaurant/index.tsx
import React from 'react';
import App from './App';

// Expo Router에서 /general-restaurant 로 들어왔을 때
// 우리가 만든 Navigation(App.tsx)을 그대로 띄워주는 엔트리
export default function GeneralRestaurantEntry() {
  return <App />;
}
