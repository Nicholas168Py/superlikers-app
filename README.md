# Superlikers App

**Superlikers App** es una aplicación híbrida desarrollada con **Angular** e **Ionic**, diseñada para ejecutarse tanto en la web como en dispositivos móviles usando **Capacitor**.

## 📦 Versión

`v0.0.1`

## 🚀 Características principales

- Framework principal: Angular
- UI adaptable con Ionic
- Capacitor para funciones nativas (Android/iOS)
- Configuración de ESLint, proxy y entorno de desarrollo

## 📁 Estructura importante

- `angular.json` – configuración del proyecto Angular
- `ionic.config.json` – configuración de Ionic
- `capacitor.config.ts` – ajustes para despliegue móvil
- `proxy.conf.json` – configuración de redirección de peticiones
- `package.json` – scripts y dependencias

## 🛠️ Instalación y configuración

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/superlikers-app.git
cd superlikers-app

# Instala las dependencias del proyecto
npm install
```

## ▶️ Ejecución en modo desarrollo

Para visualizar la aplicación en el navegador con proxy configurado:

```bash
npx ng serve --proxy-config proxy.conf.json
```

La aplicación estará disponible en:

```
http://localhost:4200/
```

### Simular vista móvil en el navegador

1. Abre tu navegador y ve a `http://localhost:4200/`
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Haz clic en el ícono de dispositivo móvil (o usa `Ctrl + Shift + M`)
4. Selecciona un modelo de teléfono para simular la vista móvil

> Esto permite ver cómo se adapta el diseño responsive de la app.

## 📱 Despliegue en dispositivos móviles

```bash
# Sincroniza la app con Capacitor
npx cap sync

# Abre el proyecto en Android Studio o Xcode
npx cap open android
# o
npx cap open ios
```

## 🧪 Scripts disponibles

```bash
npm run start      # Inicia la app (usa proxy si configuras ng serve manualmente)
npm run build      # Compila el proyecto
npm run watch      # Observa cambios
npm run test       # Ejecuta pruebas
```

## 📚 Tecnologías usadas

- `@angular/core`
- `@angular/forms`
- `@ionic/angular`
- `@capacitor/core`

Consulta `package.json` para el listado completo.

## 📄 Licencia

Este proyecto se distribuye bajo licencia [MIT](LICENSE).

---

**Autor:** Nicholas Rocha Acosta
