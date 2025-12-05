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

export type RootStackParamList = {
  StartGeneralRestaurant: undefined;
  SelectMenu: undefined;
  OrderDetail: { itemId: string | number };
  Cart: undefined;
  Payment: undefined;
  OrderComplete: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GeneralRestaurantNavigator() {
  return (
    <CartProvider>
      <Stack.Navigator
        initialRouteName="StartGeneralRestaurant"
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="StartGeneralRestaurant"
          component={StartGeneralRestaurant}
          options={{ title: '일반 음식점 키오스크' }}
        />
        <Stack.Screen
          name="SelectMenu"
          component={SelectMenu}
          options={{ title: '메뉴 선택' }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ title: '메뉴 상세' }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: '장바구니' }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ title: '결제' }}
        />
        <Stack.Screen
          name="OrderComplete"
          component={OrderComplete}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </CartProvider>
  );
}
