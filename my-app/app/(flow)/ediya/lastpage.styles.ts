import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// 콘텐츠 영역의 총 너비: width - (paddingHorizontal 20 * 2) = width - 40
const contentWidth = width - 50; 
// 버튼 사이 간격
const buttonGap = 10; 

// ==========================================================
// ✅ 4개의 버튼이 들어갈 수 있는 새로운 너비 계산 (Correct Logic) (수치 유지)
// 4개 버튼 + 3개 간격(30px)을 전체 콘텐츠 너비(contentWidth)에 맞춥니다.
const FOUR_BUTTON_COUNT = 4;
const totalGapsForFour = buttonGap * (FOUR_BUTTON_COUNT - 1); 
const buttonWidthForFour = (contentWidth - totalGapsForFour) / FOUR_BUTTON_COUNT; 
// ==========================================================


// --- 새로운 테마 색상 정의 ---
const PRIMARY_BLUE = '#243C84'; 
const PRIMARY_WHITE = 'white';
const TEXT_DARK = '#333';
const LIGHT_BLUE_BACKGROUND = '#E0E7FF'; // 기존 #fff7e6 (밝은 노란색) 대체


const modalStyles = StyleSheet.create({
    // 전체 화면을 덮는 페이지 스타일
    pageWrap: {
        flex: 1,
        backgroundColor: 'white', // 기존 색상/수치 유지
        paddingTop: 0, // 기존 수치 유지
    },

    // 1. 최상단 헤더 바
    modalHeaderBar: {
        backgroundColor: PRIMARY_BLUE, // ✅ #ffc107 -> 파란색으로 변경
        paddingHorizontal: 15, // 기존 수치 유지
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60, // 기존 수치 유지
    },
    modalHeaderBarText: {
        fontSize: 18, // 기존 수치 유지
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
        flex: 1, // 기존 수치 유지
        textAlign: 'center',
        paddingLeft: 30, // 기존 수치 유지
    },
    modalCloseButton: {
        padding: 5, // 기존 수치 유지
        width: 30, // 기존 수치 유지
        alignItems: 'flex-end',
    },
    modalCloseIcon: {
        fontSize: 18, // 기존 수치 유지
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
    },

    // 메인 콘텐츠 스크롤 영역
    modalContentScroll: {
        flex: 1,
        paddingHorizontal: 20, // 기존 수치 유지
        paddingVertical: 15, // 기존 수치 유지
    },
    
    // 섹션 타이틀 (STEP1, STEP2)
    stepTitle: {
        fontSize: 16, // 기존 수치 유지
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
        paddingVertical: 10, // 기존 수치 유지
        backgroundColor: PRIMARY_BLUE, // ✅ #ffc107 -> 파란색으로 변경
        paddingHorizontal: 10, // 기존 수치 유지
        borderRadius: 5, // 기존 수치 유지
        marginBottom: 10, // 기존 수치 유지
    },
    mt20: {
        marginTop: 20, // 기존 수치 유지
    },
    
    // 버튼 활성화 시 스타일 (모든 버튼에 공통 적용 가능)
    paymentButtonActive: {
        borderColor: PRIMARY_BLUE, // ✅ #ff6f00 -> 파란색으로 변경
        borderWidth: 2, // 기존 수치 유지
        backgroundColor: LIGHT_BLUE_BACKGROUND, // ✅ #fff7e6 -> 밝은 파란색으로 변경
    },

    // 3. 제휴 할인 버튼 (KT, T우주)
    allianceButtonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', // 기존 수치 유지
        justifyContent: 'flex-start', // 기존 수치 유지
        marginBottom: 15, // 기존 수치 유지
    },
    allianceButton: {
        width: buttonWidthForFour, // 기존 수치 유지
        alignItems: 'center',
        borderWidth: 1, // 기존 수치 유지
        borderColor: '#ddd', // 기존 수치 유지
        borderRadius: 8, // 기존 수치 유지
        paddingVertical: 15, // 기존 수치 유지
        backgroundColor: '#fff', // 기존 수치 유지
        marginRight: buttonGap, // 기존 수치 유지
        marginBottom: buttonGap, // 기존 수치 유지
    },
    allianceIcon: {
        fontSize: 24, // 기존 수치 유지
        fontWeight: 'bold',
        color: PRIMARY_BLUE, // ✅ #ff6f00 -> 파란색으로 변경
        marginBottom: 5, // 기존 수치 유지
    },
    allianceMainText: {
        fontSize: 15, // 기존 수치 유지
        fontWeight: 'bold',
        color: TEXT_DARK, // 기존 수치 유지
    },
    allianceSubText: {
        fontSize: 12, // 기존 수치 유지
        color: '#666', // 기존 수치 유지
        marginTop: 2, // 기존 수치 유지
    },

    // 5. 카드결제, 앱카드 (Large Button)
    largePayButtonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', // 기존 수치 유지
        justifyContent: 'flex-start', // 기존 수치 유지
        marginBottom: 15, // 기존 수치 유지
    },
    largePayButton: {
        width: buttonWidthForFour, // 기존 수치 유지
        alignItems: 'center',
        borderWidth: 1, // 기존 수치 유지
        borderColor: '#ddd', // 기존 수치 유지
        borderRadius: 8, // 기존 수치 유지
        paddingVertical: 15, // 기존 수치 유지
        backgroundColor: '#fff', // 기존 수치 유지
        marginRight: buttonGap, // 기존 수치 유지
        marginBottom: buttonGap, // 기존 수치 유지
    },
    largePayIcon: {
        fontSize: 40, // 기존 수치 유지
        marginBottom: 8, // 기존 수치 유지
    },
    largePayText: {
        fontSize: 16, // 기존 수치 유지
        fontWeight: 'bold',
        color: TEXT_DARK, // 기존 수치 유지
    },
    largePaySubText: {
        fontSize: 12, // 기존 수치 유지
        color: '#666', // 기존 수치 유지
        marginTop: 2, // 기존 수치 유지
    },

    // 6. 간편 결제 버튼 Grid
    simplePayGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // 기존 수치 유지
        marginBottom: 15, // 기존 수치 유지
    },
    // smallPayButton은 이미 4열 그리드에 가깝게 설정되어 있어 수정하지 않습니다.
    smallPayButton: {
        width: (width - 40 - 20) / 4, // 기존 수치 유지
        maxWidth: 100, // 기존 수치 유지
        alignItems: 'center',
        borderWidth: 1, // 기존 수치 유지
        borderColor: '#ddd', // 기존 수치 유지
        borderRadius: 8, // 기존 수치 유지
        paddingVertical: 10, // 기존 수치 유지
        marginBottom: 10, // 기존 수치 유지
        marginRight: 5, // 기존 수치 유지
        backgroundColor: '#fff', // 기존 수치 유지
    },
    smallPayIcon: {
        fontSize: 20, // 기존 수치 유지
        marginBottom: 5, // 기존 수치 유지
    },
    smallPayText: {
        fontSize: 10, // 기존 수치 유지
        fontWeight: 'bold',
        textAlign: 'center',
        color: TEXT_DARK, // 기존 수치 유지
    },

    // 7. 쿠폰사용, 메가선물페이 (Other Button)
    otherButtonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap', // 기존 수치 유지
        justifyContent: 'flex-start', // 기존 수치 유지
        marginBottom: 20, // 기존 수치 유지
    },
    otherButton: {
        width: buttonWidthForFour, // 기존 수치 유지
        alignItems: 'center',
        borderWidth: 1, // 기존 수치 유지
        borderColor: '#ddd', // 기존 수치 유지
        borderRadius: 8, // 기존 수치 유지
        paddingVertical: 15, // 기존 수치 유지
        backgroundColor: '#fff', // 기존 수치 유지
        marginRight: buttonGap, // 기존 수치 유지
        marginBottom: buttonGap, // 기존 수치 유지
    },
    otherButtonIcon: {
        fontSize: 28, // 기존 수치 유지
        marginBottom: 5, // 기존 수치 유지
    },
    otherButtonText: {
        fontSize: 16, // 기존 수치 유지
        fontWeight: 'bold',
        color: TEXT_DARK, // 기존 수치 유지
    },

    // 8. 하단 최종 주문 금액
    modalFooter: {
        borderTopWidth: 1, // 기존 수치 유지
        borderTopColor: '#ddd', // 기존 수치 유지
        paddingHorizontal: 20, // 기존 수치 유지
        paddingVertical: 15, // 기존 수치 유지
        backgroundColor: '#f9f9f9', // 기존 수치 유지
    },
    footerSummary: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5, // 기존 수치 유지
    },
    footerSummaryText: {
        fontSize: 14, // 기존 수치 유지
        color: '#666', // 기존 수치 유지
        marginLeft: 10, // 기존 수치 유지
    },
    footerTotal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'baseline',
    },
    footerTotalText: {
        fontSize: 18, // 기존 수치 유지
        fontWeight: 'bold',
        color: TEXT_DARK, // 기존 수치 유지
        marginRight: 10, // 기존 수치 유지
    },
    footerTotalValue: {
        fontSize: 24, // 기존 수치 유지
        fontWeight: 'bold',
        color: PRIMARY_BLUE, // ✅ #ff6f00 -> 파란색으로 변경
    },
});

export default modalStyles;