# 🚀 Inicio Rápido - Prueba Técnica Logika

Guía rápida para poner en marcha el proyecto en minutos.

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x (o yarn >= 1.22.x)

## ⚡ Instalación y Ejecución

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Iniciar servidor de desarrollo

```bash
npm run dev
```

### Paso 3: Abrir en navegador

La aplicación estará disponible en:
```
http://localhost:5173
```

> **Nota**: El servidor se recarga automáticamente cuando guardas cambios (Hot Module Replacement).

## Credenciales de Prueba

```
Usuario: a.berrio@yopmail.com
Contraseña: AmuFK8G4Bh64Q1uX+IxQhw==
```

## 📁 Estructura del Proyecto

```
src/
├── api/              → Servicios API (auth, actions)
│   ├── axios.config.ts
│   ├── auth.service.ts
│   └── actions.service.ts
├── components/       → Componentes reutilizables
│   ├── common/       → Button, Input, LoadingSpinner, ErrorMessage
│   ├── dashboard/    → ActionsTable, Pagination
│   └── routes/       → ProtectedRoute
├── pages/            → Páginas principales
│   ├── Login/
│   ├── Dashboard/
│   └── CreateAction/
├── hooks/            → Custom hooks
│   ├── useAuth.ts
│   └── useActions.ts
├── context/          → Context API
│   └── AuthContext.tsx
├── types/            → Tipos TypeScript
│   └── index.ts
├── constants/        → Constantes centralizadas
│   └── index.ts
└── utils/            → Utilidades
    └── storage.ts
```

## Rutas Principales

- `/login` - Página de inicio de sesión
- `/dashboard` - Listado de acciones (protegida)
- `/dashboard/create-action` - Crear nueva acción (protegida)

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev      # Inicia servidor de desarrollo (Vite)

# Producción
npm run build    # Construye la aplicación para producción
npm run preview  # Preview de la build de producción

# Calidad de código
npm run lint     # Ejecuta ESLint
```

## 📚 Documentación Completa

Para más detalles, consulta:

- **README.md** - Documentación completa, decisiones técnicas y supuestos
- **ARCHITECTURE.md** - Diseño de arquitectura detallado y principios aplicados
- **QA_CHECKLIST.md** - Lista de 10 pruebas funcionales para validar el proyecto

## ✨ Características Implementadas

✅ **Login con token** - Autenticación mediante API REST  
✅ **Dashboard con paginación** - Listado de acciones con navegación  
✅ **Crear acción** - Formulario completo con validaciones  
✅ **Upload de archivos** - Campo icon con preview y validación  
✅ **Rutas protegidas** - Protección automática de rutas privadas  
✅ **Manejo de estados** - Loading, error y empty states  
✅ **Notificaciones toast** - Feedback visual con react-hot-toast  
✅ **TypeScript** - Tipado fuerte en toda la aplicación  
✅ **Clean Architecture** - Separación de responsabilidades  

## 🔑 Información Importante

### Autenticación
- El token se guarda en `localStorage` con key `auth_token`
- Las peticiones a `/api/v1/actions/*` incluyen automáticamente el token (interceptor)
- Si el token expira (401), se redirige automáticamente al login
- El token persiste entre recargas de página

### Formularios
- Validación en tiempo real con React Hook Form
- Validación en modo `onBlur` para mejor UX
- Campos requeridos: nombre, descripción, color, estado, icono
- Upload de archivos con FormData (multipart/form-data)

### Estados de UI
- **Loading**: Spinner durante peticiones
- **Error**: Mensajes de error con toast y componentes ErrorMessage
- **Empty**: Mensaje cuando no hay datos
- **Success**: Toast de éxito para acciones completadas

## 🚀 Próximos Pasos

1. **Inicia sesión** con las credenciales de prueba
2. **Explora el dashboard** y navega entre páginas
3. **Crea una acción** usando el formulario completo
4. **Revisa el código** siguiendo la estructura de Clean Architecture
5. **Ejecuta las pruebas** del QA_CHECKLIST.md

## 💡 Tips

- Abre DevTools (F12) para ver las peticiones HTTP en la pestaña Network
- Revisa `localStorage` en Application → Local Storage para ver el token
- Los errores se muestran con toast (esquina superior derecha) y mensajes en formularios
- La paginación funciona automáticamente cuando hay más de 10 acciones

---

**¡Listo para empezar!** 🎉

Si encuentras algún problema, revisa la documentación completa en `README.md` o `ARCHITECTURE.md`.

