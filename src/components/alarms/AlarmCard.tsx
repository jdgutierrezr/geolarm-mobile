import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import type { Alarm } from '@/data/alarms';
import { alarmColors, colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Props = {
  alarm: Alarm;
  onToggle: (active: boolean) => void;
  onPress?: () => void;
};

export function AlarmCard({ alarm, onToggle, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={[styles.dot, { backgroundColor: alarmColors[alarm.color] }]} />
      <View style={styles.texts}>
        <Text style={typography.cardTitle} numberOfLines={1}>
          {alarm.name}
        </Text>
        <Text style={typography.caption} numberOfLines={1}>
          {alarm.address}
        </Text>
      </View>
      <Switch
        value={alarm.active}
        onValueChange={onToggle}
        accessibilityLabel={`Activar ${alarm.name}`}
        trackColor={{ false: colors.switchTrackOff, true: colors.accent }}
        thumbColor={alarm.active ? colors.switchThumbOn : colors.switchThumbOff}
        ios_backgroundColor={colors.switchTrackOff}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 24,
    backgroundColor: colors.surface,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.18)',
  },
  cardPressed: {
    backgroundColor: colors.disabledBg,
  },
  dot: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  texts: {
    flex: 1,
    marginLeft: 23,
    marginRight: 16,
  },
});
