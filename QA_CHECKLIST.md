# QA Checklist - Prueba Técnica Frontend

Lista de **10 pruebas funcionales** esenciales para validar el correcto funcionamiento de la aplicación.

## 📋 Instrucciones

- Marca cada casilla `[ ]` como `[x]` cuando completes la prueba
- Verifica que todos los resultados esperados se cumplan
- Si alguna prueba falla, documenta el comportamiento observado

---

## 🔐 Prueba 1: Login Exitoso

**ID**: `LOG-001`

**Precondición**: Usuario no autenticado, aplicación en `/login`

**Pasos**:
1. Ingresar email: `a.berrio@yopmail.com`
2. Ingresar contraseña: `AmuFK8G4Bh64Q1uX+IxQhw==`
3. Hacer clic en botón "Login"

**Resultado Esperado**:
- [ ] Se muestra toast de éxito: "Inicio de sesión exitoso"
- [ ] Token se guarda en `localStorage` con key `auth_token`
- [ ] Redirección automática a `/dashboard`
- [ ] No se muestran mensajes de error
- [ ] En DevTools → Network, la petición POST a `/api/Authentication/Login` retorna 200

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 🔐 Prueba 2: Login con Credenciales Inválidas

**ID**: `LOG-002`

**Precondición**: Usuario no autenticado, aplicación en `/login`

**Pasos**:
1. Ingresar email incorrecto: `test@test.com`
2. Ingresar contraseña incorrecta: `password123`
3. Hacer clic en botón "Login"

**Resultado Esperado**:
- [ ] Se muestra toast de error con mensaje descriptivo
- [ ] No se guarda token en `localStorage`
- [ ] Usuario permanece en página `/login`
- [ ] No hay redirección al dashboard
- [ ] Los campos del formulario mantienen los valores ingresados

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 🛡️ Prueba 3: Protección de Rutas - Acceso Sin Autenticación

**ID**: `ROUTE-001`

**Precondición**: Usuario no autenticado (sin token en `localStorage`)

**Pasos**:
1. Abrir DevTools → Application → Local Storage → Limpiar `auth_token` si existe
2. Intentar acceder directamente a `http://localhost:5173/dashboard`
3. Intentar acceder directamente a `http://localhost:5173/dashboard/create-action`

**Resultado Esperado**:
- [ ] Redirección automática a `/login` en ambos casos
- [ ] No se muestra contenido del dashboard
- [ ] No se muestra formulario de crear acción
- [ ] En DevTools → Network, no se realizan peticiones a `/api/v1/actions/*`

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 📊 Prueba 4: Carga del Dashboard y Listado de Acciones

**ID**: `DASH-001`

**Precondición**: Usuario autenticado (después de login exitoso)

**Pasos**:
1. Acceder a `/dashboard` (o ser redirigido después del login)
2. Observar la carga inicial

**Resultado Esperado**:
- [ ] Se muestra spinner de carga inicialmente
- [ ] Se realiza petición GET a `/api/v1/actions/admin-list?pageNumber=1&pageSize=10`
- [ ] En DevTools → Network, la petición incluye header `Authorization: Bearer <token>`
- [ ] Se muestra tabla con columnas: ID, Nombre, Descripción, Estado, Fecha de Creación
- [ ] Los estados se muestran con badges: "Activo" (verde) o "Inactivo" (gris)
- [ ] Las fechas se muestran en formato `DD/MM/YYYY`
- [ ] Si hay datos, se muestra la tabla; si no hay, se muestra mensaje "No hay acciones disponibles"

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 📄 Prueba 5: Paginación - Navegación Entre Páginas

**ID**: `DASH-002`

**Precondición**: Dashboard cargado con múltiples páginas de datos

**Pasos**:
1. En el dashboard, verificar que haya más de una página disponible
2. Hacer clic en botón "Siguiente"
3. Observar el cambio de página
4. Hacer clic en botón "Anterior"
5. Observar el regreso a la página anterior

**Resultado Esperado**:
- [ ] Al hacer clic en "Siguiente", se realiza nueva petición con `pageNumber` incrementado
- [ ] Se muestra el listado de la siguiente página
- [ ] El botón "Anterior" se habilita cuando se está en página > 1
- [ ] Al hacer clic en "Anterior", se realiza nueva petición con `pageNumber` decrementado
- [ ] Se muestra el listado de la página anterior
- [ ] En página 1, el botón "Anterior" está deshabilitado
- [ ] En la última página, el botón "Siguiente" está deshabilitado

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## ➕ Prueba 6: Crear Acción Exitosamente

**ID**: `CREATE-001`

**Precondición**: Usuario autenticado en el dashboard

**Pasos**:
1. Hacer clic en botón "Crear Acción"
2. Completar formulario:
   - Nombre: "Acción de prueba"
   - Descripción: "Descripción de prueba para validar el formulario"
   - Color: Seleccionar un color (ej: #FF5733)
   - Estado: Seleccionar "Activo" (1)
   - Icono: Seleccionar un archivo de imagen (PNG o JPG)
3. Hacer clic en botón "Crear Acción"

**Resultado Esperado**:
- [ ] Se muestra spinner de carga en el botón durante el envío
- [ ] Se realiza petición POST a `/api/v1/actions/admin-add` con `Content-Type: multipart/form-data`
- [ ] En DevTools → Network, la petición incluye todos los campos: `name`, `description`, `color`, `status`, `icon`
- [ ] Se muestra toast de éxito: "Acción creada exitosamente"
- [ ] Redirección automática a `/dashboard`
- [ ] El listado se actualiza y muestra la nueva acción (o se puede verificar recargando)

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## ✅ Prueba 7: Validación de Campos Requeridos en Crear Acción

**ID**: `CREATE-002`

**Precondición**: Usuario en formulario de crear acción (`/dashboard/create-action`)

**Pasos**:
1. Intentar enviar formulario sin completar ningún campo
2. Completar solo el nombre, dejar los demás vacíos
3. Completar nombre y descripción, pero no seleccionar icono
4. Intentar enviar en cada caso

**Resultado Esperado**:
- [ ] Al enviar sin campos: Se muestran mensajes de error para todos los campos requeridos
- [ ] Campo "Nombre": Muestra "El nombre es requerido" si está vacío
- [ ] Campo "Descripción": Muestra "La descripción es requerida" si está vacío
- [ ] Campo "Icono": Muestra "El icono es requerido" si no se selecciona archivo
- [ ] El borde del campo de icono se vuelve rojo cuando hay error
- [ ] No se realiza petición al API cuando hay errores de validación
- [ ] Los campos con error muestran borde rojo y mensaje debajo

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 🖼️ Prueba 8: Validación de Icono Requerido

**ID**: `CREATE-003`

**Precondición**: Usuario en formulario de crear acción

**Pasos**:
1. Completar todos los campos excepto el icono:
   - Nombre: "Test sin icono"
   - Descripción: "Descripción de prueba"
   - Color: Seleccionar color
   - Estado: Seleccionar "Activo"
2. No seleccionar archivo de icono
3. Hacer clic en "Crear Acción"

**Resultado Esperado**:
- [ ] Se muestra mensaje de error: "El icono es requerido"
- [ ] El área de upload muestra borde rojo y fondo rojo claro
- [ ] Se muestra toast de error: "Por favor selecciona un archivo icon"
- [ ] No se realiza petición al API
- [ ] Al seleccionar un archivo después, el error desaparece automáticamente
- [ ] El borde vuelve a gris cuando se selecciona un archivo

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 🚪 Prueba 9: Logout Funcional

**ID**: `AUTH-001`

**Precondición**: Usuario autenticado en el dashboard

**Pasos**:
1. Verificar en DevTools → Application → Local Storage que existe `auth_token`
2. Hacer clic en botón "Cerrar Sesión"
3. Observar el comportamiento

**Resultado Esperado**:
- [ ] Se muestra toast de éxito: "Sesión cerrada exitosamente"
- [ ] El token se elimina de `localStorage` (verificar en DevTools)
- [ ] Redirección automática a `/login`
- [ ] Al intentar acceder a `/dashboard` después, se redirige a `/login`
- [ ] No se puede acceder a rutas protegidas sin volver a autenticarse

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## ⚠️ Prueba 10: Manejo de Errores - Token Expirado y Errores de API

**ID**: `ERROR-001`

**Precondición**: Usuario autenticado

**Pasos**:
1. **Caso A - Token Expirado**:
   - En DevTools → Application → Local Storage, modificar `auth_token` a un valor inválido
   - Intentar cargar el dashboard o crear una acción
   
2. **Caso B - Error de API**:
   - Con token válido, intentar crear una acción con datos que causen error en el backend
   - O desconectar la red y intentar cargar el dashboard

**Resultado Esperado**:
- [ ] **Caso A - Token Expirado (401)**:
  - [ ] API retorna 401 Unauthorized
  - [ ] Token se elimina automáticamente de `localStorage`
  - [ ] Redirección automática a `/login`
  - [ ] Se muestra mensaje de error apropiado (opcional)

- [ ] **Caso B - Error de API**:
  - [ ] Se muestra toast de error con mensaje descriptivo
  - [ ] El usuario permanece en la página actual
  - [ ] Los datos del formulario (si aplica) se mantienen
  - [ ] No hay errores en consola del navegador
  - [ ] El estado de loading se desactiva correctamente

**Estado**: `[ ]` Pendiente | `[ ]` Pasó | `[ ]` Falló

---

## 📊 Resumen de Pruebas

| ID | Prueba | Prioridad | Estado |
|---|---|---|---|
| LOG-001 | Login Exitoso | 🔴 Alta | `[ ]` |
| LOG-002 | Login con Credenciales Inválidas | 🔴 Alta | `[ ]` |
| ROUTE-001 | Protección de Rutas | 🔴 Alta | `[ ]` |
| DASH-001 | Carga del Dashboard | 🔴 Alta | `[ ]` |
| DASH-002 | Paginación | 🟡 Media | `[ ]` |
| CREATE-001 | Crear Acción Exitosamente | 🔴 Alta | `[ ]` |
| CREATE-002 | Validación de Campos Requeridos | 🔴 Alta | `[ ]` |
| CREATE-003 | Validación de Icono Requerido | 🔴 Alta | `[ ]` |
| AUTH-001 | Logout Funcional | 🟡 Media | `[ ]` |
| ERROR-001 | Manejo de Errores | 🟡 Media | `[ ]` |

**Total**: 10 pruebas funcionales

---

## ✅ Criterios de Aceptación

Una prueba se considera **exitosa** cuando:
- ✅ Todos los resultados esperados se cumplen
- ✅ No hay errores en la consola del navegador
- ✅ La UI responde correctamente a las interacciones
- ✅ Los estados (loading, error, success) se manejan apropiadamente
- ✅ Las peticiones HTTP se realizan correctamente (verificar en Network tab)

---

## 📝 Notas Adicionales

- **Credenciales de prueba**: `a.berrio@yopmail.com` / `AmuFK8G4Bh64Q1uX+IxQhw==`
- **URLs de API**:
  - Login: `https://dev.apinetbo.bekindnetwork.com/api/Authentication/Login`
  - Acciones: `https://dev.api.bekindnetwork.com/api/v1/actions/admin-list`
- **Herramientas recomendadas**: Chrome DevTools (Network, Application, Console)
- **Ambiente**: Desarrollo local (`http://localhost:5173`)

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0
