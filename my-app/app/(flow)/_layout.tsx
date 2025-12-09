// app/(flow)/_layout.tsx
import { Stack, usePathname, router } from 'expo-router';
import { View, Pressable, Text } from 'react-native';
import { recordTouch as recordMegacoffeeTouch } from './megacoffee/globalState';
import { recordTouch as recordEdiyaTouch } from './ediya/globalState';

export default function FlowLayout() {
  const pathname = usePathname();

  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponderCapture={() => {
        if (pathname.includes('/megacoffee')) {
          recordMegacoffeeTouch();
        } else if (pathname.includes('/ediya')) {
          recordEdiyaTouch();
        }
        return false;
      }}
    >
      <Stack
        screenOptions={{
          headerTitle: '',
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingHorizontal: 12, paddingVertical: 6 }}
            >
              <Text style={{ fontSize: 18 }}>뒤로가기</Text>
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
    </View>
  );
}
