import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { getAiExplanation } from "@/firebase/ai";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./_wordExplanation.styles";

// 키오스크 기본 용어 5개
const KIOSK_TERMS = [
  {
    word: "포장 (Takeout)",
    explanation:
      "매장에서 먹지 않고 음식을 포장하여 가져가는 것을 의미합니다. 버튼 클릭 시 주로 '포장' 또는 '테이크아웃'을 선택해야 합니다.",
  },
  {
    word: "매장 (For Here)",
    explanation:
      "음식점에서 바로 음식을 먹고 가는 것을 의미합니다. 매장 이용 시 추가적인 용기 보증금 없이 식사가 가능합니다.",
  },
  {
    word: "옵션 (Option)",
    explanation:
      "선택한 메뉴에 추가적으로 변경하거나 곁들일 수 있는 사항입니다. (예: 샷 추가, 얼음 적게, 소스 추가 등)",
  },
  {
    word: "적립 (Points/Earn)",
    explanation:
      "결제 금액의 일부를 포인트로 쌓는 기능입니다. 보통 전화번호나 바코드를 입력하여 적립할 수 있습니다.",
  },
  {
    word: "현금 결제",
    explanation:
      "현금(지폐나 동전)을 사용하여 주문 금액을 지불하는 방식입니다. 키오스크 하단의 현금 투입구에 지폐나 동전을 넣으면 거스름돈이 나옵니다.",
  },
];

export default function WordExplanationScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState({
    word: "",
    explanation: "",
  });

  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState({ query: "", explanation: "" });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false);

  const openDialog = (term: (typeof KIOSK_TERMS)[0]) => {
    setSelectedTerm(term);
    setIsModalVisible(true);
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim() || isAiLoading) return;

    const queryToAsk = aiQuery.trim();

    setAiQuery("");
    setIsAiLoading(true);

    setAiResponse({
      query: queryToAsk,
      explanation: "AI가 답변을 생성 중입니다...",
    });
    setIsAiModalVisible(true);

    try {
      const explanation = await getAiExplanation(queryToAsk);
      setAiResponse({ query: queryToAsk, explanation: explanation });
    } catch (error) {
      console.error("AI 질문 실패:", error);
      setAiResponse({
        query: queryToAsk,
        explanation:
          "죄송합니다. AI 응답을 받아오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>키오스크 단어 설명</Text>

          {/* 1. AI 질문 영역 (상단으로 이동) */}
          <View style={styles.aiContainer}>
            <Text style={styles.aiHeader}>궁금한 단어를 물어보세요!</Text>
            <Text style={styles.aiSubHeader}>
              AI가 쉽고 친절하게 설명해드립니다.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="예: 키오스크가 뭐야?"
              value={aiQuery}
              onChangeText={setAiQuery}
              onSubmitEditing={handleAiQuery}
              editable={!isAiLoading}
              returnKeyType="search"
            />

            <Pressable
              style={({ pressed }) => [
                styles.dialogCloseButton,
                {
                  backgroundColor:
                    isAiLoading || !aiQuery.trim() ? "#888" : Colors.light.tint,
                  opacity: pressed ? 0.9 : 1,
                },
              ]}
              onPress={handleAiQuery}
              disabled={isAiLoading || !aiQuery.trim()}
            >
              <Text style={styles.dialogCloseText}>
                {isAiLoading ? "답변 받는 중..." : "AI에게 질문하기"}
              </Text>
            </Pressable>
          </View>

          {/* 구분선 */}
          <View style={styles.separator} />

          {/* 2. 기본 단어 리스트 (하단으로 이동) */}
          <Text style={styles.sectionTitle}>자주 쓰는 단어</Text>
          <View style={styles.wordListContainer}>
            {KIOSK_TERMS.map((term, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.wordCard,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
                onPress={() => openDialog(term)}
              >
                <Text style={styles.wordText}>{term.word}</Text>
                <IconSymbol
                  name="info.circle.fill"
                  size={24}
                  color={Colors.light.tint}
                />
              </Pressable>
            ))}
          </View>

          {/* 모달들은 그대로 유지 */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.dialogContainer}>
                <Text style={styles.dialogTitle}>{selectedTerm.word}</Text>
                <ScrollView style={{ maxHeight: 200 }}>
                  <Text style={styles.dialogExplanation}>
                    {selectedTerm.explanation}
                  </Text>
                </ScrollView>

                <Pressable
                  style={styles.dialogCloseButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.dialogCloseText}>닫기</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isAiModalVisible}
            onRequestClose={() => {
              if (!isAiLoading) setIsAiModalVisible(false);
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.dialogContainer}>
                <Text style={styles.dialogTitle}>
                  {isAiLoading
                    ? "AI 답변 생성 중"
                    : `질문: ${aiResponse.query}`}
                </Text>

                <ScrollView style={{ maxHeight: 300 }}>
                  {isAiLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator
                        size="large"
                        color={Colors.light.tint}
                      />
                      <Text style={styles.loadingText}>
                        잠시만 기다려주세요...
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.dialogExplanation}>
                      {aiResponse.explanation}
                    </Text>
                  )}
                </ScrollView>

                <Pressable
                  style={[
                    styles.dialogCloseButton,
                    isAiLoading && { opacity: 0.5 },
                  ]}
                  onPress={() => setIsAiModalVisible(false)}
                  disabled={isAiLoading}
                >
                  <Text style={styles.dialogCloseText}>닫기</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
