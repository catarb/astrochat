# 🌌 AstroChat

AstroChat es una aplicación web desarrollada en React que simula un chat interactivo con distintos objetos astronómicos, como supernovas y remanentes de supernova.  

El objetivo del proyecto fue construir una interfaz moderna tipo mensajería (inspirada en WhatsApp), aplicando conceptos de frontend como estados, contexto, enrutamiento y diseño responsivo.

---

## 🚀 Demo

🔗 https://astrochat-mu.vercel.app  
*(reemplazar si tu link es otro)*

---

## 🧠 Funcionalidades

- 🔐 Login con persistencia en localStorage  
- 💬 Chat interactivo con objetos astronómicos  
- ⭐ Sistema de favoritos  
- 🔎 Búsqueda de objetos en tiempo real  
- ⚙️ Página de ajustes  
- 📱 Diseño completamente responsivo (320px → desktop)  
- 🌌 Fondo dinámico estilo espacial en los chats  
- 💡 Preguntas rápidas para facilitar la interacción  

---

## 🛠️ Tecnologías utilizadas

- React  
- React Router DOM  
- Context API  
- CSS (custom, sin frameworks)  
- Vite  
- Vercel (deploy)  

---

## 🧩 Estructura del proyecto

- `src/components/` → componentes reutilizables  
- `src/pages/` → páginas principales (Home, Chat, Favorites, Settings, Login)  
- `src/context/` → manejo de estado global  
- `public/` → imágenes y recursos estáticos  

---

## 🔁 Enrutamiento

La navegación se implementa con `react-router-dom`, incluyendo:

- rutas dinámicas (`/chat/:id`)  
- parámetros de búsqueda (`useSearchParams`)  
- navegación programática (`useNavigate`)  

---

## 🧪 Conceptos aplicados

- Manejo de estado con `useState`  
- Estado global con `Context API`  
- Componentización  
- Diseño responsive  
- Manejo de formularios  
- Separación de responsabilidades  

---

## ⚠️ Dificultades encontradas

- Manejo del viewport en mobile (especialmente en iOS)  
- Control del scroll en listas largas  
- Adaptación del layout tipo aplicación (sidebar + chat)  
- Ajuste fino del diseño responsive  
- Sincronización de estados entre componentes  

---

## 📌 Mejoras futuras

- Persistencia real de mensajes (base de datos)  
- Integración con una API  
- Notificaciones  
- Modo claro/oscuro  
- Mejora de animaciones  

---

## 👩‍💻 Autor

Catalina Rodríguez Buss