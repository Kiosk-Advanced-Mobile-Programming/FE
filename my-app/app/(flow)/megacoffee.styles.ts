// app/(flow)/megacoffee.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#FFFFFF', // 배경 흰색
        paddingTop: 0, // 상단 노치바 등을 위한 기본 패딩
    },


    topContainer: {
        height: 100,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',

        borderWidth: 1,
        borderColor: 'black',
    },

    drinkType: {
        height: 30, 
        justifyContent: 'center',
    },
    
    drinkTypeSide: {
        height: 30, 
        justifyContent: 'center',
    },
    
    topText: {
        fontSize: 16,
        fontWeight: 'bold',
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