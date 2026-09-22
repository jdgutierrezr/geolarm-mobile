import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View, type TextInput } from 'react-native';

import { AuthLayout } from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { TextLink } from '@/components/ui/TextLink';
import { hasErrors, validateSignup, type SignupValues } from '@/utils/validation';

export default function SignupScreen() {
  const [values, setValues] = useState<SignupValues>({ name: '', email: '', password: '', confirmPassword: '' });
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  // Los errores solo aparecen después del primer intento de envío y luego se recalculan en vivo.
  const errors = submitted ? validateSignup(values) : {};

  const set = (field: keyof SignupValues) => (text: string) => setValues((v) => ({ ...v, [field]: text }));

  const handleSubmit = () => {
    setSubmitted(true);
    if (!hasErrors(validateSignup(values))) {
      // AlarmsList abre el modal de permiso de ubicación al llegar desde el registro.
      router.replace({ pathname: '/alarms', params: { askLocation: '1' } });
    }
  };

  return (
    <AuthLayout
      title="Crea una cuenta"
      subtitle="Regístrate para comenzar a gestionar tus alarmas."
      paddingHorizontal={20}
      logoTop={48}
      titleTop={56}
      titleStyle={styles.title}
    >
      <View style={styles.fields}>
        <TextField
          label="Nombre"
          placeholder="Escribe tu nombre"
          value={values.name}
          onChangeText={set('name')}
          error={errors.name}
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <TextField
          ref={emailRef}
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
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => confirmRef.current?.focus()}
        />
        <TextField
          ref={confirmRef}
          label="Confirmar contraseña"
          placeholder="Escribe de nuevo tu contraseña"
          secure
          value={values.confirmPassword}
          onChangeText={set('confirmPassword')}
          error={errors.confirmPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>

      <Button title="Registrarse" onPress={handleSubmit} style={styles.button} />
      <TextLink title="¿Ya tienes cuenta?" onPress={() => router.replace('/login')} style={styles.login} />
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    lineHeight: 46,
  },
  fields: {
    marginTop: 16,
    gap: 16,
  },
  button: {
    marginTop: 32,
  },
  login: {
    marginTop: 12,
  },
});
