import { Modal, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { PinIcon } from '@/components/ui/PinIcon';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Props = {
  visible: boolean;
  onAllow: () => void;
};

export function LocationPermissionModal({ visible, onAllow }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      navigationBarTranslucent
      // El diseño no tiene opción de cancelar: solo se cierra con "Permitir".
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop}>
        <View style={styles.card} accessibilityViewIsModal>
          <PinIcon color={colors.accent} size={62} />
          <Text style={[typography.body, styles.message]}>
            Necesitamos tu ubicación para activar las alarmas cuando llegues a tu destino.
          </Text>
          <Text style={[typography.small, styles.terms]}>
            Puedes consultar los <Text style={styles.termsLink}>términos y condiciones</Text>
          </Text>
          <Button title="Permitir" onPress={onAllow} style={styles.button} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: colors.backdrop,
  },
  card: {
    width: '100%',
    maxWidth: 332,
    alignItems: 'center',
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.modalSurface,
  },
  message: {
    marginTop: 34,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  terms: {
    marginTop: 44,
    textAlign: 'center',
  },
  termsLink: {
    color: colors.accent,
  },
  button: {
    alignSelf: 'stretch',
    height: 50,
    marginTop: 20,
  },
});
