// app/(flow)/select-brand.styles.ts
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
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  btnYellow: {
    backgroundColor: '#f7cf2a',
  },
  btnDark: {
    backgroundColor: '#0f1a50',
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
  },
});
