import type { AlarmColor } from '@/theme/colors';

export type Alarm = {
  id: string;
  name: string;
  address: string;
  color: AlarmColor;
  active: boolean;
  coordinate: { latitude: number; longitude: number };
};

// Datos de ejemplo alrededor de la Universidad de los Andes (Bogotá).
export const initialAlarms: Alarm[] = [
  {
    id: '1',
    name: 'Alarma 1',
    address: 'Calle 200 #12-20',
    color: 'yellow',
    active: false,
    coordinate: { latitude: 4.6048, longitude: -74.0632 },
  },
  {
    id: '2',
    name: 'Alarma 2',
    address: 'Barberia Serrano',
    color: 'green',
    active: true,
    coordinate: { latitude: 4.6036, longitude: -74.0706 },
  },
  {
    id: '3',
    name: 'Entregar tesis',
    address: 'Universidad de los Andes, Edificio Mario Laserna',
    color: 'blue',
    active: true,
    coordinate: { latitude: 4.6027, longitude: -74.0650 },
  },
  {
    id: '4',
    name: 'No olvidar',
    address: 'Calle 127 #10A-23',
    color: 'green',
    active: false,
    coordinate: { latitude: 4.5995, longitude: -74.0680 },
  },
];

export const initialCenter = { latitude: 4.6022, longitude: -74.0672 };
export const initialZoom = 16;
