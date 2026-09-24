import * as Location from 'expo-location';
import { LocateFixed, Minus, Plus } from 'lucide-react-native';
import { useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';

import { IconButton } from '@/components/ui/IconButton';
import { PIN_ASPECT, pinSvgMarkup } from '@/components/ui/PinIcon';
import type { Alarm } from '@/data/alarms';
import { alarmColors, colors } from '@/theme/colors';

import { leafletHtml } from './leafletHtml';

const PIN_WIDTH = 58;
const PIN_HEIGHT = PIN_WIDTH * PIN_ASPECT;

export type AlarmsMapHandle = {
  centerOnUser: () => Promise<void>;
};

type Props = {
  alarms: Alarm[];
  locationGranted: boolean;
  /** Se llama al tocar el botón de ubicación sin permiso concedido. */
  onLocationPermissionNeeded: () => void;
  onAlarmPress?: (alarm: Alarm) => void;
  style?: StyleProp<ViewStyle>;
  ref?: Ref<AlarmsMapHandle>;
};

// El mapa es Leaflet dentro de un WebView (funciona en Expo Go sin API key de Google).
// React Native le habla al mapa con `injectJavaScript` llamando las funciones de leafletHtml.
export function AlarmsMap({ alarms, locationGranted, onLocationPermissionNeeded, onAlarmPress, style, ref }: Props) {
  const webViewRef = useRef<WebView>(null);
  const [ready, setReady] = useState(false);

  const run = useCallback((script: string) => webViewRef.current?.injectJavaScript(`${script}; true;`), []);

  const showUser = useCallback(
    (coords: Location.LocationObjectCoords, center: boolean) =>
      run(`window.setUserLocation(${coords.latitude}, ${coords.longitude}, ${center})`),
    [run],
  );

  const centerOnUser = async () => {
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    showUser(coords, true);
  };

  useImperativeHandle(ref, () => ({ centerOnUser }));

  // Pines: uno por alarma activa. Se redibujan cada vez que cambia la lista.
  useEffect(() => {
    if (!ready) return;
    const markers = alarms
      .filter((alarm) => alarm.active)
      .map((alarm) => ({
        id: alarm.id,
        lat: alarm.coordinate.latitude,
        lng: alarm.coordinate.longitude,
        name: alarm.name,
        address: alarm.address,
        svg: pinSvgMarkup(alarmColors[alarm.color], PIN_WIDTH),
        width: PIN_WIDTH,
        height: PIN_HEIGHT,
      }));
    run(`window.setMarkers(${JSON.stringify(markers)})`);
  }, [alarms, ready, run]);

  // Punto azul del usuario, actualizado mientras haya permiso.
  useEffect(() => {
    if (!ready || !locationGranted) return;
    let subscription: Location.LocationSubscription | undefined;
    let cancelled = false;
    Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, distanceInterval: 10 }, ({ coords }) =>
      showUser(coords, false),
    ).then((sub) => {
      if (cancelled) sub.remove();
      else subscription = sub;
    });
    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [ready, locationGranted, showUser]);

  const handleLocatePress = () => {
    if (locationGranted) {
      centerOnUser();
    } else {
      onLocationPermissionNeeded();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webViewRef}
        source={{ html: leafletHtml }}
        originWhitelist={['*']}
        onMessage={(event) => {
          const message = event.nativeEvent.data;
          if (message === 'ready') setReady(true);
          if (message.startsWith('alarm:')) {
            const alarm = alarms.find((item) => item.id === message.slice('alarm:'.length));
            if (alarm) onAlarmPress?.(alarm);
          }
        }}
        style={styles.webView}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        setBuiltInZoomControls={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.controls}>
        <View style={styles.zoom}>
          <ZoomButton icon={Plus} label="Acercar" onPress={() => run('window.zoomIn()')} />
          <ZoomButton icon={Minus} label="Alejar" onPress={() => run('window.zoomOut()')} />
        </View>
        <IconButton icon={LocateFixed} size={44} accessibilityLabel="Centrar en mi ubicación" onPress={handleLocatePress} />
      </View>
    </View>
  );
}

type ZoomButtonProps = {
  icon: typeof Plus;
  label: string;
  onPress: () => void;
};

function ZoomButton({ icon: Icon, label, onPress }: ZoomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.zoomButton, pressed && styles.zoomButtonPressed]}
    >
      <Icon color={colors.white} size={18} strokeWidth={2.5} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
    backgroundColor: '#F2EFE9',
  },
  controls: {
    position: 'absolute',
    right: 22,
    bottom: 63,
    width: 44,
    alignItems: 'center',
    gap: 15,
  },
  zoom: {
    width: 32,
    height: 86,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.accent,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  zoomButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonPressed: {
    backgroundColor: colors.accentPressed,
  },
});
