// app/(flow)/select-cafe.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#f5bf44',
  },
  pillText: {
    color: 'white',
    fontWeight: '600',
  },
  squareButton: {
    borderColor: '#989898ff',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  squareButtonText: {
    color: '#292929',

  },
  squareAccentButton: {
    outlineColor: '#292929',
    backgroundColor: '#f5bf44',
  }
});
