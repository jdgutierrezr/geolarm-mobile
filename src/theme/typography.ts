import type { TextStyle } from 'react-native';

import { colors } from './colors';

export const fonts = {
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semibold: 'Poppins_600SemiBold',
  bold: 'Poppins_700Bold',
} as const;

export const typography = {
  title: { fontFamily: fonts.bold, fontSize: 36, lineHeight: 50, color: colors.title },
  subtitle: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.text },
  label: { fontFamily: fonts.medium, fontSize: 19, lineHeight: 28, color: colors.text },
  input: { fontFamily: fonts.regular, fontSize: 16, color: colors.text },
  button: { fontFamily: fonts.medium, fontSize: 20, lineHeight: 28, color: colors.white },
  link: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.accent },
  body: { fontFamily: fonts.regular, fontSize: 17, lineHeight: 26, color: colors.text },
  cardTitle: { fontFamily: fonts.medium, fontSize: 20, lineHeight: 28, color: colors.text },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.text },
  small: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.mutedText },
} satisfies Record<string, TextStyle>;
