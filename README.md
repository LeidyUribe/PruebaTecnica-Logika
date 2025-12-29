# Prueba Técnica Frontend - Logika

Aplicación React 18 con TypeScript que implementa un sistema de autenticación y gestión de acciones, siguiendo principios de Clean Architecture y buenas prácticas de desarrollo frontend.

## 🚀 Características

- ✅ **Login con token** - Autenticación mediante API REST
- ✅ **Dashboard con listado paginado** - Visualización de acciones con paginación funcional
- ✅ **Modal de creación** - Crear nuevas acciones mediante modal con validaciones
- ✅ **Switch toggle** - Estado activo/inactivo con toggle switch
- ✅ **Upload de archivos** - Campo para subir icono con preview
- ✅ **Rutas protegidas** - Protección de rutas privadas
- ✅ **Manejo de estados** - Loading, error y empty states
- ✅ **Notificaciones toast** - Feedback visual con react-hot-toast
- ✅ **TypeScript** - Tipado fuerte en toda la aplicación
- ✅ **Clean Architecture** - Separación de responsabilidades y código modular

## 📋 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x o yarn >= 1.22.x

## 🛠️ Instalación y Ejecución

### Paso 1: Clonar el repositorio

```bash
git clone <repository-url>
cd PruebaTecnica-Logika
```

O descargar y extraer el código fuente.

### Paso 2: Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias (React, TypeScript, Axios, etc.).

### Paso 3: Iniciar el servidor de desarrollo

```bash
npm run dev
```

O usando el comando equivalente:

```bash
npm start
```

> **Nota**: Este proyecto usa Vite, por lo que `npm run dev` es el comando correcto. Si prefieres usar `npm start`, puedes agregarlo al `package.json`.

### Paso 4: Abrir en el navegador

La aplicación estará disponible en:
```
http://localhost:5173
```

### Credenciales de Prueba

Una vez que la aplicación esté corriendo, puedes usar estas credenciales para iniciar sesión:

```
Usuario: a.berrio@yopmail.com
Contraseña: AmuFK8G4Bh64Q1uX+IxQhw==
```

## 📁 Estructura del Proyecto

```
src/
├── api/                    # Servicios API
│   ├── axios.config.ts     # Configuración de Axios e interceptores
│   ├── auth.service.ts     # Servicio de autenticación
│   └── actions.service.ts  # Servicio de acciones
├── components/             # Componentes reutilizables
│   ├── common/             # Componentes comunes (Button, Input, etc.)
│   ├── dashboard/          # Componentes del dashboard (Table, Pagination)
│   └── routes/             # Componentes de rutas (ProtectedRoute)
├── constants/              # Constantes de la aplicación
│   └── index.ts            # Endpoints, rutas, mensajes, etc.
├── context/                # Contextos de React
│   └── AuthContext.tsx     # Contexto de autenticación
├── hooks/                  # Custom hooks
│   ├── useAuth.ts          # Hook de autenticación
│   └── useActions.ts       # Hook de acciones
├── pages/                  # Páginas de la aplicación
│   ├── Login/              # Página de login
│   └── Dashboard/          # Página principal del dashboard
├── components/             # Componentes reutilizables
│   ├── common/             # Componentes comunes
│   │   ├── Button/         # Botón reutilizable
│   │   ├── Input/          # Input con validación
│   │   ├── LoadingSpinner/ # Spinner de carga
│   │   ├── ErrorMessage/   # Mensaje de error
│   │   ├── Modal/          # Modal reutilizable
│   │   └── Switch/         # Toggle switch
│   ├── dashboard/          # Componentes del dashboard
│   │   ├── ActionsTable/   # Tabla de acciones
│   │   ├── Pagination/     # Paginación
│   │   └── CreateActionModal/ # Modal de crear acción
│   └── routes/             # Componentes de rutas
│       └── ProtectedRoute/ # Ruta protegida
├── types/                  # Definiciones de tipos TypeScript
│   └── index.ts            # Tipos globales
├── utils/                  # Utilidades
│   └── storage.ts          # Utilidades de localStorage
├── App.tsx                 # Componente raíz
├── main.tsx                # Punto de entrada
└── index.css               # Estilos globales
```

## 🏗️ Arquitectura

### Principios Aplicados

1. **Separation of Concerns** - Cada módulo tiene una responsabilidad única
2. **Single Responsibility** - Cada función/componente hace una sola cosa
3. **DRY (Don't Repeat Yourself)** - Reutilización de código mediante hooks y componentes
4. **Clean Code** - Código legible, mantenible y bien documentado

### Capas de la Aplicación

1. **API Layer** (`api/`)
   - Servicios que encapsulan las llamadas HTTP
   - Configuración centralizada de Axios
   - Manejo de interceptores para autenticación

2. **Business Logic Layer** (`hooks/`, `context/`)
   - Lógica de negocio encapsulada en hooks
   - Estado global mediante Context API
   - Separación de lógica de presentación

3. **Presentation Layer** (`pages/`, `components/`)
   - Componentes de UI puros
   - Páginas que orquestan componentes
   - Componentes reutilizables

4. **Infrastructure Layer** (`utils/`, `constants/`)
   - Utilidades y helpers
   - Constantes centralizadas
   - Configuración

## 🔧 Stack Tecnológico

### Dependencias Principales

- **React 18.2.0** - Biblioteca de UI
- **React DOM 18.2.0** - Renderizado de React
- **TypeScript 5.3.2** - Tipado estático
- **React Router DOM 6.20.0** - Enrutamiento y navegación
- **React Hook Form 7.48.2** - Manejo de formularios y validaciones
- **Axios 1.6.2** - Cliente HTTP con interceptores
- **React Hot Toast 2.4.1** - Notificaciones toast (alertas visuales)
- **Zustand 4.4.7** - (Incluido en package.json pero no usado, se optó por Context API)

### Herramientas de Desarrollo

- **Vite 5.0.5** - Build tool y servidor de desarrollo
- **Tailwind CSS 3.3.6** - Framework de estilos utility-first
- **PostCSS 8.4.32** - Procesador de CSS
- **Autoprefixer 10.4.16** - Auto-prefijos para CSS
- **ESLint 8.54.0** - Linter para calidad de código
- **TypeScript ESLint** - Linter específico para TypeScript

## 🔐 Autenticación

### Credenciales de Prueba

```
Usuario: a.berrio@yopmail.com
Contraseña: AmuFK8G4Bh64Q1uX+IxQhw==
```

### Flujo de Autenticación

1. Usuario ingresa credenciales en el formulario de login
2. Se realiza petición POST a `/api/Authentication/Login`
3. El token se almacena en `localStorage`
4. El token se incluye automáticamente en todas las peticiones mediante interceptor
5. Si el token expira (401), se redirige automáticamente al login

## 📡 APIs Consumidas

### Login
```
POST https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login
Body: { username: string, password: string }
Response: { token: string }
```

### Listado de Acciones
```
GET https://dev.api.bekindnetwork.com/api/v1/actions/admin-list?pageNumber=1&pageSize=10
Headers: Authorization: Bearer <token>
Response: { data: Action[], pageNumber, pageSize, totalCount, totalPages, ... }
```

### Crear Acción
```
POST https://dev.api.bekindnetwork.com/api/v1/actions/admin-add
Headers: Authorization: Bearer <token>
Body: { title: string, description?: string, ... }
Response: Action
```

## 🎨 Componentes Principales

### Componentes Comunes

- **Button** - Botón reutilizable con variantes (primary, secondary, danger, outline)
- **Input** - Input con label, error y helper text
- **LoadingSpinner** - Indicador de carga
- **ErrorMessage** - Mensaje de error estilizado

### Componentes del Dashboard

- **ActionsTable** - Tabla que muestra el listado de acciones con estados (loading, error, empty)
- **Pagination** - Componente de paginación con navegación

### Rutas

- **ProtectedRoute** - Componente que protege rutas privadas

## 🧪 Testing

Ver `QA_CHECKLIST.md` para la lista completa de pruebas funcionales.

## 📝 Decisiones Técnicas

### Arquitectura y Organización

**Clean Architecture y Separación de Responsabilidades**
- Se implementó una arquitectura por capas (API, Business Logic, Presentation, Infrastructure)
- Cada módulo tiene una responsabilidad única (Single Responsibility Principle)
- Separación clara entre lógica de negocio (hooks) y presentación (componentes)
- **Razón**: Facilita mantenimiento, testing y escalabilidad

**Estructura de Carpetas por Feature/Responsabilidad**
- Organización por tipo de archivo (api/, components/, hooks/, etc.) en lugar de por feature
- **Razón**: Para esta escala de proyecto, facilita encontrar código relacionado rápidamente
- **Alternativa considerada**: Organización por feature (auth/, dashboard/, actions/) - válida para proyectos más grandes

### Gestión de Estado

**Context API en lugar de Zustand/Redux**
- Se utilizó React Context API para el estado global de autenticación
- **Razón**: 
  - Simplicidad para el alcance de esta prueba
  - Menos dependencias externas
  - Solución nativa de React
  - Fácil migración a Zustand/Redux si el proyecto crece
- **Nota**: Zustand está en package.json pero no se utilizó

**Estado Local con useState para Componentes**
- Estado local para datos que no se comparten (ej: `currentPage` en Dashboard)
- **Razón**: Evita prop drilling innecesario y mantiene componentes simples

### Manejo de Formularios

**React Hook Form**
- Se eligió React Hook Form para todos los formularios (Login, CreateAction)
- **Razón**:
  - Mejor performance: menos re-renders que con estado controlado
  - Sistema de validación robusto y declarativo
  - Excelente integración con TypeScript
  - Librería estándar en la industria
  - Validación en modo `onBlur` para mejor UX

### Cliente HTTP

**Axios en lugar de fetch nativo**
- Se utilizó Axios para todas las peticiones HTTP
- **Razón**:
  - Interceptores: facilita inyección automática de tokens y manejo centralizado de errores
  - Transformación automática de JSON
  - Mejor estructura de errores
  - Soporte para cancelación de peticiones
  - Instancias separadas para diferentes APIs (authApi, actionsApi)

**Instancias Separadas de Axios**
- `authApi`: Para autenticación (sin token)
- `actionsApi`: Para acciones (con token automático)
- **Razón**: Separación de responsabilidades y configuración específica por dominio

### Estilos

**Tailwind CSS**
- Framework utility-first para todos los estilos
- **Razón**:
  - Desarrollo rápido sin cambiar entre archivos CSS
  - Sistema de diseño consistente
  - Clases responsive integradas
  - Bundle size optimizado (solo incluye clases usadas)
  - Fácil mantenimiento y consistencia visual

### Notificaciones

**React Hot Toast**
- Se implementó react-hot-toast para alertas visuales
- **Razón**:
  - Feedback inmediato al usuario para acciones exitosas y errores
  - Mejor UX que mensajes estáticos
  - Configuración simple y personalizable
  - No bloquea la interacción del usuario

### Enrutamiento

**React Router DOM v6**
- Enrutamiento declarativo con rutas protegidas
- **Razón**:
  - Estándar de la industria
  - Soporte para rutas protegidas mediante componentes
  - Navegación programática y declarativa
  - Manejo de estado en navegación (ej: refresh después de crear acción)

### Almacenamiento

**localStorage para Token**
- El token JWT se almacena en localStorage
- **Razón**:
  - Persistencia entre sesiones
  - Implementación simple
  - **Consideración de seguridad**: En producción, considerar HttpOnly cookies o sessionStorage
- **Nota**: Se abstrajo en `utils/storage.ts` para facilitar cambio futuro

### Manejo de Errores

**Interceptores Centralizados**
- Manejo de errores 401 (token expirado) en interceptores de Axios
- **Razón**: 
  - Lógica centralizada, no repetida en cada componente
  - Redirección automática al login cuando el token expira
  - Formateo consistente de errores para consumo en la UI

**Toast + Mensajes en Componentes**
- Errores mostrados con toast (global) y mensajes específicos en formularios
- **Razón**: Feedback inmediato (toast) + contexto específico (mensajes en formularios)

## ⚠️ Supuestos y Consideraciones

### Supuestos sobre el API

1. **Estructura de Respuesta del API de Login**
   - Se asumió que el token puede venir como:
     - String directo: `"token_string"`
     - Objeto: `{ token: "token_string" }`
   - **Implementación**: Se normaliza la respuesta para manejar ambos casos

2. **Estructura de Respuesta del API de Acciones**
   - Se asumió que la respuesta puede tener diferentes estructuras:
     - Array directo: `[...]`
     - Objeto con `data`: `{ data: [...] }`
     - Objeto anidado: `{ data: { data: [...] } }`
   - **Implementación**: Se normaliza la respuesta para manejar todas las variantes posibles

3. **Paginación del API**
   - Se asumió que `pageNumber` puede venir en base 0 o base 1
   - Se normaliza a base 1 para la UI
   - Se calculan `totalPages`, `hasPreviousPage`, `hasNextPage` si no vienen en la respuesta

4. **Campos de Action**
   - Se incluyeron campos: `id`, `name` (o `title`), `description`, `status`, `createdAt`
   - El campo `name` tiene prioridad sobre `title` si ambos existen
   - `status` puede ser número (0/1) o string, se normaliza para mostrar "Activo"/"Inactivo"

5. **Formato de Fechas**
   - Se asumió que `createdAt` viene en formato ISO string
   - Se formatea a `DD/MM/YYYY` para la UI

6. **Content-Type para Crear Acción**
   - Se asumió que el endpoint `/admin-add` requiere `multipart/form-data`
   - **Implementación**: Se usa `FormData` y se elimina el header `Content-Type` para que Axios lo configure automáticamente con el boundary correcto

7. **Validación de Campos Requeridos**
   - Se asumió que `name`, `description`, `color`, `status` e `icon` son requeridos según la validación del backend
   - **Implementación**: Validación en frontend con React Hook Form + validación adicional en `onSubmit`

### Supuestos sobre el Comportamiento

1. **Persistencia del Token**
   - El token persiste entre recargas de página (localStorage)
   - Si el token expira, se redirige automáticamente al login

2. **Rutas Protegidas**
   - Todas las rutas excepto `/login` requieren autenticación
   - Si el usuario intenta acceder a una ruta protegida sin token, se redirige a `/login`

3. **Refresh de Lista después de Crear**
   - Después de crear una acción exitosamente, se redirige al dashboard y se recarga la lista
   - Se usa `state: { refresh: true }` en la navegación para forzar recarga

4. **Manejo de Estados de UI**
   - Loading: Se muestra spinner durante peticiones
   - Error: Se muestra mensaje de error y toast
   - Empty: Se muestra mensaje cuando no hay datos
   - Success: Se muestra toast de éxito

### Consideraciones de Seguridad

1. **Token en localStorage**
   - **Riesgo**: Vulnerable a XSS
   - **Mitigación en producción**: Considerar HttpOnly cookies o sessionStorage
   - **Nota**: Para esta prueba técnica, localStorage es aceptable

2. **Validación en Frontend**
   - Las validaciones en frontend son para UX, no para seguridad
   - El backend debe validar todos los datos
   - **Implementación**: Se validan campos requeridos y formatos, pero el backend es la fuente de verdad

## 🚧 Funcionalidades Pendientes / Mejoras Futuras

1. **Tests Unitarios y de Integración**
   - **Estado**: No implementado
   - **Razón**: No se especificó en los requerimientos
   - **Implementación sugerida**: 
     - Jest + React Testing Library para componentes
     - Tests de hooks con `@testing-library/react-hooks`
     - Tests de servicios API con mocks de Axios

2. **Refresh Automático del Token**
   - **Estado**: No implementado
   - **Razón**: No se especificó endpoint de refresh en los requerimientos
   - **Implementación sugerida**: 
     - Interceptor que detecte 401
     - Llamar a endpoint de refresh antes de redirigir
     - Reintentar la petición original con el nuevo token

3. **Manejo de Errores más Granular**
   - **Estado**: Implementado parcialmente
   - **Razón**: El API puede retornar errores por campo, pero se muestra principalmente mensaje general
   - **Mejora sugerida**: 
     - Parsear `errors` del `ApiError` cuando venga en la respuesta
     - Mostrar errores específicos por campo en formularios
     - Mapear errores del backend a mensajes amigables

4. **Variables de Entorno**
   - **Estado**: URLs hardcodeadas en constants
   - **Razón**: Para esta prueba, las URLs son conocidas
   - **Mejora sugerida**: 
     - Usar `.env` con `VITE_API_AUTH_URL` y `VITE_API_ACTIONS_URL`
     - Diferentes configuraciones para dev/staging/prod

5. **Optimizaciones de Performance**
   - **Estado**: Implementación básica
   - **Mejoras sugeridas**:
     - Lazy loading de rutas con `React.lazy()`
     - Memoización de componentes pesados con `React.memo()`
     - Virtualización de listas largas (react-window)
     - Code splitting por rutas

6. **Accesibilidad (a11y)**
   - **Estado**: Implementación básica
   - **Mejoras sugeridas**:
     - ARIA labels en componentes interactivos
     - Navegación por teclado completa
     - Contraste de colores según WCAG
     - Screen reader support

7. **Internacionalización (i18n)**
   - **Estado**: No implementado (textos en español hardcodeados)
   - **Mejora sugerida**: react-i18next o similar para múltiples idiomas

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Preview de la build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🔍 Variables de Entorno

Actualmente las URLs de los APIs están hardcodeadas en `src/constants/index.ts`. Para producción, se recomienda usar variables de entorno:

```env
VITE_API_AUTH_URL=https://dev.apinetbo.bekindnetwork.com
VITE_API_ACTIONS_URL=https://dev.api.bekindnetwork.com
```

Y actualizar `src/constants/index.ts` para leerlas con `import.meta.env.VITE_API_AUTH_URL`.

## 📄 Licencia

Este proyecto es una prueba técnica y no tiene licencia específica.

## 👤 Autor

Desarrollado como prueba técnica para Logika.

---

**Nota**: Esta aplicación fue desarrollada siguiendo principios de Clean Architecture y buenas prácticas de React. El código está documentado y estructurado para facilitar el mantenimiento y la escalabilidad.

