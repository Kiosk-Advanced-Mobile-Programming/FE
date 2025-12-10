// components/StudySummaryScreen/StudySummaryview.tsx
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
  categoryName: string;
  sessionName: string; // [추가] 부제목용 세션 이름
  dateLabel: string;
  totalSeconds: number;
  totalTouches: number;
  successTouches: number;
  status: StudyStatus;
}

interface Props {
  session: StudySessionSummary;
  onRetry?: () => void;
  onOtherPractice?: () => void;
}

const StudySummaryView: React.FC<Props> = ({
  session: data,
  onRetry,
  onOtherPractice,
}) => {
  const failTouches = Math.max(data.totalTouches - data.successTouches, 0);
  const successRate =
    data.totalTouches > 0
      ? Math.round((data.successTouches / data.totalTouches) * 100)
      : 0;
  const failRate = 100 - successRate;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>지난 학습을 한 눈에 볼 수 있어요</Text>

        <View style={styles.card}>
          {/* [수정] 상단 정보 표시 영역 */}
          {/* 1. 주제목 (카테고리) */}
          <Text style={styles.categoryText}>{data.categoryName}</Text>

          {/* 2. 부제목 (세션 이름) - 스타일을 인라인으로 추가하여 강조 */}
          <Text
            style={{
              fontSize: 16,

              color: "#333",

              marginBottom: 4,
            }}
          >
            {data.sessionName}
          </Text>

          {/* 3. 날짜 */}
          <Text style={styles.dateText}>{data.dateLabel}</Text>

          {/* 요약 카드들 */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>총 학습 시간</Text>
              <Text style={styles.summaryValue}>{data.totalSeconds}초</Text>
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
          <View style={styles.barContainer}>
            <Text style={styles.barLabel}>연습 시간과 터치 수</Text>
            <View style={styles.verticalBarsRow}>
              <View style={styles.verticalBarItem}>
                <View style={styles.verticalBarBg}>
                  <View
                    style={[
                      styles.verticalBarTime,
                      {
                        height: Math.min(100, (data.totalSeconds / 600) * 100),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.verticalBarLabel}>시간</Text>
                <Text style={styles.verticalBarValue}>
                  {data.totalSeconds}초
                </Text>
              </View>

              <View style={styles.verticalBarItem}>
                <View style={styles.verticalBarBg}>
                  <View
                    style={[
                      styles.verticalBarTouches,
                      {
                        height: Math.min(100, (data.totalTouches / 20) * 100),
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
