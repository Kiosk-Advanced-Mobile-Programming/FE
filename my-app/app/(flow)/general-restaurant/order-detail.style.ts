// order-detail.style.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#ffc72c',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
