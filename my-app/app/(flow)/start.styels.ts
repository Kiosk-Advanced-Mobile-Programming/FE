// app/(flow)/start.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  btnPrimary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#6d4aff',
  },
  btnSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#8a7cf6',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
});
