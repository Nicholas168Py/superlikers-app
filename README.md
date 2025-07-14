# Superlikers App

Aplicación móvil desarrollada con **Ionic + Angular** para la gestión y visualización de KPIs de participantes en campañas.

## Características principales
- Autenticación de participantes (login).
- Visualización de metas por volumen (KPIs).
- Barra de progreso y gráficos de avance.
- Menú lateral con navegación.
- Solicitud de permisos de notificaciones push (con Capacitor).
- Diseño adaptado a dispositivos móviles.

---

## Requisitos previos

| Herramienta        | Requerido para | Instalación |
|--------------------|-----------------|-------------|
| **Node.js** (v18+) | Angular, Ionic | https://nodejs.org/ |
| **Ionic CLI**     | Servidor Dev, Build | `npm install -g @ionic/cli` |
| **Capacitor**     | Funcionalidades nativas | Instalado con Ionic |
| **Android Studio** | Pruebas en dispositivo/emulador | https://developer.android.com/studio |
| **Java JDK 17+**  | Android Studio | https://jdk.java.net/ |

---

## Instalación del proyecto

```bash
# Clonar el repositorio
git clone <url-del-repo>

# Ingresar al proyecto
cd superlikers-app

# Instalar dependencias
npm install
```

---

## Configuración especial

### Proxy para consumir API local (solo en desarrollo)
- El proyecto usa un proxy para evitar CORS  
- Configurado en: `proxy.conf.json`
- Verifica o ajusta la URL del backend si es necesario

---

## Servidor de desarrollo (Web)

```bash
ionic serve
```

> ⚠️ Las notificaciones push no funcionan en navegador.  
> Se recomienda solo para pruebas de UI y conexión API.

---

## Compilación y pruebas en Android

### Sincronizar Capacitor
```bash
npx cap sync android
```

### Abrir en Android Studio
```bash
npx cap open android
```

### Desde Android Studio
- Esperar a que Gradle configure el proyecto
- Conectar un dispositivo o usar un AVD (emulador) con **Google APIs x86_64**
- Ejecutar el proyecto

---

## Notificaciones Push

- El plugin `@capacitor/push-notifications` requiere **dispositivo real o emulador con servicios de Google**
- En Web **no está soportado**

---

## Consideraciones por sistema operativo

| Sistema | Consideración |
|---------|---------------|
| **Windows** | Habilitar Virtualización Intel (VT-x) para emuladores |
| **MacOS**  | Si es chip Apple Silicon, usar imágenes ARM64 |
| **Linux**  | Verificar instalación de KVM y permisos para emulación |

---

## Errores comunes

- ❗ **HAXM no instalado / VM issue**: Revisa si la virtualización está activa en BIOS
- ❗ **Capacitor plugin not available on web**: Ocurre si pruebas notificaciones en navegador
- ❗ **Budget exceeded (Angular)**: Puedes aumentar los budgets en `angular.json` si es necesario

---

## Autor y contacto

Desarrollado por: **Nicholas Rocha**  
Correo: **nicolasrochaacosta@gmail.com**
