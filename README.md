# AstroChat Frontend

## Descripción

AstroChat Frontend es la interfaz web del proyecto integrador Full-Stack AstroChat. Permite registrar usuarios, iniciar sesión, explorar objetos astronómicos, administrar Astros, crear y gestionar conversaciones y conversar sobre astronomía con respuestas generadas por Google Gemini a través del backend.

La aplicación está construida como una SPA con React y Vite. El historial de conversaciones y mensajes se persiste en MongoDB mediante la API de AstroChat, mientras que la sesión se restaura con un JWT y el endpoint de usuario autenticado.

## Tecnologías

- React.
- React DOM.
- React Router DOM.
- Lucide React para iconos.
- Vite y su plugin oficial para React.
- Context API y hooks de React.
- CSS personalizado, sin framework visual.
- ESLint con reglas para React Hooks y React Refresh.

## Requisitos previos

- Node.js.
- npm.
- AstroChat Backend instalado y en ejecución.
- Una cuenta verificada en el backend para iniciar sesión.

## Instalación local

```bash
git clone https://github.com/catarb/astrochat.git
cd astrochat
npm install
```

Creá la configuración local a partir del archivo incluido:

```bash
cp .env.example .env
```

En PowerShell:

```powershell
Copy-Item .env.example .env
```

Configurá la URL base de la API y ejecutá:

```bash
npm run dev
```

Vite informará en la terminal la URL local del frontend.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base de la API, incluyendo el prefijo `/api`. Si se omite, el código utiliza `http://localhost:3000/api`. |

Las variables con prefijo `VITE_` quedan disponibles en el bundle del navegador y no deben contener secretos. Las claves de Gemini, credenciales de correo, URI privada de MongoDB y secreto JWT pertenecen exclusivamente al backend.

En el despliegue público, `VITE_API_URL` se configura con:

```text
https://astrochat-backend-2opw.onrender.com/api
```

De esta forma, el frontend desplegado consume la API pública de Render sin incluir credenciales sensibles en el bundle.

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run build` | Genera el bundle de producción en `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |
| `npm run preview` | Sirve localmente el build generado para revisarlo. |

## Estructura del proyecto

```text
src/
├── components/     # Layout, navegación, formularios y componentes de chat
├── constants/      # Tipos y valores iniciales del formulario de Astros
├── context/        # Estado global de autenticación y AstroChat
├── pages/          # Pantallas asociadas a las rutas
├── services/       # Comunicación con los módulos de la API
├── utils/          # Resolución de imágenes y fallbacks
├── App.jsx         # Declaración de rutas
├── index.css       # Estilos globales
└── main.jsx        # BrowserRouter y proveedores globales

public/             # Video, imágenes locales y placeholder de Astros
```

### Proveedores globales

`main.jsx` monta la aplicación con esta composición:

```text
BrowserRouter
└── AuthProvider
    └── AstroChatProvider
        └── App
```

`AuthProvider` administra usuario, token y restauración de sesión. `AstroChatProvider` coordina Astros, Conversations, Messages, favoritos y estados de envío.

## Rutas del frontend

El frontend define 12 rutas funcionales: 3 públicas y 9 protegidas.

### Públicas

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/login` | `Login` | Inicio de sesión. Redirige al destino protegido original cuando corresponde. |
| `/register` | `Register` | Registro con validación de nombre, correo y contraseña. |
| `/verify-email?token=...` | `VerifyEmail` | Verifica el correo mediante el token recibido por enlace. |

Login y Register usan `PublicOnlyRoute`: una sesión autenticada es redirigida a `/`. `/verify-email` permanece fuera de ese guard y de `ProtectedRoute`, por lo que el enlace funciona con o sin una sesión previa.

### Protegidas

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/` | `Home` | Inicio y acceso a la lista lateral de conversaciones. |
| `/chat/:id` | `Chat` | Conversación persistente y chat con Gemini. |
| `/favorites` | `Favorites` | Astros marcados como favoritos en el navegador. |
| `/objects` | `Objects` | Catálogo de Astros activos e inicio de conversaciones. |
| `/settings` | `Settings` | Información de la cuenta y cierre de sesión. |
| `/admin/astros` | `AdminAstros` | Catálogo administrativo de Astros activos e inactivos. |
| `/admin/astros/new` | `AdminAstroCreate` | Creación de un Astro. |
| `/admin/astros/:astroId` | `AdminAstroDetail` | Detalle y eliminación de un Astro. |
| `/admin/astros/:astroId/edit` | `AdminAstroEdit` | Edición y cambio de estado de un Astro. |

Todas utilizan `ProtectedRoute`. Si no existe una sesión válida, se redirige a `/login`; cualquier ruta desconocida redirige a `/`.

La protección es por autenticación, no por roles. El backend actual tampoco define roles para separar administradores.

## Funcionalidades

### Autenticación

- Registro conectado a `POST /auth/register`.
- Validación local equivalente a las reglas principales del backend.
- Verificación conectada a `GET /auth/verify-email/:token`, sin almacenar el token de verificación ni enviarlo como JWT.
- Login conectado a `POST /auth/login`.
- Persistencia del JWT bajo la clave `astrochat_token` de `localStorage`.
- Restauración al montar mediante `GET /auth/me`.
- Envío automático de `Authorization: Bearer <token>` en solicitudes protegidas.
- Eliminación de sesión cuando la API responde `401`.
- Logout desde la barra lateral, la vista móvil y Settings.
- Separación entre rutas públicas y protegidas.

El registro indica que se debe revisar el correo y abrir el enlace recibido. Ese enlace dirige a `/verify-email?token=...`; la pantalla lee el token, solicita su verificación una sola vez y muestra el resultado antes de ofrecer acceso a Login.

### Astros

#### Catálogo público

- `/objects` consulta hasta 50 Astros activos.
- Seleccionar un Astro crea una conversación y abre `/chat/:conversationId`.
- Los Astros desactivados dejan de formar parte del catálogo público.
- Favorites permite iniciar una conversación desde los Astros favoritos activos.

#### Panel administrativo

- Listado de Astros activos e inactivos con total informado por la API.
- Detalle consultable directamente por ID.
- Creación mediante un formulario reutilizable.
- Edición con carga de valores actuales.
- Activación y desactivación mediante `isActive`.
- Eliminación física con confirmación y advertencia de permanencia.
- Validación local y presentación de errores de campo del backend.
- Prevención de envíos y eliminaciones duplicadas.

El panel administrativo está separado del catálogo público. Después de una mutación, `AstroChatContext` sincroniza el catálogo activo sin modificar conversaciones ni mensajes.

#### Imágenes

La utilidad `src/utils/image.js` resuelve imágenes remotas, imágenes locales asociadas a datos de demostración y el placeholder `/images/astro-placeholder.svg`. Si una imagen falla, intenta primero el fallback local disponible y luego el placeholder general.

### Conversations

- Carga del listado autenticado en Sidebar.
- Búsqueda por título o nombre del Astro.
- Creación desde Objects, Favorites o la acción de Astro aleatorio.
- Apertura mediante `/chat/:id`.
- Renombrado desde `Más opciones → Renombrar` con `PUT /conversations/:id`.
- Validación de títulos entre 2 y 120 caracteres.
- Eliminación desde el menú del chat.
- Actualización del listado sin recargar ni duplicar elementos.
- Persistencia en el backend y restauración al volver a ingresar.

El renombrado conserva el orden del listado y no cambia `activeConversationId`, por lo que el chat permanece abierto.

### Messages y Gemini

- Recuperación paginada de todo el historial de la conversación.
- Orden y deduplicación de mensajes por ID.
- Envío de contenido a `POST /chat/conversation/:conversationId`.
- Inserción optimista de un mensaje temporal del usuario.
- Reemplazo del temporal por `userMessage` y `assistantMessage` confirmados por la API.
- Eliminación del temporal y restauración del borrador cuando la solicitud falla.
- Indicador de que el asistente está escribiendo mientras se espera Gemini.
- Bloqueo del input y las preguntas rápidas durante el envío.
- Recarga manual de mensajes desde el menú del chat.
- Búsqueda local dentro de los mensajes cargados.
- Auto-scroll al último mensaje.

La API key y la comunicación directa con Gemini permanecen en el backend. El navegador sólo consume el endpoint de Chat.

### Favoritos y datos locales

Los IDs favoritos se guardan en `localStorage` bajo `astrochat-favorites`. También se conserva una colección local heredada de mensajes de demostración utilizada por algunos previews del Sidebar; el historial real del chat proviene de la API de Messages.

### Estados, errores y concurrencia

- Estados separados para carga de sesión, Astros, Conversations y Messages.
- Mensajes de error específicos para conexión, autenticación, validación y Chat.
- `ApiError` conserva `status` y errores de validación por campo.
- Manejo centralizado de respuestas `401` mediante un evento de sesión no autorizada.
- IDs de solicitud para ignorar respuestas obsoletas.
- Mapas de promesas para deduplicar cargas, creaciones y eliminaciones concurrentes.
- Referencias y estados de envío para evitar dobles mensajes, renombrados y mutaciones de Astros.

## Integración con la API

La capa común `src/services/api.js`:

1. Lee `VITE_API_URL` y elimina una barra final si existe.
2. Serializa cuerpos JSON.
3. Adjunta el JWT a las solicitudes autenticadas.
4. Interpreta respuestas JSON.
5. Convierte fallos HTTP o de red en `ApiError`.
6. Elimina el token y notifica al contexto ante un `401`.

Los servicios están separados por módulo:

| Servicio | Responsabilidad principal |
|---|---|
| `auth.service.js` | Registro, verificación de correo, login, `/me` y logout local. |
| `astro.service.js` | Catálogo, detalle y CRUD de Astros. |
| `conversation.service.js` | Listado, creación, renombrado y eliminación de Conversations. |
| `message.service.js` | Historial paginado, normalización, orden, merge y creación directa. |
| `chat.service.js` | Envío al endpoint que integra Gemini. |

Astros, Conversations y Messages normalizan los identificadores del backend con el patrón:

```js
id: entity._id || entity.id
```

El campo `_id` original no se elimina. `AstroChatContext` utiliza los IDs normalizados para deduplicar, reemplazar o retirar entidades del estado sin hacer recargas globales innecesarias.

## Responsive

La interfaz incluye estilos fluidos para escritorio y media queries en 768 px para el layout principal, además de ajustes en 768 px y 480 px para el panel administrativo. También utiliza `window.visualViewport` en Login y Chat para adaptarse al viewport y al teclado virtual móvil.

La composición está preparada para anchos amplios como 2000, 1440 y 1024 px, y para vistas móviles como 768, 375 y 320 px. Esto describe la intención y las reglas CSS existentes; antes de la entrega pública conviene completar una revisión visual manual en todos esos anchos y navegadores objetivo.

## Pantallas principales

| Pantalla | Función |
|---|---|
| Login | Autenticación, recuperación del destino original y presentación de mensajes del registro. |
| Register | Alta de cuenta y comienzo del flujo de verificación por correo. |
| Home | Vista inicial con acceso a conversaciones desde Sidebar. |
| Chat | Historial, búsqueda, perfil del Astro, favoritos, preguntas rápidas, Gemini y gestión de la conversación. |
| Objects | Exploración de Astros activos e inicio de chats. |
| Admin Astros | Listado administrativo con estado activo/inactivo y acceso al CRUD. |
| Astro Detail | Información completa, edición y eliminación con confirmación. |
| Astro Create | Formulario validado para crear Astros. |
| Astro Edit | Formulario precargado para actualizar o activar/desactivar Astros. |
| Favorites | Astros destacados almacenados localmente. |
| Settings | Usuario actual y cierre de sesión. |

El repositorio no contiene capturas de pantalla preparadas para documentación, por lo que este README no agrega imágenes inexistentes.

## Seguridad

- El JWT se envía como Bearer sólo a solicitudes autenticadas.
- Las rutas protegidas requieren una sesión validada por `/auth/me`.
- Un `401` elimina el token local y cierra la sesión en memoria.
- El frontend no contiene ni necesita secretos del backend.
- Cualquier variable `VITE_` es pública y no debe almacenar información sensible.
- Las claves de Gemini, MongoDB, SMTP y JWT deben permanecer únicamente en el backend.
- El token se guarda actualmente en `localStorage`; este mecanismo persiste la sesión, pero no es invulnerable frente a código malicioso ejecutado en el mismo origen.
- El archivo `.env` no debe publicarse ni contener secretos de backend.

## Deploy

Frontend desplegado en Vercel: `https://astrochat-mu.vercel.app`

Backend consumido por el frontend: `https://astrochat-backend-2opw.onrender.com`

El deployment de Vercel utiliza `npm run build`, publica el directorio `dist/` y configura `VITE_API_URL=https://astrochat-backend-2opw.onrender.com/api`. El archivo `vercel.json` incluye el rewrite necesario para que las rutas de la SPA, como `/login`, `/verify-email` y `/chat/:id`, funcionen al abrirse directamente.

## Relación con el backend

Frontend y backend se entregan como repositorios separados:

- Frontend: `https://github.com/catarb/astrochat`
- Backend: `https://github.com/catarb/astrochat-backend`

El frontend no accede directamente a MongoDB, SMTP ni Gemini. Toda operación persistente pasa por la API configurada en `VITE_API_URL`.

La colección de Postman corresponde al repositorio backend y no se genera desde este frontend.

## Estado del proyecto

La versión final está implementada y desplegada públicamente. Incluye registro, verificación de correo, login, persistencia y validación de sesión, catálogo de Astros, CRUD administrativo de Astros, gestión de Conversations, historial persistente de Messages y Chat integrado con Gemini.

El frontend está publicado en Vercel y consume el backend desplegado en Render mediante `VITE_API_URL`. La pantalla pública `/verify-email` completa el flujo de verificación enviado por correo, y el repositorio backend incluye la colección de Postman para probar los 21 endpoints de la API.
