import { Colors } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.light.background, // [삭제] 배경 이미지가 보이도록 배경색 제거
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    // [참고] 만약 글자가 배경에 묻혀 잘 안 보이면, 여기에 'backgroundColor: "rgba(255,255,255,0.8)"' 정도만 추가하셔도 좋습니다.
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 50,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: "100%",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  loginButton: {
    width: "100%",
    height: 56,
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  signupButton: {
    width: "100%",
    height: 56,
    backgroundColor: Colors.light.primaryLight,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  // signupButton: {
  //   width: "100%",
  //   height: 56,
  //   backgroundColor: "transparent",
  //   borderRadius: 14,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderWidth: 1,
  //   borderColor: Colors.light.primary,
  // },
  // signupButtonText: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: Colors.light.primary,
  // },
});

export default styles;
