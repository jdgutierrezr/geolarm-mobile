![geolarm logo](assets/logo.svg)

Frontend para una aplicación de alarmas geolocalizadas del curso de Mejoramiento de la Experiencia de Usuario de la Universidad de los Andes.

## Integrantes

- Juan David Gutierrez Rodriguez
- Juan Sebastian Avila Nivia

## Qué necesitas

- [Node.js](https://nodejs.org/) 20.19 o superior (la versión LTS sirve).
- La app **Expo Go** en tu celular:
  - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - iPhone: [App Store](https://apps.apple.com/app/expo-go/id982107779)

## Empezar

1. Instala las dependencias (solo la primera vez):

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   npx expo start
   ```

3. Abre la app en tu celular escaneando el código QR que aparece en la terminal:
   - **Android:** desde la app Expo Go, con la opción "Scan QR code".
   - **iPhone:** con la cámara del celular; se abrirá en Expo Go.

El celular y el computador deben estar en la **misma red Wi-Fi**. Si no conecta (por ejemplo, en WSL o en una red de la universidad), usa el modo túnel:

```bash
npx expo start --tunnel
```

La app se actualiza automáticamente en el celular al guardar los cambios.

> La app es solo para iOS y Android; no funciona en el navegador. El mapa necesita conexión a internet.
