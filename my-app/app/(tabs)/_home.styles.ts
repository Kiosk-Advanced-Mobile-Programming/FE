import { Colors } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

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
    flexDirection: "row", // 가로 배치
    justifyContent: "space-between", // 양쪽 끝 정렬
    alignItems: "center", // 세로 중앙 정렬
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  // 마이페이지 버튼 스타일 (추가됨)
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
});
