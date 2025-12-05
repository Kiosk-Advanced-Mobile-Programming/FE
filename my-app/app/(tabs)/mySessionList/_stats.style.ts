import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 24, backgroundColor: "#F3F2F4" },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
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
    fontWeight: "500",
    color: "#4CAF50",
  },
});
