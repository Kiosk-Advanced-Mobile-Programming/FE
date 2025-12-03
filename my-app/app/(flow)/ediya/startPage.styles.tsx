import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    // 화면 전체를 꽉 채우는 컨테이너 스타일
    fullScreenContainer: {
        flex: 1,
        // 이 컴포넌트가 라우터에 의해 단독으로 렌더링되므로 absolute 대신 flex를 사용합니다.
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // 팝업 배경 색상
    },
    // 화면 전체를 덮는 이미지 스타일
    popupImageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // 이미지가 화면을 꽉 채우도록 설정
    },
});

export default styles;