import { auth, db } from "@/firebase/app";
import { useFocusEffect, useRouter } from "expo-router"; // useFocusEffect 추가
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useState } from "react"; // useCallback 추가
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./_stats.style";

interface SessionListItem {
  id: string;
  category: string;
  startedAtLabel: string;
  successRateLabel: string;
}

export default function StatsListScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionListItem[]>([]);

  // useEffect 대신 useFocusEffect 사용
  // 화면이 포커스될 때마다 실행됨
  useFocusEffect(
    useCallback(() => {
      let isActive = true; // 컴포넌트 언마운트 시 상태 업데이트 방지용 플래그

      const load = async () => {
        try {
          // 로딩 상태를 매번 보여줄지, 아니면 데이터만 조용히 갱신할지는 선택 사항입니다.
          // 여기서는 갱신 느낌을 주기 위해 로딩을 true로 설정합니다.
          setLoading(true);

          const uid = auth.currentUser?.uid;
          console.log("현재 유저 UID: " + uid);
          if (!uid) {
            if (isActive) setLoading(false);
            return;
          }

          const sessionsRef = collection(db, "users", uid, "sessions");
          const q = query(sessionsRef, orderBy("endedAt", "desc")); // 최신 순

          const snap = await getDocs(q);
          const items: SessionListItem[] = [];

          snap.forEach((doc) => {
            const d = doc.data() as any;
            const started = d.startedAt?.toDate?.() ?? new Date();
            const totalTouches = d.totalTouches ?? 0;
            const successTouches = d.successTouches ?? 0;
            const successRate =
              totalTouches > 0
                ? Math.round((successTouches / totalTouches) * 100)
                : 0;

            items.push({
              id: doc.id,
              category: d.category ?? "학습",
              startedAtLabel: started.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              }),
              successRateLabel: `${successRate}% 성공`,
            });
          });

          if (isActive) {
            setSessions(items);
          }
        } catch (e) {
          console.log("세션 목록 불러오기 오류:", e);
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      };

      load();

      // cleanup 함수: 탭을 빠르게 이동할 때 비동기 로직 충돌 방지
      return () => {
        isActive = false;
      };
    }, []) // 의존성 배열은 비워둡니다.
  );

  const handlePressItem = (item: SessionListItem) => {
    router.push({
      pathname: "/(flow)/studySummary/StudyDetailScreen",
      params: { sessionId: item.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D4AFF" />
      </View>
    );
  }

  if (sessions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          아직 학습 기록이 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>지난 학습 목록</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePressItem(item)}
            style={styles.itemCard}
          >
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemDate}>{item.startedAtLabel}</Text>
            <Text style={styles.itemSuccess}>{item.successRateLabel}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
