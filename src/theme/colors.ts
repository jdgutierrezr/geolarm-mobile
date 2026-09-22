// Paleta de Geolarm. Cada escala va de claro a oscuro; el tono base está marcado.
export const palette = {
  // Fondo principal · navegación
  azulMarino: ['#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', '#475569', '#1E293B' /* base */, '#0F172A', '#020617', '#05070C', '#03050A'],
  // Mapa · rutas · pines inactivos
  azulCobalto: ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#2563EB' /* base */, '#1D4ED8', '#1E40AF', '#172554', '#0B1B3A'],
  // Alarma · destino · alertas
  naranjaCoral: ['#FFF4F0', '#FFE4D6', '#FFD5CC', '#FFB8A3', '#FFA38F', '#FF6B4A' /* base */, '#D94324', '#B63A1A', '#6E1E10', '#4A120A'],
  // Contenido · tarjetas · iconos
  grisClaro: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#F8FAFC' /* base */, '#CBD5E1', '#94A3B8', '#64748B', '#475569'],
  // Fondos oscuros · texto · contraste
  negro: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#94A3B8', '#64748B', '#475569', '#1E293B', '#0F172A', '#000000' /* base */],
  // Confirmaciones · estados exitosos
  verde: ['#ECFDF5', '#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#22C55E' /* base */, '#059669', '#047857', '#065F46', '#064E3B', '#062E2A'],
  // Advertencias · precauciones
  amarillo: ['#FFFBEB', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#EAB308' /* base */, '#D97706', '#B45309', '#92400E', '#78350F', '#5B2C0A'],
  // Errores · acciones destructivas
  rojo: ['#FEF2F2', '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444' /* base */, '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#5B0A0A'],
  // Estados informativos · notificaciones
  azulMorado: ['#F5F3FF', '#E9D5FF', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6' /* base */, '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#3B0F6B'],
} as const;

export const colors = {
  primary: palette.azulCobalto[6],
  primaryPressed: palette.azulCobalto[7],
  title: palette.azulCobalto[5],

  accent: palette.naranjaCoral[5],
  accentPressed: palette.naranjaCoral[6],

  error: palette.rojo[5],

  text: palette.negro[10],
  placeholder: palette.azulMarino[3],
  border: palette.azulMarino[3],
  borderFilled: palette.azulMarino[4],
  mutedText: palette.azulMarino[3],

  background: '#F4F3EF',
  surface: palette.grisClaro[1],
  modalSurface: '#F3F3EF',
  white: palette.grisClaro[0],

  disabledBg: palette.grisClaro[4],
  disabledText: palette.negro[6],

  switchTrackOff: palette.grisClaro[3],
  switchThumbOff: '#A3A3A3',
  switchThumbOn: '#F3F1EC',

  navStart: palette.azulMarino[6],
  navEnd: palette.azulCobalto[6],

  backdrop: 'rgba(0, 0, 0, 0.45)',
  shadow: '#000000',
} as const;

// Colores que puede tener una alarma (selector de color del diseño).
export const alarmColors = {
  blue: '#0A84FF',
  yellow: '#FFCC00',
  red: palette.rojo[5],
  green: palette.verde[5],
} as const;

export type AlarmColor = keyof typeof alarmColors;
