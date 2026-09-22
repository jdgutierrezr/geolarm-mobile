const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED = 'Este campo es obligatorio';
const INVALID_EMAIL = 'Ingresa un email válido';
const PASSWORDS_MISMATCH = 'Las contraseñas no coinciden';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export type LoginValues = { email: string; password: string };
export type SignupValues = { name: string; email: string; password: string; confirmPassword: string };

export function isEmail(value: string) {
  return EMAIL_REGEX.test(value.trim());
}

function validateEmail(value: string) {
  if (!value.trim()) return REQUIRED;
  if (!isEmail(value)) return INVALID_EMAIL;
  return undefined;
}

function validateRequired(value: string) {
  return value.trim() ? undefined : REQUIRED;
}

function compact<T>(errors: FormErrors<T>): FormErrors<T> {
  return Object.fromEntries(Object.entries(errors).filter(([, v]) => v)) as FormErrors<T>;
}

export function validateLogin(values: LoginValues): FormErrors<LoginValues> {
  return compact({
    email: validateEmail(values.email),
    password: validateRequired(values.password),
  });
}

export function validateSignup(values: SignupValues): FormErrors<SignupValues> {
  return compact({
    name: validateRequired(values.name),
    email: validateEmail(values.email),
    password: validateRequired(values.password),
    confirmPassword:
      validateRequired(values.confirmPassword) ??
      (values.confirmPassword !== values.password ? PASSWORDS_MISMATCH : undefined),
  });
}

export function hasErrors<T>(errors: FormErrors<T>) {
  return Object.keys(errors).length > 0;
}
