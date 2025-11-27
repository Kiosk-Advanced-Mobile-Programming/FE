// components/PrepareModal.tsx
import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

type PrepareModalProps = {
  visible: boolean;
  onClose: () => void;
  message?: string;
};

export default function PrepareModal({ visible, onClose, message = "준비 중인 기능입니다." }: PrepareModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true} // 배경을 투명하게 해서 뒤가 비치게 함
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* 아이콘이나 느낌표 이미지를 넣어도 좋습니다 */}
          <Text style={styles.icon}>🚧</Text>
          <Text style={styles.modalText}>{message}</Text>
          
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.textStyle}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검은 배경
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // 화면의 80% 차지
  },
  icon: {
    fontSize: 40,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20, // 어르신들을 위해 큰 글씨
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    backgroundColor: '#f4bf3c', // 맥도날드 노랑
    minWidth: 120,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});