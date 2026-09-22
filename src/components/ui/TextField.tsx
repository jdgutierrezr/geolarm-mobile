import { CircleAlert, Eye, EyeClosed } from 'lucide-react-native';
import { useState, type Ref } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Props = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label: string;
  error?: string;
  secure?: boolean;
  ref?: Ref<TextInput>;
};

export function TextField({ label, error, secure = false, value, onFocus, onBlur, ref, ...inputProps }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  const filled = Boolean(value);
  const EyeIcon = hidden ? EyeClosed : Eye;

  return (
    <View>
      <Text style={[typography.label, styles.label, focused && styles.labelFocused]}>{label}</Text>
      <View
        style={[
          styles.inputBox,
          filled && styles.inputBoxFilled,
          focused && styles.inputBoxFocused,
        ]}
      >
        <TextInput
          ref={ref}
          value={value}
          secureTextEntry={secure && hidden}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.accent}
          cursorColor={colors.accent}
          accessibilityLabel={label}
          accessibilityHint={error}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[typography.input, styles.input]}
          {...inputProps}
        />
        {secure && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Mostrar contraseña' : 'Ocultar contraseña'}
            style={styles.eye}
          >
            <EyeIcon color={colors.borderFilled} size={26} strokeWidth={1.5} />
          </Pressable>
        )}
      </View>
      {error ? (
        <View style={styles.errorRow} accessibilityLiveRegion="polite">
          <CircleAlert color={colors.error} size={13} strokeWidth={2} />
          <Text style={[typography.caption, styles.errorText]}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  labelFocused: {
    color: colors.accent,
  },
  inputBox: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.border,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  inputBoxFilled: {
    borderColor: colors.borderFilled,
  },
  inputBoxFocused: {
    borderColor: colors.accent,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  eye: {
    paddingRight: 20,
    paddingLeft: 8,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  errorText: {
    color: colors.error,
  },
});
