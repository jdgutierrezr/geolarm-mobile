import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, type TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Logo } from '@/components/ui/Logo';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { typography } from '@/theme/typography';

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  /** Contenido anclado al final de la pantalla (p. ej. enlace "¿No tienes cuenta?"). */
  footer?: ReactNode;
  paddingHorizontal?: number;
  logoTop?: number;
  titleTop?: number;
  titleStyle?: TextStyle;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  paddingHorizontal = 28,
  logoTop = 36,
  titleTop = 80,
  titleStyle,
}: Props) {
  return (
    <ScreenBackground>
      <SafeAreaView style={styles.flex} edges={['top', 'bottom']}>
        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={[styles.content, { paddingHorizontal }]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Logo width={280} style={[styles.logo, { marginTop: logoTop }]} />
            <Text style={[typography.title, { marginTop: titleTop }, titleStyle]} accessibilityRole="header">
              {title}
            </Text>
            <Text style={[typography.subtitle, styles.subtitle]}>{subtitle}</Text>
            {children}
            {footer ? (
              <>
                <View style={styles.flex} />
                <View style={styles.footer}>{footer}</View>
              </>
            ) : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  logo: {
    alignSelf: 'center',
  },
  subtitle: {
    marginTop: 12,
  },
  footer: {
    paddingTop: 24,
    paddingBottom: 8,
  },
});
