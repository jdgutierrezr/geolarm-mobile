import type { ReactNode } from 'react';
import { ImageBackground, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// La textura es un cuadro pequeño (1:1): se repite como mosaico para cubrir cualquier pantalla sin estirarse.
export function ScreenBackground({ children, style }: Props) {
  return (
    <ImageBackground
      source={require('@assets/bg-texture.png')}
      resizeMode="repeat"
      style={[styles.container, style]}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
