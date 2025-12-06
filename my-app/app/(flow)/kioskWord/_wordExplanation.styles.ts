import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
    marginBottom: 30,
  },
  wordListContainer: {
    marginBottom: 40,
  },
  wordCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: Colors.light.tint,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  wordText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  // 다이얼로그 (Modal) 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    maxHeight: "60%",
  },
  dialogTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.light.tint,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.tint,
    paddingBottom: 5,
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
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  dialogCloseText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  // AI 질문 영역 스타일
  aiContainer: {
    marginTop: "auto", // 화면 하단에 고정
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  aiHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.light.text,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  // AI 답변 모달 로딩 화면 스타일 (추가/수정됨)
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
    marginTop: 10,
  },
});
