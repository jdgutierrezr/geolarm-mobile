import { router, useLocalSearchParams } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlarmsMap } from '@/components/alarms/AlarmsMap';
import { NavBar } from '@/components/alarms/NavBar';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { initialAlarms } from '@/data/alarms';
import { alarmColors, colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const week = ['L', 'M', 'I', 'J', 'V', 'S', 'D'];

export default function AlarmDetailScreen() {
  const { id: rawId } = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const alarm = useMemo(() => initialAlarms.find((item) => item.id === id) ?? initialAlarms[1], [id]);
  const [active, setActive] = useState(alarm.active);

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <View style={styles.headerWrap}>
          <NavBar onLogout={() => router.replace('/login')} />
        </View>

        <AlarmsMap
          alarms={[{ ...alarm, active }]}
          locationGranted={false}
          onLocationPermissionNeeded={() => undefined}
          style={styles.map}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.backLink} accessibilityRole="button">
            <ChevronLeft color={colors.accent} size={18} strokeWidth={2.5} />
            <Text style={styles.backText}>Volver</Text>
          </Pressable>

          <View style={styles.titleRow}>
            <View style={[styles.alarmDot, { backgroundColor: alarmColors[alarm.color] }]} />
            <Text style={styles.title}>{alarm.name}</Text>
            <Pressable
              onPress={() => setActive((value) => !value)}
              accessibilityRole="switch"
              accessibilityState={{ checked: active }}
              style={[styles.toggle, active && styles.toggleActive]}
            >
              <View style={[styles.toggleThumb, active && styles.toggleThumbActive]} />
            </Pressable>
          </View>

          <Detail label="Ubicación" value={alarm.address} />
          <Detail label="Radio" value="3 metros" />
          <Text style={styles.label}>Repetición</Text>
          <View style={styles.weekRow}>
            {week.map((day, index) => {
              const selected = [1, 3, 4, 5].includes(index);
              return (
                <View key={day} style={[styles.day, selected && styles.daySelected]}>
                  <Text style={[styles.dayText, selected && styles.dayTextSelected]}>{day}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.footer}>Para administrar tus alarmas, entra a nuestro <Text style={styles.footerLink}>sitio web</Text></Text>
        </ScrollView>

      </SafeAreaView>
    </ScreenBackground>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  headerWrap: { paddingHorizontal: 12, paddingVertical: 20 },
  map: { height: 260 },
  content: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 24 },
  backLink: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  backText: { fontFamily: fonts.medium, fontSize: 20, color: colors.accent },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16 },
  alarmDot: { width: 51, height: 51, borderRadius: 26 },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 28, color: colors.text },
  toggle: { width: 64, height: 32, borderRadius: 18, padding: 4, justifyContent: 'center', backgroundColor: colors.border },
  toggleActive: { backgroundColor: colors.primary },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.white },
  toggleThumbActive: { alignSelf: 'flex-end' },
  detail: { paddingVertical: 8 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 21, color: colors.text },
  value: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.text },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingVertical: 10 },
  day: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#A8A8A8', alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: '#A8A8A8' },
  dayText: { fontFamily: fonts.medium, fontSize: 20, color: '#A8A8A8' },
  dayTextSelected: { color: colors.white },
  footer: { marginTop: 22, fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', color: '#A8A8A8' },
  footerLink: { color: colors.accent },
});
