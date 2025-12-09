import { Colors } from "@/constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// 모달의 실제 너비 계산 (화면의 95%)
const MODAL_WIDTH = width * 0.95;
// 영상의 높이 계산 (16:9 비율)
const VIDEO_HEIGHT = MODAL_WIDTH * (9 / 16);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  myPageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  myPageText: {
    fontSize: 14,
    color: "#555",
    marginRight: 6,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555",
    marginBottom: 24,
    lineHeight: 30,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
    backgroundColor: "#fafafa",
  },
  cardContent: {
    flex: 1,
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },

  // 모달 오버레이 스타일 (중앙 정렬)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  // 닫기 버튼 (화면 우측 상단 플로팅)
  floatingCloseButton: {
    position: "absolute",
    top: 60, // 상태바 등에 가려지지 않도록 여유 있게 설정
    right: 20,
    zIndex: 100, // 최상위 표시
    padding: 10,
  },

  // 비디오 모달 컨테이너
  videoModalContainer: {
    width: 370, // 계산된 너비 적용
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  // 비디오 플레이어 영역 (16:9 비율 유지)
  videoModalPlayerContainer: {
    //width: MODAL_WIDTH,
    height: 210, // 16:9 비율 높이 강제 지정
    backgroundColor: "#000",
  },
  videoPlayerModal: {
    width: "100%",
    height: "100%",
    // 만약 영상 원본 비율이 16:9가 아니라면 아래 값을 조정하세요.
    // borderRadius를 줘서 모서리가 튀어나가지 않게 할 수도 있습니다.
  },
});
