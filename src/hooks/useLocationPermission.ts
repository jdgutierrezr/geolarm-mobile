import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { AppState, Linking } from 'react-native';

export function useLocationPermission() {
  const [granted, setGranted] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);

  // Se revisa al montar y cada vez que la app vuelve al frente (p. ej. después de pasar por Ajustes).
  useEffect(() => {
    const check = () =>
      Location.getForegroundPermissionsAsync().then((res) => {
        setGranted(res.granted);
        setCanAskAgain(res.canAskAgain);
      });
    check();
    const sub = AppState.addEventListener('change', (state) => state === 'active' && check());
    return () => sub.remove();
  }, []);

  /** Pide el permiso; si el usuario ya lo negó de forma permanente, abre los ajustes del sistema. */
  const request = useCallback(async () => {
    if (!canAskAgain) {
      await Linking.openSettings();
      return false;
    }
    const res = await Location.requestForegroundPermissionsAsync();
    setGranted(res.granted);
    setCanAskAgain(res.canAskAgain);
    return res.granted;
  }, [canAskAgain]);

  return { granted, request };
}
