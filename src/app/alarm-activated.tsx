import { router, useLocalSearchParams } from 'expo-router';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, PanResponder, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { initialAlarms } from '@/data/alarms';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

const alarmSound = 'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg';

export default function AlarmActivatedScreen() {
  const { id: rawId } = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const alarm = useMemo(() => initialAlarms.find((item) => item.id === id) ?? initialAlarms[2], [id]);
  const { width } = useWindowDimensions();
  const [trackWidth, setTrackWidth] = useState(Math.min(width - 80, 300));
  const [dismissed, setDismissed] = useState(false);
  const knobWidth = 134;
  const maxTravel = Math.max(trackWidth - knobWidth - 8, 0);
  // useState con inicializador perezoso: crea el valor animado una sola vez sin leer un ref en el render.
  const [offset] = useState(() => new Animated.Value(0));
  const player = useAudioPlayer(alarmSound, { updateInterval: 1000 });

  useEffect(() => {
    let mounted = true;

    const startAlarmSound = async () => {
      await setAudioModeAsync({ playsInSilentMode: true });
      if (mounted) {
        // expo-audio exposes looping as a mutable player property.
        // eslint-disable-next-line react-hooks/immutability
        player.loop = true;
        player.play();
      }
    };

    startAlarmSound().catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, [player]);

  const finish = useCallback(() => {
    setDismissed(true);
    player.pause();
    player.seekTo(0);
    Animated.spring(offset, { toValue: maxTravel, useNativeDriver: true }).start(({ finished }) => {
      if (finished) router.replace('/alarms');
    });
  }, [offset, player, maxTravel]);

  // El gesto se rehace cuando cambia el recorrido, para no quedarse con el ancho del primer render.
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 4,
        // El botón siempre arranca en cero: tras soltarlo, o vuelve al inicio o se va al final y sale de la pantalla.
        onPanResponderMove: (_, gesture) => {
          offset.setValue(Math.max(0, Math.min(gesture.dx, maxTravel)));
        },
        onPanResponderRelease: (_, gesture) => {
          const next = Math.max(0, Math.min(gesture.dx, maxTravel));
          if (next > maxTravel * 0.72) finish();
          else Animated.spring(offset, { toValue: 0, useNativeDriver: true }).start();
        },
      }),
    [offset, maxTravel, finish],
  );

  return (
    <ScreenBackground>
      <View style={styles.screen}>
      <View style={styles.alert}><Text style={styles.alertText}>¡Alarma sonando!</Text></View>
      <View style={styles.center}>
        <Text style={styles.title}>{alarm.name}</Text>
        <View style={styles.spacerSmall} />
        <Text style={styles.body}>estás cerca de</Text>
        <Text style={styles.location}>{alarm.address}</Text>
        <View style={styles.spacerLarge} />
        <Text style={styles.body}>Lunes, Septiembre 7</Text>
      </View>
      <View
        style={styles.sliderOuter}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        accessibilityLabel="Desliza para apagar la alarma"
      >
        <View style={styles.sliderTrack}>
          <Animated.View style={[styles.sliderKnob, { width: knobWidth, transform: [{ translateX: offset }] }]} {...panResponder.panHandlers}>
            <Text style={styles.knobText}>{dismissed ? 'Apagada' : 'Apagar'}</Text>
          </Animated.View>
          {!dismissed && <View style={styles.chevrons}><ChevronRight color={colors.primary} size={26} /><ChevronRight color={colors.primary} size={26} /><ChevronRight color={colors.primary} size={26} /></View>}
        </View>
      </View>
      <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Volver">
        <ChevronLeft color={colors.primary} size={20} />
      </Pressable>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 40, paddingVertical: 100, alignItems: 'center' },
  alert: { width: '100%', paddingHorizontal: 32, paddingVertical: 20, borderRadius: 50, backgroundColor: colors.accent, alignItems: 'center', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.6)' },
  alertText: { fontFamily: fonts.medium, fontSize: 20, color: colors.white },
  center: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontFamily: fonts.bold, fontSize: 36, lineHeight: 46, color: colors.text, textAlign: 'center' },
  body: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24, color: colors.text, textAlign: 'center' },
  location: { marginTop: 12, fontFamily: fonts.medium, fontSize: 20, lineHeight: 28, color: colors.text, textAlign: 'center' },
  spacerSmall: { height: 20 },
  spacerLarge: { height: 48 },
  sliderOuter: { width: '100%', maxWidth: 300, height: 69, padding: 4, borderRadius: 50, backgroundColor: colors.background },
  sliderTrack: { flex: 1, borderRadius: 50, padding: 4, backgroundColor: colors.border, justifyContent: 'center', overflow: 'hidden', boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.5)' },
  sliderKnob: { height: 61, borderRadius: 50, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' },
  knobText: { fontFamily: fonts.medium, fontSize: 14, color: colors.white },
  chevrons: { position: 'absolute', right: 10, flexDirection: 'row', alignItems: 'center' },
  backButton: { position: 'absolute', left: 20, top: 48, width: 42, height: 42, borderRadius: 21, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
});
