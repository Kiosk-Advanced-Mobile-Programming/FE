// app/(flow)/general-restaurant/App.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './cart-context';

import StartGeneralRestaurant from './start-general-restaurant';
import SelectMenu from './select-menu';
import OrderDetail from './order-detail';
import Cart from './cart';
import Payment from './payment';
import OrderComplete from './order-complete';
import { StudySessionProvider } from './study-session-context';

export type RootStackParamList = {
  StartGeneralRestaurant: undefined;
  SelectMenu: undefined;
  OrderDetail: { itemId: string };
  Cart: undefined;
  Payment: undefined;
  OrderComplete: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GeneralRestaurantNavigator() {
  return (
    <StudySessionProvider>
      <CartProvider>
        <Stack.Navigator
          initialRouteName="StartGeneralRestaurant"
          screenOptions={{
            headerShown: false, // ★ 내부 스택 헤더 전부 숨김
          }}
        >
          <Stack.Screen
            name="StartGeneralRestaurant"
            component={StartGeneralRestaurant}
          />
          <Stack.Screen name="SelectMenu" component={SelectMenu} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="OrderComplete" component={OrderComplete} />
        </Stack.Navigator>
      </CartProvider>
    </StudySessionProvider>
  );
}
