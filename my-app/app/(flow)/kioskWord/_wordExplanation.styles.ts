import { Colors } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 20,
  },

  // [수정] AI 질문 영역 스타일 (상단 배치용)
  aiContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    // 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  aiHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.light.tint,
  },
  aiSubHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },

  // 구분선
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginBottom: 30,
  },

  // [수정] 하단 단어 리스트 영역
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  wordListContainer: {
    marginBottom: 20,
  },
  wordCard: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: Colors.light.tint,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  wordText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#333",
  },

  // 다이얼로그 (Modal) 스타일 (기존 유지)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  dialogExplanation: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
  },
  dialogCloseButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  dialogCloseText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // 로딩 스타일
  loadingContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.tint,
    fontWeight: "600",
    marginTop: 15,
  },
});
