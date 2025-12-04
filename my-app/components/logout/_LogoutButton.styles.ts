import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // 기존 버튼 스타일
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#FF5252",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

  // 모달 스타일 (LoginPage와 유사하게 구성)
  dialogOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // 반투명 검은 배경
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  dialogContainer: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    // 그림자 효과
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  dialogMessage: {
    fontSize: 15,
    marginBottom: 20,
    color: "#666",
  },
  dialogButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  dialogButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: "#FF5252",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
