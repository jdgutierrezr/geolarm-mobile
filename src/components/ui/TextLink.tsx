import { Pressable, StyleSheet, Text, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Props = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function TextLink({ title, onPress, style, textStyle }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" hitSlop={8} style={style}>
      {({ pressed }) => (
        <Text style={[typography.link, styles.center, textStyle, pressed && styles.pressed]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  pressed: {
    color: colors.accentPressed,
  },
});
