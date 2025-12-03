import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// --- 새로운 테마 색상 정의 ---
const PRIMARY_BLUE = '#243C84'; // 메인 파란색
const DARK_BLUE = '#1F336F'; // 보조 파란색 (액션 버튼 구분을 위해 사용)
const PRIMARY_WHITE = 'white';

const modalStyles = StyleSheet.create({
    // 전체 화면을 덮는 페이지 스타일
    pageWrap: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 0, 
    },

    // 상단 경고/안내 바
    modalHeaderBar: {
        backgroundColor: PRIMARY_BLUE, // ✅ #ffc107 -> 파란색으로 변경
        paddingHorizontal: 15, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60, 
    },
    // 중앙 헤더 텍스트
    modalHeaderBarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
        flex: 1, 
        textAlign: 'center', 
    },
    // ⭐ [추가] 닫기 버튼과 대칭을 맞추기 위한 Spacer
    headerSpacer: {
        width: 30, 
    },
    // ⭐ [수정] 닫기 버튼 위치를 flow에 맞게 변경 (absolute 제거)
    modalCloseButton: {
        padding: 5,
    },
    modalCloseIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
    },

    // 주문 항목 스크롤 영역
    modalContentScroll: {
        flex: 1,
        paddingHorizontal: 15,
    },
    modalCartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // 기존 수치 유지 (회색)
    },
    
    // 상품 상세 정보 컨테이너 (이름 + 옵션)
    modalItemDetails: {
        flex: 1, 
        marginRight: 15,
    },

    // 상품 이름 라인 (순번과 상품명 같은 열에 정렬)
    modalItemNameLine: {
        flexDirection: 'row',
        alignItems: 'baseline', 
        marginBottom: 5,
    },
    modalItemIndex: {
        fontSize: 16, 
        fontWeight: 'bold',
        marginRight: 8, 
        color: '#666', // 기존 수치 유지
        minWidth: 20, 
    },
    modalItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // 기존 수치 유지
    },
    modalItemBasePrice: {
        fontSize: 13,
        color: '#888', // 기존 수치 유지
        marginLeft: 5,
    },

    // 옵션 목록 컨테이너 (상품명 아래)
    modalOptionList: {
        paddingLeft: 28, 
        width: '100%',
    },
    modalOptionItem: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    modalOptionText: {
        fontSize: 13,
        color: '#666', // 기존 수치 유지
    },
    modalOptionPrice: {
        fontSize: 13,
        color: PRIMARY_BLUE, // ✅ #ff9800 -> 파란색으로 변경
        fontWeight: 'bold',
    },

    // 수량 및 가격 영역
    modalItemControlWrap: {
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        minWidth: 80, 
    },
    // 수량 조절 버튼 없이 수량만 표시
    quantityTextNoControl: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8, 
        color: '#666', // 기존 수치 유지
    },
    modalItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // 기존 수치 유지
        minWidth: 70, 
        textAlign: 'right',
    },

    // 하단 안내 문구
    modalNoticeText: {
        textAlign: 'center',
        color: 'red', // 기존 수치 유지
        fontSize: 14,
        paddingVertical: 20,
        fontWeight: 'bold',
    },

    // 하단 푸터 영역
    modalFooter: {
        borderTopWidth: 1,
        borderTopColor: '#ddd', // 기존 수치 유지 (회색)
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: 'white', // 기존 수치 유지
    },
    
    // 요약 정보를 한 줄씩 명확하게 분리
    modalSummary: {
        justifyContent: 'center',
        marginBottom: 15,
    },
    modalSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 3,
    },
    modalSummaryText: {
        fontSize: 16,
        color: '#666', // 기존 수치 유지
        fontWeight: '600',
    },
    modalSummaryTextTotal: {
        fontSize: 18,
        color: '#333', // 기존 수치 유지
        fontWeight: 'bold',
    },
    modalSummaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333', // 기존 수치 유지
    },
    modalSummaryValueTotal: {
        fontSize: 22, 
        fontWeight: 'bold',
        color: PRIMARY_BLUE, // ✅ #ff6f00 -> 파란색으로 변경
    },

    // 액션 버튼 영역
    modalActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80, 
    },
    modalActionButtonBack: {
        backgroundColor: '#ccc', // 기존 수치 유지 (회색)
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        borderRadius: 5,
        marginRight: 5,
    },
    modalActionButtonEat: {
        backgroundColor: DARK_BLUE, // ✅ #ffc107 -> 보조 파란색으로 변경
        justifyContent: 'center',
        alignItems: 'center',
        width: '41%', 
        borderRadius: 5,
        marginRight: 5,
    },
    modalActionButtonTakeout: {
        backgroundColor: PRIMARY_BLUE, // ✅ #ff9800 -> 메인 파란색으로 변경
        justifyContent: 'center',
        alignItems: 'center',
        width: '41%', 
        borderRadius: 5,
    },
    modalActionButtonText: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
    },
    modalActionButtonSubText: {
        fontSize: 12,
        color: PRIMARY_WHITE, // ✅ #333 -> 흰색으로 변경 (파란색 배경 대비)
        marginTop: -5,
        fontWeight: '500',
    }
});

export default modalStyles;