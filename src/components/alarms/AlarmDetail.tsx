import { ChevronLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { Alarm } from '@/data/alarms';
import { alarmColors, colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const week = ['L', 'M', 'I', 'J', 'V', 'S', 'D'];

type Props = {
  alarm: Alarm;
  onBack: () => void;
  onToggle: (active: boolean) => void;
};

/**
 * Detalle de una alarma. Ocupa el mismo contenedor que la lista (debajo del mapa),
 * así que al abrirlo solo cambia el contenido: ni la navbar ni el mapa se mueven.
 */
export function AlarmDetail({ alarm, onBack, onToggle }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={onBack} style={styles.backLink} accessibilityRole="button">
        {({ pressed }) => (
          <>
            <ChevronLeft color={pressed ? colors.accentPressed : colors.accent} size={18} strokeWidth={2.5} />
            <Text style={[styles.backText, pressed && styles.backTextPressed]}>Volver</Text>
          </>
        )}
      </Pressable>

      <View style={styles.titleRow}>
        <View style={[styles.alarmDot, { backgroundColor: alarmColors[alarm.color] }]} />
        <Text style={styles.title} numberOfLines={1}>
          {alarm.name}
        </Text>
        <Pressable
          onPress={() => onToggle(!alarm.active)}
          accessibilityRole="switch"
          accessibilityLabel={`Activar ${alarm.name}`}
          accessibilityState={{ checked: alarm.active }}
          style={[styles.toggle, alarm.active && styles.toggleActive]}
        >
          <View style={[styles.toggleThumb, alarm.active && styles.toggleThumbActive]} />
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

      <Text style={styles.footer}>
        Para administrar tus alarmas, entra a nuestro <Text style={styles.footerLink}>sitio web</Text>
      </Text>
    </ScrollView>
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
  container: { flex: 1 },
  // flexGrow deja que el contenido corto se estire y el largo haga scroll.
  content: { flexGrow: 1, paddingHorizontal: 14, paddingTop: 6, paddingBottom: 12 },
  backLink: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  backText: { fontFamily: fonts.medium, fontSize: 20, color: colors.accent },
  backTextPressed: { color: colors.accentPressed },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 10 },
  alarmDot: { width: 51, height: 51, borderRadius: 26 },
  title: { flex: 1, fontFamily: fonts.semibold, fontSize: 28, color: colors.text },
  toggle: { width: 64, height: 32, borderRadius: 18, padding: 4, justifyContent: 'center', backgroundColor: colors.border },
  toggleActive: { backgroundColor: colors.primary },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: colors.white },
  toggleThumbActive: { alignSelf: 'flex-end' },
  detail: { paddingVertical: 6 },
  label: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 21, color: colors.text },
  value: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 18, color: colors.text },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 8 },
  day: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#A8A8A8', alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: '#A8A8A8' },
  dayText: { fontFamily: fonts.medium, fontSize: 20, color: '#A8A8A8' },
  dayTextSelected: { color: colors.white },
  // marginTop auto pega el texto al final del contenedor en vez de dejar un hueco.
  footer: { marginTop: 'auto', paddingTop: 20, fontFamily: fonts.regular, fontSize: 12, textAlign: 'center', color: '#A8A8A8' },
  footerLink: { color: colors.accent },
});
