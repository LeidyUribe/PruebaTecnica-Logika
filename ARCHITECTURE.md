# Arquitectura del Proyecto - Prueba Técnica Logika

Este documento explica en detalle la arquitectura, decisiones de diseño y principios aplicados en la solución.

## 📐 Diseño de Arquitectura

### Enfoque: Clean Architecture + Separation of Concerns

La aplicación sigue una arquitectura en capas que separa claramente las responsabilidades:

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  (Pages, Components, Routes)            │
│  - Solo orquestación y renderizado      │
│  - Sin lógica de negocio                │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         BUSINESS LOGIC LAYER            │
│  (Hooks, Context)                       │
│  - Lógica de negocio encapsulada        │
│  - Estado global y local                │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         DATA LAYER                      │
│  (Services, API)                        │
│  - Comunicación con APIs                │
│  - Transformación de datos              │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         INFRASTRUCTURE LAYER            │
│  (Utils, Constants, Storage)            │
│  - Utilidades y helpers                 │
│  - Configuración                        │
└─────────────────────────────────────────┘
```

## 📁 Estructura de Carpetas - Justificación

### `/src/api/`
**Responsabilidad**: Comunicación con APIs externas

**Contenido**:
- `axios.config.ts`: Configuración centralizada de Axios
  - **Por qué**: Evita duplicación, facilita cambios globales (timeouts, headers, etc.)
  - **Interceptores**: Manejo automático de tokens y errores
- `auth.service.ts`: Servicio de autenticación
  - **Por qué**: Encapsula lógica de login, facilita testing y reutilización
- `actions.service.ts`: Servicio de acciones
  - **Por qué**: Separación de responsabilidades, cada servicio maneja un dominio

**Principio aplicado**: Single Responsibility Principle (SRP)

### `/src/components/`
**Responsabilidad**: Componentes reutilizables de UI

**Estructura**: Cada componente tiene su propia carpeta con `ComponentName.tsx` e `index.ts`

**Subcarpetas**:
- `common/`: Componentes genéricos reutilizables
  - `Button/`: Botón con variantes (primary, secondary, outline, danger)
  - `Input/`: Input con label, error y helper text (forwardRef para React Hook Form)
  - `LoadingSpinner/`: Indicador de carga con tamaños
  - `ErrorMessage/`: Mensaje de error estilizado
  - **Por qué**: Reutilización máxima, consistencia de UI, fácil mantenimiento
- `dashboard/`: Componentes específicos del dashboard
  - `ActionsTable/`: Tabla que muestra acciones con estados (loading, error, empty)
  - `Pagination/`: Componente de paginación con navegación anterior/siguiente
  - **Por qué**: Componentes que solo se usan en el dashboard, encapsulan lógica específica
- `routes/`: Componentes relacionados con routing
  - `ProtectedRoute.tsx`: Componente que protege rutas privadas
  - **Por qué**: Separación de lógica de routing y autenticación

**Principio aplicado**: DRY (Don't Repeat Yourself) + Single Responsibility

### `/src/pages/`
**Responsabilidad**: Páginas completas de la aplicación

**Estructura**: Cada página tiene su propia carpeta con `index.ts`
- **Por qué**: Facilita escalabilidad, cada página puede tener sus propios componentes locales
- **Ejemplo**: `Login/Login.tsx` + `Login/index.ts`

**Principio aplicado**: Modularidad

### `/src/hooks/`
**Responsabilidad**: Custom hooks con lógica de negocio

**Contenido**:
- `useAuth.ts`: Lógica de autenticación
- `useActions.ts`: Lógica de acciones

**Por qué separar en hooks**:
1. **Reutilización**: La lógica se puede usar en múltiples componentes
2. **Testing**: Fácil de testear de forma aislada
3. **Separación**: Los componentes solo orquestan, no contienen lógica
4. **Mantenibilidad**: Cambios en lógica no afectan componentes

**Principio aplicado**: Separation of Concerns

### `/src/context/`
**Responsabilidad**: Estado global de la aplicación

**Contenido**:
- `AuthContext.tsx`: Contexto de autenticación

**Por qué Context API**:
- **Simplicidad**: Para esta prueba, es suficiente
- **React nativo**: No requiere dependencias adicionales
- **Escalabilidad**: Fácil migrar a Zustand/Redux si crece

**Principio aplicado**: KISS (Keep It Simple, Stupid)

### `/src/types/`
**Responsabilidad**: Definiciones de tipos TypeScript

**Por qué centralizar**:
- **Consistencia**: Un solo lugar para tipos
- **Reutilización**: Tipos compartidos entre módulos
- **Mantenibilidad**: Cambios en un solo lugar

### `/src/constants/`
**Responsabilidad**: Valores constantes de la aplicación

**Contenido**:
- Endpoints de API
- Rutas de la aplicación
- Mensajes de UI
- Valores de configuración

**Por qué centralizar**:
- **Mantenibilidad**: Cambios en un solo lugar
- **Evitar magic strings**: Código más legible y seguro
- **Refactoring**: Fácil cambiar valores globales

### `/src/utils/`
**Responsabilidad**: Funciones utilitarias

**Contenido**:
- `storage.ts`: Utilidades de localStorage

**Por qué abstraer**:
- **Flexibilidad**: Fácil cambiar de localStorage a otra solución
- **Testing**: Fácil mockear
- **Reutilización**: Funciones compartidas

## 🔄 Flujo de Datos

### Flujo de Autenticación

```
1. Usuario ingresa credenciales (Login.tsx)
   ↓
2. useAuth hook llama a authService.login()
   ↓
3. authService hace petición POST a API
   ↓
4. Token se guarda en localStorage (storage.ts)
   ↓
5. AuthContext actualiza isAuthenticated = true
   ↓
6. ProtectedRoute permite acceso
   ↓
7. Interceptor de Axios agrega token a peticiones
```

### Flujo de Carga de Acciones

```
1. Dashboard se monta
   ↓
2. useEffect llama a useActions.fetchActions()
   ↓
3. actionsService.getActionsList() hace petición GET
   ↓
4. Interceptor agrega token automáticamente
   ↓
5. Respuesta se transforma y guarda en estado
   ↓
6. ActionsTable renderiza los datos
```

### Flujo de Crear Acción

```
1. Usuario completa formulario (CreateAction.tsx)
   ↓
2. React Hook Form valida datos (name, description, color, status, icon)
   ↓
3. Validación adicional: verifica que iconFile esté seleccionado
   ↓
4. Se crea FormData con todos los campos (multipart/form-data)
   ↓
5. useActions.createAction() llama a actionsService.createAction()
   ↓
6. Interceptor agrega token automáticamente
   ↓
7. Interceptor detecta FormData y elimina Content-Type para boundary automático
   ↓
8. Petición POST con FormData
   ↓
9. Éxito → Toast de éxito + Redirección al dashboard con state: { refresh: true }
   ↓
10. Dashboard detecta refresh y recarga lista automáticamente
```

## 🎯 Principios SOLID Aplicados

### Single Responsibility Principle (SRP)

**Ejemplo**: `useAuth.ts`
- **Responsabilidad única**: Solo maneja autenticación
- **No hace**: No maneja acciones, no renderiza UI

**Ejemplo**: `auth.service.ts`
- **Responsabilidad única**: Solo comunica con API de auth
- **No hace**: No maneja storage, no valida formularios

### Open/Closed Principle (OCP)

**Ejemplo**: Componentes reutilizables
- `Button` es extensible mediante props
- No necesita modificación para nuevos casos de uso
- Se puede extender sin cambiar el código base

### Dependency Inversion Principle (DIP)

**Ejemplo**: Hooks dependen de abstracciones (services)
- `useAuth` depende de `authService`, no de Axios directamente
- Si cambia la implementación del API, solo cambia el service
- Los hooks no conocen detalles de implementación

## 🧩 Patrones de Diseño

### 1. Service Pattern
**Dónde**: `/src/api/*.service.ts`
**Por qué**: Encapsula lógica de comunicación con APIs
**Beneficio**: Fácil cambiar implementación (fetch → Axios → otro)

### 2. Custom Hooks Pattern
**Dónde**: `/src/hooks/`
**Por qué**: Extrae lógica de componentes
**Beneficio**: Reutilización y testing

### 3. Context Pattern
**Dónde**: `/src/context/AuthContext.tsx`
**Por qué**: Estado global compartido
**Beneficio**: Evita prop drilling

### 4. Container/Presentational Pattern
**Dónde**: Páginas (containers) + Componentes (presentational)
**Por qué**: Separación de lógica y presentación
**Beneficio**: Componentes más testables y reutilizables

## 🔐 Manejo de Autenticación

### Estrategia: Token en localStorage + Interceptor

**Ventajas**:
- ✅ Simple de implementar
- ✅ Persistencia entre sesiones
- ✅ Interceptor maneja automáticamente

**Desventajas**:
- ⚠️ Vulnerable a XSS (mitigado con HttpOnly en producción)
- ⚠️ No se refresca automáticamente (pendiente implementar)

**Alternativas consideradas**:
- **Cookies HttpOnly**: Más seguro, pero requiere backend
- **SessionStorage**: No persiste, pero más seguro
- **Refresh tokens**: Mejor UX, pero más complejo

### Flujo de Protección de Rutas

```
Usuario intenta acceder a /dashboard
   ↓
ProtectedRoute verifica isAuthenticated del AuthContext
   ↓
Si isLoading → Muestra spinner "Verificando autenticación..."
   ↓
Si !isAuthenticated → Redirige a /login con state: { from: location }
   ↓
Si isAuthenticated → Renderiza componente hijo
   ↓
Si token expira durante petición (401) → Interceptor elimina token y redirige a /login
```

**ProtectedRoute**:
- Usa `useAuthContext()` para obtener estado de autenticación
- Muestra loading state mientras verifica
- Guarda la ruta original para redirigir después del login
- Usa `Navigate` de React Router para redirección

## 📊 Manejo de Estado

### Estado Local (useState)
**Dónde**: Componentes que solo necesitan estado interno
**Ejemplo**: `currentPage` en Dashboard

### Estado Global (Context)
**Dónde**: Estado compartido entre múltiples componentes
**Ejemplo**: `isAuthenticated` en AuthContext

### Estado de Servidor (Custom Hooks)
**Dónde**: Estado que viene de APIs
**Ejemplo**: `actions`, `pagination` en useActions

**Implementación**:
- `useActions`: Maneja estado de acciones, paginación, loading, error
- `useAuth`: Maneja estado de autenticación, loading, error
- Estado se actualiza después de peticiones exitosas
- Errores se manejan y se muestran con toast

**Por qué no Redux/Zustand aquí**:
- **Simplicidad**: Context API es suficiente para esta escala
- **Menos boilerplate**: Menos código que mantener
- **Escalabilidad**: Fácil migrar si crece
- **Nota**: Zustand está en package.json pero no se utilizó (se optó por Context API)

## 🎨 Manejo de Formularios

### Estrategia: React Hook Form

**Por qué React Hook Form**:
1. **Performance**: Menos re-renders que controlled components (uncontrolled por defecto)
2. **Validación**: Sistema robusto integrado con mensajes personalizados
3. **TypeScript**: Excelente soporte de tipos, inferencia de tipos del formulario
4. **DX**: Mejor experiencia de desarrollo, menos boilerplate
5. **Validación en onBlur**: Mejor UX, no muestra errores prematuros

**Implementación**:
- **Login**: Validación de email y password requeridos
- **CreateAction**: Validación de name, description, color, status, icon (todos requeridos)
- **Modo de validación**: `onBlur` para mejor UX
- **Integración con Input**: Componente Input usa `forwardRef` para integrarse correctamente

**Manejo de Archivos**:
- Campo `icon` usa `FormData` para `multipart/form-data`
- Estado local (`iconFile`) para preview y validación
- `setValue` de React Hook Form para registrar el archivo
- Validación manual en `onSubmit` además de validación de React Hook Form

**Alternativas consideradas**:
- **Formik**: Más verboso, más re-renders, menos performante
- **Controlled components**: Más código, peor performance, más propenso a errores

## 🚨 Manejo de Errores

### Estrategia: Centralizado en Interceptores + Toast + Estados Locales

**Niveles de manejo**:
1. **Interceptor de Axios**: Maneja 401, formatea errores, redirige al login
2. **Services**: Re-lanzan errores formateados
3. **Hooks**: Capturan errores, muestran toast, guardan en estado
4. **Componentes**: Muestran errores específicos (ErrorMessage) + toast global

**Ejemplo de flujo**:
```
API retorna 401
   ↓
Interceptor detecta 401
   ↓
Elimina token de localStorage
   ↓
Redirige a /login
   ↓
Formatea error como ApiError
   ↓
Service re-lanza error
   ↓
Hook captura, muestra toast.error(), guarda en error state
   ↓
Componente muestra ErrorMessage (si aplica)
```

**React Hot Toast**:
- Se usa para feedback inmediato (éxito/error)
- Configurado globalmente en `App.tsx`
- Se muestra en hooks (useAuth, useActions) para acciones críticas
- No bloquea la interacción del usuario

## 🔄 Manejo de Loading States

### Estrategia: Estados booleanos en hooks

**Por qué**:
- Simple y directo
- Fácil de usar en componentes
- No requiere librerías adicionales
- Cada hook maneja su propio estado de loading

**Implementación**:
- `useAuth`: `isLoading` para login/logout
- `useActions`: `isLoading` para fetch/create
- Componentes muestran `LoadingSpinner` cuando `isLoading === true`
- Botones se deshabilitan durante loading

**Alternativas consideradas**:
- **React Query**: Overkill para esta prueba, pero útil para cache y sincronización
- **SWR**: Similar, pero más complejo
- **Estados globales de loading**: No necesario para esta escala

## 📝 Convenciones de Código

### Nombres de Archivos
- **Componentes**: PascalCase (`Button.tsx`, `ActionsTable.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`, `useActions.ts`)
- **Services**: camelCase con sufijo `.service` (`auth.service.ts`, `actions.service.ts`)
- **Utils**: camelCase (`storage.ts`)
- **Types**: camelCase (`index.ts` en carpeta `types/`)
- **Constants**: camelCase (`index.ts` en carpeta `constants/`)

### Estructura de Componentes
```tsx
1. Imports (React, librerías, componentes locales, tipos, constantes)
2. Types/Interfaces (si son específicos del componente)
3. Componente principal (con props tipadas)
4. Export default
```

**Ejemplo**:
```tsx
import React from 'react';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // Lógica del componente
  return (...);
};

export default Button;
```

### Estructura de Hooks
```tsx
1. Imports
2. Types/Interfaces (interfaz de retorno)
3. Hook function con useState/useCallback
4. Return object con estado y funciones
```

**Ejemplo**:
```tsx
import { useState, useCallback } from 'react';
import { authService } from '@/api/auth.service';

interface UseAuthReturn {
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  // ...
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // ...
  return { isAuthenticated, login, ... };
};
```

### Estructura de Services
```tsx
1. Imports (Axios instance, tipos, constantes)
2. Funciones de servicio (async functions)
3. Export object con todas las funciones
```

### Path Aliases
- Se usa `@/` como alias para `src/`
- Configurado en `tsconfig.json` y `vite.config.ts`
- Ejemplo: `import { useAuth } from '@/hooks/useAuth'`

## 🧪 Testing (Pendiente)

**Estrategia recomendada**:
- **Unit tests**: 
  - Hooks (`useAuth`, `useActions`) con `@testing-library/react-hooks`
  - Utils (`storage.ts`) con Jest
- **Integration tests**: 
  - Services (`auth.service`, `actions.service`) con mocks de Axios
  - Flujos completos de autenticación y creación de acciones
- **Component tests**: 
  - Componentes con React Testing Library
  - Testing de formularios con React Hook Form
  - Testing de rutas protegidas
- **E2E tests**: 
  - Flujos completos con Cypress/Playwright
  - Login → Dashboard → Crear Acción → Verificar en lista

**Cobertura objetivo**: >80% para lógica de negocio (hooks, services)

## 🚀 Escalabilidad

### Si el proyecto crece:

1. **Estado Global**: Migrar de Context a Zustand/Redux Toolkit
2. **Data Fetching**: Agregar React Query para cache y sincronización
3. **Routing**: Agregar lazy loading de rutas
4. **Testing**: Implementar suite completa de tests
5. **CI/CD**: Agregar pipelines de deployment
6. **Monorepo**: Si hay múltiples apps, considerar monorepo

## 🔧 Tecnologías y Librerías Clave

### Core
- **React 18.2.0**: Biblioteca de UI
- **TypeScript 5.3.2**: Tipado estático
- **Vite 5.0.5**: Build tool y dev server

### Routing y Navegación
- **React Router DOM 6.20.0**: Enrutamiento declarativo

### Estado y Datos
- **Context API**: Estado global de autenticación
- **React Hook Form 7.48.2**: Manejo de formularios

### HTTP y APIs
- **Axios 1.6.2**: Cliente HTTP con interceptores

### UI y Estilos
- **Tailwind CSS 3.3.6**: Framework de estilos utility-first
- **React Hot Toast 2.4.1**: Notificaciones toast

### Herramientas de Desarrollo
- **ESLint**: Linter para calidad de código
- **TypeScript ESLint**: Linter específico para TypeScript
- **PostCSS + Autoprefixer**: Procesamiento de CSS

## 📚 Referencias y Recursos

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Hook Form](https://react-hook-form.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Vite](https://vitejs.dev/)

---

## 🎯 Resumen de Principios Aplicados

1. **Clean Architecture**: Separación en capas (Presentation, Business Logic, Data, Infrastructure)
2. **SOLID Principles**: Single Responsibility, Dependency Inversion
3. **DRY**: Reutilización de código mediante hooks y componentes
4. **Separation of Concerns**: Cada módulo tiene una responsabilidad única
5. **KISS**: Simplicidad sobre complejidad innecesaria
6. **Type Safety**: TypeScript en toda la aplicación
7. **Error Handling**: Manejo centralizado y consistente
8. **User Experience**: Loading states, error states, empty states, toast notifications

**Conclusión**: Esta arquitectura balancea simplicidad con escalabilidad, siguiendo principios de Clean Code y buenas prácticas de React. Está diseñada para ser mantenible, testeable y fácil de extender. El código está organizado de manera que facilita el onboarding de nuevos desarrolladores y permite evolucionar sin grandes refactorizaciones.

