import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme/colors';

type Props = {
  icon: LucideIcon;
  onPress?: () => void;
  size?: number;
  accessibilityLabel: string;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ icon: Icon, onPress, size = 44, accessibilityLabel, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.base,
        { width: size, height: size, borderRadius: size / 2 },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon color={colors.white} size={size * 0.52} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  pressed: {
    backgroundColor: colors.accentPressed,
  },
});
