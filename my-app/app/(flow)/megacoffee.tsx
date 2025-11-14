// app/(flow)/megacoffee.tsx 

import { View, Text, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './megacoffee.styles';


// 임시 메뉴 데이터 (가로 4개 배치 확인용)
const menuItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Megacoffee() {
    return (
        <View style={styles.wrap}>
            <View style={styles.topContainer}>
                <View style={styles.drinkType}>
                    <Text style={styles.topText}>음료 타입: 커피</Text>
                </View>
                
                <View style={styles.drinkTypeSide}>
                    <Text style={styles.topText}>사이즈 옵션1</Text>
                    <Text style={styles.topText}>사이즈 옵션2</Text>
                </View>
            </View>

            {/* ⭐️ BOTTOM CONTAINER: 나머지 영역 (flex: 1) */}
            <View style={styles.bottomContainer}>
                
                {/* MENU GRID: 메뉴 항목 배치 */}
                <View style={styles.menuGrid}>
                    {menuItems.map((item) => (
                        // MENU CONTAINER: 가로 4개 배치
                        <Pressable 
                            key={item} 
                            style={styles.menuContainer}
                            onPress={() => console.log(`Menu ${item} selected`)}
                        >
                            <Text style={styles.menuText}>Menu {item}</Text>
                        </Pressable>
                    ))}
                </View>
                
            </View>

        </View>
    );
}