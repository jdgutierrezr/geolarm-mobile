import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({ title, onPress, disabled = false, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[typography.button, disabled && styles.disabledText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    boxShadow: '3px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  pressed: {
    backgroundColor: colors.primaryPressed,
    boxShadow: 'none',
  },
  disabled: {
    backgroundColor: colors.disabledBg,
    boxShadow: 'none',
  },
  disabledText: {
    color: colors.disabledText,
  },
});
