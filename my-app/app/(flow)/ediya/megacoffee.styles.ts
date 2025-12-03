import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

// --- 새로운 테마 색상 정의 ---
const PRIMARY_BLUE = '#243C84'; 
const PRIMARY_WHITE = '#FFFFFF';
const BORDER_COLOR = 'black'; // 요청하신 검정색 테두리

// 💡 기존의 모든 수치는 유지합니다.
const COLOR_YELLOW = '#E9CB11'; 
const COLOR_RED = '#86040fff'; 
const COLOR_ORANGE = '#FFC107'; 
const COLOR_WHITE = '#FFFFFF';
const COLOR_BLACK = '#333333';

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: PRIMARY_WHITE,
        paddingTop: 0,
    },

    topContainer: {
        paddingHorizontal: 0,
        paddingVertical: 5, // 기존 수치 유지
        borderBottomWidth: 1, // 기존 수치 유지
        borderBottomColor: BORDER_COLOR, // 검정색 테두리
        width: '100%',
    },

    // 1행 버튼 컨테이너
    drinkType: {
        height: 40, // 기존 수치 유지
        marginBottom: 0, // 기존 수치 유지
        width: '100%',
    },

    // 2행 버튼 컨테이너
    drinkTypeSide: {
        height: 45, // 기존 수치 유지
        width: '100%',
    },
    
    // 4x2 배치를 위한 기본 행 스타일
    drinkTypeFixedRow: {
        flexDirection: 'row',
        paddingHorizontal: 10, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    topOptionButtonFixed: {
        flexBasis: '25%', // 기존 수치 유지
        flexGrow: 0,
        flexShrink: 0,

        paddingVertical: 8, // 기존 수치 유지
        marginHorizontal: 2, // 기존 수치 유지
        borderRadius: 8, // 둥글게 처리
        backgroundColor: PRIMARY_WHITE, // 흰색 배경
        justifyContent: 'center',
        alignItems: 'center',
        
        borderWidth: 1, // 기존 수치 유지
        borderColor: BORDER_COLOR, // 검정색 얇은 테두리
    },

    // 상단 옵션 버튼 활성 스타일 (선택 시)
    topOptionButtonActive: {
        backgroundColor: PRIMARY_BLUE, // 파란색 배경
        borderWidth: 1, // 기존 수치 유지
        borderColor: PRIMARY_BLUE, // 파란색 테두리
    },

    topText: {
        fontSize: 14, // 기존 수치 유지
        fontWeight: 'normal',
        color: BORDER_COLOR, // 검정으로
        textAlign: 'center',
    },

    topTextActive: {
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // 활성 시 흰색 텍스트
    },

    contentContainer: { 
        flex: 1,
        padding: 0, // 기존 수치 유지
        paddingBottom: 80, // 기존 수치 유지
    },
    
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingBottom: 20, // 기존 수치 유지
        marginHorizontal: 10, // 기존 수치 유지
    },

    menuContainer: {
        width: (width - 50) / 3, // 기존 수치 유지
        marginRight: 10, // 기존 수치 유지
        marginBottom: 10, // 기존 수치 유지
        backgroundColor: PRIMARY_WHITE,
        borderRadius: 8, // 기존 수치 유지
        padding: 5, // 기존 수치 유지
        borderWidth: 1, // 기존 수치 유지
        borderColor: BORDER_COLOR, // 검정색 얇은 테두리
        alignItems: 'center',
        shadowColor: COLOR_BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // 기존 수치 유지
        shadowRadius: 1, // 기존 수치 유지
        elevation: 2, // 기존 수치 유지
    },

    menuImagePlaceholder: {
        // 💡 깨짐 방지를 위해 width, height, aspectRatio 속성 유지
        width: '100%',
        height: '70%', // height: '70%' 대신 aspectRatio와 함께 사용
        aspectRatio: 1, 
        backgroundColor: PRIMARY_BLUE, // 파란색으로 변경
        borderRadius: 6, // 기존 수치 유지
        marginBottom: 5, // 기존 수치 유지
    },

    menuTextName: {
        fontSize: 14, // 기존 수치 유지
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2, // 기존 수치 유지
    },

    menuTextPrice: {
        fontSize: 13, // 기존 수치 유지
        color: PRIMARY_BLUE, // 파란색 강조색으로 변경
        fontWeight: '700', // 기존 수치 유지
    },
    
    // 장바구니 하단바 스타일 
    cartFooter: {
        position: 'absolute',
        bottom: 0, // 기존 수치 유지
        width: '100%',
        height: 80, // 기존 수치 유지
        backgroundColor: PRIMARY_BLUE, // 파란색으로 변경
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 15, // 기존 수치 유지
        borderTopLeftRadius: 10, // 기존 수치 유지
        borderTopRightRadius: 10, // 기존 수치 유지
        shadowColor: COLOR_BLACK,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2, // 기존 수치 유지
        shadowRadius: 3, // 기존 수치 유지
        elevation: 5, // 기존 수치 유지
    },
    cartInfoLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartBadge: {
        backgroundColor: PRIMARY_WHITE, // 흰색 유지
        borderRadius: 15, // 기존 수치 유지
        width: 30, // 기존 수치 유지
        height: 30, // 기존 수치 유지
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10, // 기존 수치 유지
    },
    cartBadgeText: {
        color: PRIMARY_BLUE, // 파란색으로 변경
        fontWeight: 'bold',
        fontSize: 16, // 기존 수치 유지
    },
    cartCountText: { 
        color: COLOR_BLACK, // 검은색 유지
        fontSize: 14, // 기존 수치 유지
        fontWeight: '400', // 기존 수치 유지
    },
    cartPriceText: {
        color: PRIMARY_WHITE, // 흰색으로 변경 (파란색 배경 위)
        fontSize: 18, // 기존 수치 유지
        fontWeight: 'bold',
    },

    cartButtonsRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
        justifyContent: 'flex-end',
    },

    clearCartButton: {
        backgroundColor: PRIMARY_WHITE, // 흰색 유지
        width: 40, // 기존 수치 유지
        height: 40, // 기존 수치 유지
        marginRight: 10, // 기존 수치 유지
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5, // 기존 수치 유지
    },
    clearCartButtonText: {
        color: COLOR_BLACK, // 검은색 유지
        fontSize: 20, // 기존 수치 유지
        fontWeight: 'bold',
    },

    checkoutButton: {
        backgroundColor: PRIMARY_WHITE, // 흰색으로 변경 (파란색 배경 위에서 잘 보이도록)
        paddingVertical: 10, // 기존 수치 유지
        paddingHorizontal: 20, // 기존 수치 유지
        borderRadius: 5, // 기존 수치 유지
        minWidth: 100, // 기존 수치 유지
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    checkoutButtonText: {
        color: PRIMARY_BLUE, // 파란색으로 변경
        fontSize: 18, // 기존 수치 유지
        fontWeight: 'bold',
    },
});

export default styles;