import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// 콘텐츠 영역의 총 너비: width - (paddingHorizontal 20 * 2) = width - 40
const contentWidth = width - 40; 
// 2/3 너비: (width - 40) * 2 / 3
const twoThirdsWidth = contentWidth * 2 / 3;
// 버튼 사이 간격
const buttonGap = 10; 
// 2/3 너비 내에서 2개의 버튼이 가질 수 있는 너비
const buttonWidthTwoThirds = (twoThirdsWidth - buttonGap) / 2;


const modalStyles = StyleSheet.create({
    // 전체 화면을 덮는 페이지 스타일
    pageWrap: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 0, 
    },

    // 1. 최상단 헤더 바
    modalHeaderBar: {
        backgroundColor: '#ffc107', // 노란색 배경
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
        paddingLeft: 30, // X 버튼 공간 확보
    },
    modalCloseButton: {
        padding: 5,
        width: 30, // 너비 고정
        alignItems: 'flex-end',
    },
    modalCloseIcon: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#333',
    },

    // 메인 콘텐츠 스크롤 영역
    modalContentScroll: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    
    // 섹션 타이틀 (STEP1, STEP2)
    stepTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        paddingVertical: 10,
        backgroundColor: '#ffc107', // 이미지와 유사한 노란색 배경
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    mt20: {
        marginTop: 20,
    },
    
    // 버튼 활성화 시 스타일 (모든 버튼에 공통 적용 가능)
    paymentButtonActive: {
        borderColor: '#ff6f00', 
        borderWidth: 2,
        backgroundColor: '#fff7e6', 
    },

    // 3. 제휴 할인 버튼 (KT, T우주)
    allianceButtonRow: {
        flexDirection: 'row',
        // [수정] 왼쪽 정렬
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    allianceButton: {
        // [수정] 전체 너비의 2/3 내에서 2개의 버튼 너비 계산
        width: buttonWidthTwoThirds,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginRight: buttonGap, // 버튼 사이 간격 추가
    },
    allianceIcon: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6f00',
        marginBottom: 5,
    },
    allianceMainText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    allianceSubText: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    // 5. 카드결제, 앱카드 (Large Button)
    largePayButtonRow: {
        flexDirection: 'row',
        // [수정] 왼쪽 정렬
        justifyContent: 'flex-start',
        marginBottom: 15,
    },
    largePayButton: {
        // [수정] 전체 너비의 2/3 내에서 2개의 버튼 너비 계산
        width: buttonWidthTwoThirds,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginRight: buttonGap, // 버튼 사이 간격 추가
    },
    largePayIcon: {
        fontSize: 40,
        marginBottom: 8,
    },
    largePayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    largePaySubText: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },

    // 6. 간편 결제 버튼 Grid
    simplePayGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // 왼쪽 정렬
        marginBottom: 15,
    },
    smallPayButton: {
        width: (width) / 5, // 전체 너비 - (좌우 패딩 40) - (간격 20) / 4개
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 10,
        marginBottom: 5,
        marginRight: 5, // 버튼 간격
        backgroundColor: '#fff',
        aspectRatio: 1, // 정사각형 유지
    },
    smallPayIcon: {
        fontSize: 20,
        marginBottom: 5,
    },
    smallPayText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },

    // 7. 쿠폰사용, 메가선물페이 (Other Button)
    otherButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // 왼쪽 정렬 유지
        marginBottom: 20,
    },
    otherButton: {
        // 이 버튼도 3, 5와 동일한 너비로 설정하여 통일성을 유지합니다.
        width: buttonWidthTwoThirds,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 15,
        backgroundColor: '#fff',
        marginRight: buttonGap, // 버튼 사이 간격 추가
    },
    otherButtonIcon: {
        fontSize: 28,
        marginBottom: 5,
    },
    otherButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },

    // 8. 하단 최종 주문 금액
    modalFooter: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f9f9f9', // 배경색 지정
    },
    footerSummary: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    footerSummaryText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 10,
    },
    footerTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    footerTotalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    footerTotalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6f00',
    },
});

export default modalStyles;