// components/StudySummaryView.tsx
// 한 세션의 통계 화면을 그려주는 “UI 전용 컴포넌트”입니다.

import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AiSummaryButton from "./AiSummaryButton";
import { styles } from "./StudySummaryView.styles";

export type StudyStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ABORTED";

export interface StudySessionSummary {
  categoryName: string; // 예: "맥도날드 주문 연습"
  dateLabel: string; // 예: "2025년 10월 31일 금요일"
  totalSeconds: number; // 총 소요 시간(초)
  totalTouches: number; // 전체 터치 수
  successTouches: number; // 성공 터치 수
  status: StudyStatus;
}

interface Props {
  session: StudySessionSummary;
  onRetry?: () => void; // 같은 연습 다시
  onOtherPractice?: () => void; // 다른 연습
}

const StudySummaryView: React.FC<Props> = ({
  session: data,
  onRetry,
  onOtherPractice,
}) => {
  console.log(data);
  const failTouches = Math.max(data.totalTouches - data.successTouches, 0);
  const successRate =
    data.totalTouches > 0
      ? Math.round((data.successTouches / data.totalTouches) * 100)
      : 0;
  const failRate = 100 - successRate;

  const maxTouches = Math.max(data.totalTouches, 1);
  const successBarRatio = data.successTouches / maxTouches;
  const failBarRatio = failTouches / maxTouches;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>지난 학습을 한 눈에 볼 수 있어요</Text>

        <View style={styles.card}>
          {/* 상단 정보 */}
          <Text style={styles.categoryText}>{data.categoryName}</Text>
          <Text style={styles.dateText}>{data.dateLabel}</Text>

          {/* 요약 카드들 */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>총 학습 시간</Text>
              <Text style={styles.summaryValue}>
                {Math.round(data.totalSeconds / 60)}분
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>터치 성공률</Text>
              <Text style={styles.summaryValue}>{successRate}%</Text>
            </View>
          </View>

          {/* AI 학습 통계 요약 기능 */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryItemWide}>
              <AiSummaryButton session={data} />
            </View>
          </View>

          <View style={styles.divider} />

          {/* 터치 성공/실패 막대 그래프 */}
          <Text style={styles.sectionTitle}>터치 결과 보기</Text>

          <View style={styles.barContainer}>
            <Text style={styles.barLabel}>성공 / 실패 비율</Text>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barSuccess,
                  { flex: successRate, minWidth: successRate === 0 ? 0 : 4 },
                ]}
              />
              <View
                style={[
                  styles.barFail,
                  { flex: failRate, minWidth: failRate === 0 ? 0 : 4 },
                ]}
              />
            </View>
            <View style={styles.barLegendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.legendDotSuccess]} />
                <Text style={styles.legendText}>
                  성공 {data.successTouches}회 ({successRate}%)
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.legendDotFail]} />
                <Text style={styles.legendText}>
                  실패 {failTouches}회 ({failRate}%)
                </Text>
              </View>
            </View>
          </View>

          {/* 시간 vs 터치 수 세로 막대 */}
          <View className="barContainer">
            <Text style={styles.barLabel}>연습 시간과 터치 수</Text>
            <View style={styles.verticalBarsRow}>
              <View style={styles.verticalBarItem}>
                <View style={styles.verticalBarBg}>
                  <View
                    style={[
                      styles.verticalBarTime,
                      {
                        height: Math.min(
                          100,
                          (data.totalSeconds / 600) * 100 // 10분 기준
                        ),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.verticalBarLabel}>시간</Text>
                <Text style={styles.verticalBarValue}>
                  {Math.round(data.totalSeconds / 60)}분
                </Text>
              </View>

              <View style={styles.verticalBarItem}>
                <View style={styles.verticalBarBg}>
                  <View
                    style={[
                      styles.verticalBarTouches,
                      {
                        height: Math.min(100, (data.totalTouches / 20) * 100), // 20회 기준
                      },
                    ]}
                  />
                </View>
                <Text style={styles.verticalBarLabel}>터치 수</Text>
                <Text style={styles.verticalBarValue}>
                  {data.totalTouches}회
                </Text>
              </View>
            </View>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonRow}>
            <Pressable style={styles.primaryButton} onPress={onRetry}>
              <Text style={styles.primaryButtonText}>
                같은 연습 다시 해보기
              </Text>
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            <Pressable style={styles.secondaryButton} onPress={onOtherPractice}>
              <Text style={styles.secondaryButtonText}>다른 연습 해보기</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default StudySummaryView;
