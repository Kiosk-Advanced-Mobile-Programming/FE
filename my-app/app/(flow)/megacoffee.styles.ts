// app/(flow)/megacoffee.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        paddingTop: 0, 
    },


    topContainer: {
        // 2개의 행 (50px * 2) + 간격 (10px * 1) + 상하 패딩 (10px) = 120px
        height: 120, 
        width: '100%',
        paddingHorizontal: 5, 
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },

    // *** ScrollView Content Style (오류 해결용) ***
    drinkTypeContent: {
        alignItems: 'center', // 내부 아이템을 수직 중앙 정렬
    },

    // 1. Drink Type Row
    drinkType: {
        height: 50, 
        marginBottom: 10, // Side Options 행과의 간격
    },
    
    // 2. Side Options Row
    drinkTypeSide: {
        height: 50, 
    },

    topOptionButton: {
        // Style for the individual option buttons
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#E6F3FF', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1A73E8', 
    },

    bottomContainer: {
        flex: 1,
        padding: 10,
    },
    
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },


    menuContainer: {
        width: '23%',
        aspectRatio: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    menuText: {
        fontSize: 14,
    }

});

export default styles;