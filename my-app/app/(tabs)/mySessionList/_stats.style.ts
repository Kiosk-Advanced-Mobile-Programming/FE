import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 60,
    backgroundColor: "#F3F2F4",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
    color: "#333",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // alignItems 추가
    padding: 24,
  },

  // [추가] 상단 요약 통계 컨테이너
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  // [추가] 요약 박스 (성공/실패)
  summaryBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    // 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  summaryCountSuccess: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50", // 초록색
  },
  summaryCountFail: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E53935", // 빨간색
  },

  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0D6FF",
  },
  itemCategory: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#2E213F",
  },
  itemDate: {
    fontSize: 14,
    color: "#6A617A",
    marginBottom: 4,
  },
  itemSuccess: {
    fontSize: 16,
    fontWeight: "600", // 500 -> 600으로 약간 강조
    // color는 stats.tsx에서 동적으로 처리
  },
});
