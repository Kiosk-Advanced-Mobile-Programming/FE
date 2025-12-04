import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// 💡 요청하신 색상 정의
const COLOR_YELLOW = '#E9CB11'; // 메인 노란색 (장바구니 배경)
const COLOR_RED = '#86040fff'; // 빨간색 계열 (경계선 등)
const COLOR_ORANGE = '#FFC107'; // 주황색 (활성 옵션 버튼 배경, 결제 버튼)
const COLOR_WHITE = '#FFFFFF';
const COLOR_BLACK = '#333333';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: COLOR_WHITE,
        paddingTop: 0,
    },

    topContainer: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_RED,
        width: '100%',
    },

    drinkType: {
        height: 50,
        marginBottom: 10,
        width: '100%',
    },

    drinkTypeSide: {
        height: 50,
        width: '100%',
    },
    
    // 좌우 패딩을 제거하여 버튼이 끝까지 늘어나게 합니다.
    drinkTypeFixedRow: {
        flexDirection: 'row',
        paddingHorizontal: 0, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    topOptionButtonFixed: {
        flex: 1,
        paddingVertical: 8,
        // 버튼 간격/라운딩 제거 (서로 붙고 각짐)
        marginHorizontal: 0, 
        borderRadius: 0, 
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1, 
        borderLeftColor: '#CCCCCC',
    },

    // 상단 옵션 버튼 활성 스타일 (선택 시)
    topOptionButtonActive: {
        backgroundColor: COLOR_ORANGE, 
        borderWidth: 0, 
        borderColor: COLOR_RED, 
    },

    topText: {
        fontSize: 13,
        fontWeight: 'normal',
        color: COLOR_BLACK,
    },

    topTextActive: {
        fontWeight: 'bold',
        color: COLOR_WHITE,
    },

    contentContainer: { 
        flex: 1,
        padding: 0,
        paddingBottom: 80, 
    },
    
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: 20,
        marginHorizontal: 10,
    },

    menuContainer: {
        width: (width - 40) / 2,
        height: 200,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: COLOR_WHITE,
        borderRadius: 8,
        padding: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        shadowColor: COLOR_BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },

    menuImagePlaceholder: {
        width: '100%',
        height: '70%',
        aspectRatio: 1,
        backgroundColor: '#FFD700', 
        borderRadius: 6,
        marginBottom: 5,
    },

    menuTextName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2,
    },

    menuTextPrice: {
        fontSize: 13,
        color: COLOR_BLACK,
        fontWeight: '700',
    },
    
    // 장바구니 하단바 스타일
    cartFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80, 
        backgroundColor: COLOR_YELLOW, // 노란색
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        shadowColor: COLOR_BLACK,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    cartInfoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartBadge: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cartBadgeText: {
        color: COLOR_YELLOW, 
        fontWeight: 'bold',
        fontSize: 16,
    },
    cartCountText: { 
        color: COLOR_BLACK,
        fontSize: 14,
        fontWeight: '400',
    },
    cartPriceText: {
        color: COLOR_BLACK,
        fontSize: 18, 
        fontWeight: 'bold',
    },

    // 💡 [수정됨] 장바구니 버튼 그룹
    cartButtonsRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0, // 👈 추가 또는 확인: 공간이 부족해도 버튼이 축소되지 않도록
        justifyContent: 'flex-end',
    },

    // 💡 초기화 버튼 스타일
    clearCartButton: {
        backgroundColor: COLOR_WHITE, 
        width: 40, 
        height: 40, 
        marginRight: 10, 
        justifyContent: 'center', // 👈 확인
        alignItems: 'center', // 👈 확인
        borderRadius: 5,
    },
    clearCartButtonText: {
        color: COLOR_BLACK, 
        fontSize: 20, 
        fontWeight: 'bold',
    },

    // === 기존 스타일: 결제하기 버튼 ===
    checkoutButton: {
        backgroundColor: COLOR_ORANGE, // 주황색
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        minWidth: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0, // 크기가 줄어들지 않도록 보호
    },
    checkoutButtonText: {
        color: COLOR_WHITE, 
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;