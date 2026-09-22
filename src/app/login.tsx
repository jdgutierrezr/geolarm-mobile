import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View, type TextInput } from 'react-native';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { TextLink } from '@/components/ui/TextLink';
import { hasErrors, validateLogin, type LoginValues } from '@/utils/validation';

export default function LoginScreen() {
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const passwordRef = useRef<TextInput>(null);

  // Los errores solo aparecen después del primer intento de envío y luego se recalculan en vivo.
  const errors = submitted ? validateLogin(values) : {};

  const set = (field: keyof LoginValues) => (text: string) => setValues((v) => ({ ...v, [field]: text }));

  const handleSubmit = () => {
    setSubmitted(true);
    if (!hasErrors(validateLogin(values))) {
      router.replace('/alarms');
    }
  };

  return (
    <AuthLayout
      title="Accede a tu cuenta"
      subtitle="Ingresa las credenciales de tu cuenta para continuar"
      footer={<TextLink title="¿No tienes cuenta? Regístrate" onPress={() => router.replace('/signup')} />}
    >
      <View style={styles.fields}>
        <TextField
          label="Email"
          placeholder="Escribe tu email"
          value={values.email}
          onChangeText={set('email')}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <TextField
          ref={passwordRef}
          label="Contraseña"
          placeholder="Escribe tu contraseña"
          secure
          value={values.password}
          onChangeText={set('password')}
          error={errors.password}
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <Button title="Iniciar sesión" onPress={handleSubmit} style={styles.button} />
      <TextLink title="¿Olvidaste tu contraseña?" style={styles.forgot} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  fields: {
    marginTop: 40,
    gap: 18,
  },
  button: {
    marginTop: 60,
  },
  forgot: {
    marginTop: 24,
  },
});
