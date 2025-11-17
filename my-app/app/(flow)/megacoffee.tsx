// app/(flow)/megacoffee.tsx 

import { View, Text, Pressable, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from './megacoffee.styles';


// Dummy data for the two horizontal menu rows
const drinkTypes = ['커피', '에이드', '스무디', '티', '논커피', '계절메뉴', '푸드', 'MD']; // Drink Type Row
const sideOptions = ['HOT', 'ICE', 'LARGE', 'MEGA', '샷추가', '휘핑추가']; // Side Options Row

const menuItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Megacoffee() {
    return (
        <View style={styles.wrap}>
            
            <View style={styles.topContainer}>
                
                {/* 1. Drink Type Row (커피, 에이드, 스무디 등) */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.drinkType}
                    contentContainerStyle={styles.drinkTypeContent} 
                >
                    {drinkTypes.map((type, index) => (
                        <Pressable 
                            key={type} 
                            style={styles.topOptionButton}
                            onPress={() => console.log(`Drink Type: ${type} selected`)}
                        >
                            <Text style={styles.topText}>{type}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

                {/* 2. Side Options Row (HOT, ICE, 사이즈 등) */}
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={styles.drinkTypeSide}
                    contentContainerStyle={styles.drinkTypeContent} 
                >
                    {sideOptions.map((option, index) => (
                        <Pressable 
                            key={option} 
                            style={styles.topOptionButton}
                            onPress={() => console.log(`Side Option: ${option} selected`)}
                        >
                            <Text style={styles.topText}>{option}</Text>
                        </Pressable>
                    ))}
                </ScrollView>

            </View>

            {/* 3. Menu Grid (실제 메뉴 목록) */}
            <View style={styles.bottomContainer}>
                
                <View style={styles.menuGrid}>
                    {menuItems.map((item) => (
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