import { StyleSheet } from "react-native";

// ----- 스타일 (이전과 거의 동일) -----
const BG_DARK = "#4A4648";
const CARD_BG = "#F1E6FF";
const PRIMARY = "#6D4AFF";
const SECONDARY = "#8D6BFF";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG_DARK },
  scrollContent: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 32 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  card: {
    borderRadius: 24,
    backgroundColor: CARD_BG,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
    color: "#2E213F",
  },
  dateText: { fontSize: 16, color: "#5B4E73", marginBottom: 18 },
  summaryRow: { flexDirection: "row", marginBottom: 12 },
  summaryItem: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  summaryItemWide: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  summaryLabel: { fontSize: 14, color: "#5B4E73", marginBottom: 4 },
  summaryValue: { fontSize: 22, fontWeight: "700", color: "#2E213F" },
  summaryValueSmall: { fontSize: 16, fontWeight: "500", color: "#2E213F" },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E213F",
    marginBottom: 10,
  },
  barContainer: { marginBottom: 18 },
  barLabel: { fontSize: 15, color: "#5B4E73", marginBottom: 6 },
  barBackground: {
    flexDirection: "row",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E3D7FF",
    height: 28,
  },
  barSuccess: { backgroundColor: "#4CAF50" },
  barFail: { backgroundColor: "#F44336" },
  barLegendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: { width: 12, height: 12, borderRadius: 6, marginRight: 4 },
  legendDotSuccess: { backgroundColor: "#4CAF50" },
  legendDotFail: { backgroundColor: "#F44336" },
  legendText: { fontSize: 14, color: "#3C304F" },
  verticalBarsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  verticalBarItem: { alignItems: "center" },
  verticalBarBg: {
    width: 40,
    height: 110,
    borderRadius: 20,
    backgroundColor: "#E3D7FF",
    justifyContent: "flex-end",
    overflow: "hidden",
    marginBottom: 6,
  },
  verticalBarTime: {
    width: "100%",
    backgroundColor: "#FF9800",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  verticalBarTouches: {
    width: "100%",
    backgroundColor: "#2196F3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  verticalBarLabel: { fontSize: 14, color: "#5B4E73", marginBottom: 2 },
  verticalBarValue: { fontSize: 16, fontWeight: "600", color: "#2E213F" },
  feedbackBox: {
    marginTop: 8,
    marginBottom: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    padding: 12,
  },
  feedbackText: { fontSize: 15, color: "#3C304F", lineHeight: 22 },
  buttonRow: { marginTop: 8 },
  primaryButton: {
    backgroundColor: PRIMARY,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: { fontSize: 18, color: "#FFFFFF", fontWeight: "700" },
  secondaryButton: {
    backgroundColor: SECONDARY,
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: { fontSize: 18, color: "#FFFFFF", fontWeight: "700" },
});
