// testpage.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // 전체 화면을 차지하는 컨테이너
    container: {
        flex: 1, // 전체 공간을 차지
        backgroundColor: '#ffffffff', // 배경색
        // 버튼 그룹을 화면 중앙에 배치하기 위한 설정
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
    },
    
    // 버튼 4개가 들어갈 그룹 컨테이너
    buttonGroup: {
        width: 500, // 그룹의 너비 지정 (버튼 크기 조절)
        padding: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // 개별 버튼 스타일
    button: {
        backgroundColor: '#007AFF', // 파란색 배경 (iOS 기본색)
        paddingVertical: 50,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10, // 버튼 간 세로 간격
        // width: '100%', // buttonGroup의 너비를 따름
        alignItems: 'center', // 텍스트 중앙 정렬
    },

    // 버튼 텍스트 스타일
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default styles;