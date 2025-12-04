import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#6d4aff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#4a8dff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  // 커스텀 Alert 모달용 스타일 (쓸 거면)
  dialogOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
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
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dialogMessage: {
    fontSize: 14,
    marginBottom: 16,
  },
  dialogButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#6d4aff",
  },
  dialogButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
