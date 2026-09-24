import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';
import { colors } from '@/theme/colors';

type Props = {
  onLogout: () => void;
};

export function NavBar({ onLogout }: Props) {
  return (
    <View style={styles.shadow}>
      <LinearGradient
        colors={[colors.navStart, colors.navEnd]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.bar}
      >
        <Image source={require('@assets/clouds-texture.png')} contentFit="cover" style={styles.clouds} />
        <Logo width={175} />
        <IconButton icon={LogOut} size={50} accessibilityLabel="Cerrar sesión" onPress={onLogout} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 45,
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.3)',
  },
  bar: {
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 33,
    paddingRight: 32,
  },
  clouds: {
    ...StyleSheet.absoluteFill,
    opacity: 0.55,
  },
});
