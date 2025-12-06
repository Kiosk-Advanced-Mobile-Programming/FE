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
    word: "간편결제",
    explanation:
      "휴대폰 안에 저장된 카드나 결제 앱으로 바로 결제하는 방식입니다. \n카드를 꺼내서 꽂지 않아도, 휴대폰을 기계에 갖다 대거나 버튼만 눌러 결제할 수 있습니다.",
  },
  {
    word: "사이드 메뉴",
    explanation:
      "주요 식사(햄버거, 치킨 등) 옆에 같이 곁들여 먹는 음식을 말합니다.\n 감자튀김, 콜라, 샐러드와 같은 추가 주문 메뉴가 여기에 해당합니다.",
  },
  {
    word: "옵션",
    explanation:
      "선택한 메뉴에 추가적으로 변경하거나 곁들일 수 있는 사항입니다. (예: 샷 추가, 얼음 적게, 소스 추가 등)",
  },
  {
    word: "포인트 적립",
    explanation:
      "결제 금액의 일부를 포인트로 쌓는 기능입니다. 보통 전화번호나 바코드를 입력하여 적립할 수 있습니다.",
  },
  {
    word: "바코드 스캔",
    explanation: "쿠폰이나 상품에 있는 줄무늬를 기계에 갖다 대서 읽는 것.",
  },
];

export default function WordExplanationScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false); // 고정 단어 모달
  const [selectedTerm, setSelectedTerm] = useState({
    word: "",
    explanation: "",
  });

  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState({ query: "", explanation: "" });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiModalVisible, setIsAiModalVisible] = useState(false); // AI 답변 모달 (추가)

  // 1, 2. 단어 클릭 시 다이얼로그 띄우기
  const openDialog = (term: (typeof KIOSK_TERMS)[0]) => {
    setSelectedTerm(term);
    setIsModalVisible(true);
  };

  // 3, 4. AI에게 질문하기
  const handleAiQuery = async () => {
    if (!aiQuery.trim() || isAiLoading) return;

    const queryToAsk = aiQuery.trim();

    // 1. 입력창 비우고 로딩 시작
    setAiQuery("");
    setIsAiLoading(true);

    // 2. 모달 초기 상태 설정 및 바로 띄우기
    setAiResponse({
      query: queryToAsk,
      explanation: "AI가 답변을 생성 중입니다...",
    });
    setIsAiModalVisible(true);

    try {
      const explanation = await getAiExplanation(queryToAsk);
      // 3. 답변을 받아온 후 모달 내용 업데이트
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>키오스크 단어 설명</Text>

        {/* 1. 기본 단어 리스트 */}
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
                size={20}
                color={Colors.light.tint}
              />
            </Pressable>
          ))}
        </View>

        {/* 3. AI 질문 영역 */}
        <View style={styles.aiContainer}>
          <Text style={styles.aiHeader}>다른 단어가 궁금하신가요?</Text>

          <TextInput
            style={styles.input}
            placeholder="궁금한 키오스크 단어를 물어보세요!"
            value={aiQuery}
            onChangeText={setAiQuery}
            onSubmitEditing={handleAiQuery}
            editable={!isAiLoading}
          />

          <Pressable
            style={({ pressed }) => [
              styles.dialogCloseButton,
              // 로딩 중이거나 입력 값이 없으면 버튼 비활성화
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
              {isAiLoading ? "답변 받는 중..." : "AI학습 도우미 질문하기"}
            </Text>
          </Pressable>

          {/* 기존 AI 응답 표시 영역은 모달로 이동하며 삭제됨 */}
        </View>

        {/* 2. 고정 단어 설명 다이얼로그 (Modal) */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dialogContainer}>
              <Text style={styles.dialogTitle}>{selectedTerm.word}</Text>
              <ScrollView>
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

        {/* NEW: AI 응답 다이얼로그 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isAiModalVisible}
          onRequestClose={() => {
            if (!isAiLoading) setIsAiModalVisible(false); // 로딩 중에는 닫기 방지
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dialogContainer}>
              {/* Title: Show Query or Loading */}
              <Text style={styles.dialogTitle}>
                {isAiLoading
                  ? "AI 답변 생성 중"
                  : `AI 답변: ${aiResponse.query}`}
              </Text>

              <ScrollView>
                {isAiLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.light.tint} />
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
    </SafeAreaView>
  );
}
