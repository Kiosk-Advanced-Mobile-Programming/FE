import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const modalStyles = StyleSheet.create({
    // 전체 화면을 덮는 페이지 스타일
    pageWrap: {
        flex: 1,
        backgroundColor: 'white', 
        paddingTop: 0, 
    },

    // 상단 경고/안내 바
    modalHeaderBar: {
        backgroundColor: '#ffc107', // 노란색 배경
        paddingHorizontal: 15, // 좌우 패딩 추가
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60, 
    },
    // 중앙 헤더 텍스트
    modalHeaderBarText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        flex: 1, 
        textAlign: 'center', // 중앙 정렬
    },
    // ⭐ [추가] 닫기 버튼과 대칭을 맞추기 위한 Spacer
    headerSpacer: {
        width: 30, // 닫기 버튼과 비슷한 너비
    },
    // ⭐ [수정] 닫기 버튼 위치를 flow에 맞게 변경 (absolute 제거)
    modalCloseButton: {
        padding: 5,
    },
    modalCloseIcon: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
        borderBottomColor: '#eee',
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
        fontSize: 16, // ⭐ [수정] 폰트 크기 조정
        fontWeight: 'bold',
        marginRight: 8, // ⭐ [수정] 간격 조정
        color: '#666',
        // ⭐ [추가] 순번과 이름이 한 줄에 깔끔하게 보이도록 설정
        minWidth: 20, 
    },
    modalItemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    modalItemBasePrice: {
        fontSize: 13,
        color: '#888',
        marginLeft: 5,
    },

    // 옵션 목록 컨테이너 (상품명 아래)
    modalOptionList: {
        paddingLeft: 28, // 인덱스와 이름 간격에 맞게 들여쓰기 조정
        width: '100%',
    },
    modalOptionItem: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    modalOptionText: {
        fontSize: 13,
        color: '#666',
    },
    modalOptionPrice: {
        fontSize: 13,
        color: '#ff9800', 
        fontWeight: 'bold',
    },

    // ⭐ [수정] 수량 및 가격 영역 (수량 조절 버튼 제거)
    modalItemControlWrap: {
        flexDirection: 'column', 
        alignItems: 'flex-end', 
        minWidth: 80, // 너비 줄임
    },
    // ⭐ [추가] 수량 조절 버튼 없이 수량만 표시
    quantityTextNoControl: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8, 
        color: '#666',
    },
    // --- 수량 조절 버튼 관련 스타일 제거 ---
    modalItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        minWidth: 70, 
        textAlign: 'right',
    },

    // 하단 안내 문구
    modalNoticeText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 14,
        paddingVertical: 20,
        fontWeight: 'bold',
    },

    // 하단 푸터 영역
    modalFooter: {
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: 'white',
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
        color: '#666',
        fontWeight: '600',
    },
    modalSummaryTextTotal: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    modalSummaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    modalSummaryValueTotal: {
        fontSize: 22, 
        fontWeight: 'bold',
        color: '#ff6f00', 
    },

    // 액션 버튼 영역
    modalActionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80, 
    },
    modalActionButtonBack: {
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
        borderRadius: 5,
        marginRight: 5,
    },
    modalActionButtonEat: {
        backgroundColor: '#ffc107',
        justifyContent: 'center',
        alignItems: 'center',
        width: '41%', 
        borderRadius: 5,
        marginRight: 5,
    },
    modalActionButtonTakeout: {
        backgroundColor: '#ff9800',
        justifyContent: 'center',
        alignItems: 'center',
        width: '41%', 
        borderRadius: 5,
    },
    modalActionButtonText: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#333', 
    },
    modalActionButtonSubText: {
        fontSize: 12,
        color: '#333', 
        marginTop: -5,
        fontWeight: '500',
    }
});

export default modalStyles;