import { Image } from 'expo-image';
import type { ImageStyle, StyleProp } from 'react-native';

const ASPECT_RATIO = 189 / 56;

type Props = {
  width: number;
  style?: StyleProp<ImageStyle>;
};

export function Logo({ width, style }: Props) {
  return (
    <Image
      source={require('@assets/logo.svg')}
      contentFit="contain"
      style={[{ width, aspectRatio: ASPECT_RATIO }, style]}
      accessibilityRole="image"
      accessibilityLabel="Geolarm"
    />
  );
}
