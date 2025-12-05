import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },

    // ScrollView의 컨텐츠 컨테이너 스타일
    scrollContent: {
        paddingBottom: 100, // 하단 버튼(minHeight: 80)을 위해 충분한 공간 확보
    },

    // [전체 행 공통 스타일]
    rowContainer: {
        width: '100%',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        justifyContent: 'center',
        minHeight: 80,
        backgroundColor: '#FFFFFF',
    },

    // 1. 헤더 (타이틀 및 X 버튼)
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
        paddingTop: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    closeButton: {
        padding: 10,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#888888',
    },

    // 2. 메뉴 정보 및 가격
    menuInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 100,
        paddingVertical: 15,
    },
    menuDetailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuImagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#FFD700',
        borderRadius: 8,
        marginRight: 10,
    },
    menuNameText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111111',
    },
    menuDetailRight: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    priceLabel: {
        fontSize: 14,
        color: '#888888',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A73E8',
    },

    // 3, 4, 5, 6. 옵션 섹션
    optionSectionRow: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingVertical: 15,
        minHeight: 120,
    },
    optionSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 10,
    },
    optionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'flex-start',
    },
    
    // [옵션 버튼 - 한 줄 5개 배치]
    optionButton: {
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginRight: 5,
        marginBottom: 8,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionButtonFiveCol: {
        // 5열 배치 계산: (전체 너비 - 좌우 패딩 30) / 5 - 마진 5
        width: (width - 30) / 5 - 5,
        minHeight: 50,
    },
    optionButtonActive: {
        backgroundColor: '#1A73E8',
        borderWidth: 1,
        borderColor: '#0D47A1',
    },
    optionText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    optionPriceText: {
        fontSize: 12,
        color: '#666666',
        fontWeight: '600',
    },
    optionTextActive: {
        color: '#FFFFFF',
    },

    // 하단 버튼 영역을 밀어내는 spacer View
    spacer: {
        height: 100,
        backgroundColor: 'transparent',
    },

    // 7. 버튼 컨테이너 (하단 고정)
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 80,
        borderTopWidth: 1,
        borderTopColor: '#DDDDDD',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 10,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#AAAAAA',
        paddingVertical: 15,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    orderButton: {
        flex: 1.5,
        backgroundColor: '#1A73E8',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;