// select-menu.style.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  categoryRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#da291c',
    borderColor: '#da291c',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 12,
  },
  menuCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 6,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  menuName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuPrice: {
    fontSize: 13,
    color: '#555',
  },
  spicy: {
    marginTop: 4,
    fontSize: 12,
    color: '#da291c',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#ffc72c',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#da291c',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
