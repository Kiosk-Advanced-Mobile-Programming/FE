import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const modalStyles = StyleSheet.create({
    // 전체 화면을 덮는 페이지 스타일 (firstpopup과 동일)
    pageWrap: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 0, 
    },

    // 1. 상단 헤더 바 (생략: 변경 없음)
    modalHeaderBar: {
        backgroundColor: '#ffc107',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60, 
    },
    modalHeaderBarText: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center',
    },
    headerSpacer: {
        width: 30, 
    },
    modalCloseButton: {
        padding: 5,
    },
    modalCloseIcon: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#333',
    },

    // 2. 중앙 컨텐츠 영역 (핵심 수정: 좌측 상단으로 정렬)
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start', // 세로: 상단 시작
        alignItems: 'flex-start', // 가로: 좌측 시작 (이전 'center'에서 변경)
        paddingHorizontal: 20,
        paddingTop: 30, 
    },
    
    // 금액 및 할부 정보 컨테이너 (contentContainer에 맞춰 100% 너비 사용)
    summaryContainer: {
        width: '100%', // 부모 컨테이너 너비를 따라감 (이전 maxWidth 설정 삭제)
        backgroundColor: '#f5f5f5', 
        padding: 20,
        borderRadius: 10,
        marginBottom: 30, 
        // alignSelf: 'center' 속성 제거
    },
    
    // 금액/할부 정보를 담는 하나의 행
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Key(좌)와 Value(우)를 양 끝에 정렬
        alignItems: 'center',
        paddingVertical: 10, 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    summaryRowLast: {
        borderBottomWidth: 0,
    },

    // 키 텍스트 (총 주문 금액, 할부일수)
    summaryKeyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    
    // 값 텍스트 (가격, 금액 강조 스타일)
    summaryValueText: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#ff6f00', 
    },
    // 일반 값 텍스트 (일시불)
    summaryValueNormalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },

    // 3. 하단 액션 버튼 영역 (생략: 변경 없음)
    actionButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80, 
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    actionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        height: '100%',
        marginHorizontal: 5, 
    },
    cancelButton: {
        backgroundColor: '#ccc',
        marginRight: 10, 
    },
    approveButton: {
        backgroundColor: '#ff6f00',
    },
    buttonText: {
        fontSize: 22, 
        fontWeight: 'bold',
        color: 'white',
    },
});

export default modalStyles;