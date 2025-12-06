import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
    paddingTop: 60, // 상단 여백
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: Colors.light.text,
  },
  infoContainer: {
    marginBottom: 30,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    // 그림자 효과
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  lastRow: {
    marginBottom: 0,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    width: 100,
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  passwordContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyeButton: {
    padding: 5,
  },
  eyeText: {
    fontSize: 18,
  },
  logoutButtonContainer: {
    marginTop: "auto", // 화면 하단부로 밀어내기
    marginBottom: 40,
  },
  // 로딩 상태 스타일
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
