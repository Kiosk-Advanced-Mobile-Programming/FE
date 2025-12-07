// app/(flow)/_layout.tsx
import { Slot, usePathname } from 'expo-router';
import { View } from 'react-native';
import { recordTouch as recordMegacoffeeTouch } from './megacoffee/globalState';
import { recordTouch as recordEdiyaTouch } from './ediya/globalState';

export default function FlowLayout() {
    const pathname = usePathname();

    return (
        // onStartShouldSetResponderCapture: 터치가 발생하면 가장 먼저 가로채서 recordTouch를 실행합니다.
        // return false를 해야 터치 이벤트가 자식 버튼(주문담기 등)으로 정상적으로 전달됩니다.
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
            <Slot />
        </View>
    );
}