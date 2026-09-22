import Svg, { Circle, Path } from 'react-native-svg';

// Misma geometría que el MapPin de lucide, pero con la gota rellena y el anillo en blanco (como en el diseño).
const PIN_PATH =
  'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0';
const PIN_VIEWBOX = '3.6 1.6 16.8 20.8';
export const PIN_ASPECT = 20.8 / 16.8;

type Props = {
  color: string;
  size?: number;
};

export function PinIcon({ color, size = 48 }: Props) {
  return (
    <Svg width={size} height={size * PIN_ASPECT} viewBox={PIN_VIEWBOX}>
      <Path d={PIN_PATH} fill={color} stroke="rgba(255, 255, 255, 0.6)" strokeWidth={0.4} />
      <Circle cx={12} cy={10} r={3} fill="none" stroke="#FFFFFF" strokeWidth={1.3} />
    </Svg>
  );
}

/** El mismo pin como markup SVG, para dibujarlo dentro del mapa web (Leaflet). */
export function pinSvgMarkup(color: string, size: number) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * PIN_ASPECT}" viewBox="${PIN_VIEWBOX}">` +
    `<path d="${PIN_PATH}" fill="${color}" stroke="rgba(255,255,255,0.6)" stroke-width="0.4"/>` +
    `<circle cx="12" cy="10" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.3"/>` +
    `</svg>`
  );
}
