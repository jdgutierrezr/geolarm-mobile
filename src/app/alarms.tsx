import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlarmCard } from '@/components/alarms/AlarmCard';
import { AlarmsMap, type AlarmsMapHandle } from '@/components/alarms/AlarmsMap';
import { LocationPermissionModal } from '@/components/alarms/LocationPermissionModal';
import { NavBar } from '@/components/alarms/NavBar';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { initialAlarms } from '@/data/alarms';
import { useLocationPermission } from '@/hooks/useLocationPermission';

export default function AlarmsScreen() {
  const { askLocation } = useLocalSearchParams<{ askLocation?: string }>();
  const { height } = useWindowDimensions();
  const mapRef = useRef<AlarmsMapHandle>(null);

  const [alarms, setAlarms] = useState(initialAlarms);
  // Al llegar desde el registro, el modal de ubicación se muestra de inmediato.
  const [showLocationModal, setShowLocationModal] = useState(askLocation === '1');
  const location = useLocationPermission();

  const toggleAlarm = (id: string, active: boolean) =>
    setAlarms((list) => list.map((alarm) => (alarm.id === id ? { ...alarm, active } : alarm)));

  const handleAllowLocation = async () => {
    setShowLocationModal(false);
    const granted = await location.request();
    if (granted) {
      await mapRef.current?.centerOnUser();
    }
  };

  return (
    <ScreenBackground>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <View style={styles.navBar}>
          <NavBar onLogout={() => router.replace('/login')} />
        </View>

        <AlarmsMap
          ref={mapRef}
          alarms={alarms}
          locationGranted={location.granted}
          onLocationPermissionNeeded={() => setShowLocationModal(true)}
          onAlarmPress={(alarm) => router.push({ pathname: '/alarm-activated', params: { id: alarm.id } })}
          style={[styles.map, { height: height * 0.475 }]}
        />

        <FlatList
          data={alarms}
          keyExtractor={(alarm) => alarm.id}
          renderItem={({ item }) => (
            <AlarmCard
              alarm={item}
              onToggle={(active) => toggleAlarm(item.id, active)}
              onPress={() => router.push({ pathname: '/alarm-detail', params: { id: item.id } })}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          persistentScrollbar
        />
      </SafeAreaView>

      <LocationPermissionModal visible={showLocationModal} onAllow={handleAllowLocation} />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  navBar: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  map: {
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingTop: 3,
    paddingBottom: 24,
  },
  separator: {
    height: 4,
  },
});
