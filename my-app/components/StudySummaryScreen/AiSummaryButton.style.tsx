import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  label: {
    fontSize: 14,
    color: "#5B4E73",
    marginBottom: 6,
  },
  button: {
    marginTop: 4,
    backgroundColor: "#6D4AFF",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  summaryBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  summaryText: {
    fontSize: 15,
    color: "#3C304F",
    lineHeight: 22,
  },
  errorText: {
    fontSize: 12,
    color: "#D32F2F",
    marginBottom: 4,
  },
});
