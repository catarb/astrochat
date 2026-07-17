import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import { useAuth } from "../context/auth-context";
import { getImageSource, handleImageError } from "../utils/image";

function LeftBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { objects } = useContext(AstroChatContext);
  const { user, logout } = useAuth();
  const userImageSrc = getImageSource(user, "/astro-icon.jpg");

  const isChatsActive =
    location.pathname === "/" || location.pathname.startsWith("/chat/");

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  function handleRandomObject() {
    if (!objects || objects.length === 0) return;

    const randomObject = objects[Math.floor(Math.random() * objects.length)];
    navigate(`/chat/${randomObject.id}`);
  }

  return (
    <div className="leftbar">
      <div className="user-avatar-wrapper">
        <img
          src={userImageSrc}
          alt={user?.name || "Usuario"}
          className="user-avatar"
          onError={handleImageError}
        />
      </div>

      <div className="leftbar-tooltip-wrapper">
        <NavLink
          to="/"
          className={isChatsActive ? "leftbar-btn active" : "leftbar-btn"}
          aria-label="Chats"
        >
          💬
        </NavLink>
        <span className="leftbar-tooltip">Chats</span>
      </div>

      <div className="leftbar-tooltip-wrapper">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "leftbar-btn active" : "leftbar-btn"
          }
          aria-label="Favoritos"
        >
          ⭐
        </NavLink>
        <span className="leftbar-tooltip">Favoritos</span>
      </div>

      <div className="leftbar-tooltip-wrapper">
        <NavLink
          to="/objects"
          className={({ isActive }) =>
            isActive ? "leftbar-btn active" : "leftbar-btn"
          }
          aria-label="Objetos"
        >
          🔭
        </NavLink>
        <span className="leftbar-tooltip">Objetos</span>
      </div>

      <div className="leftbar-tooltip-wrapper">
        <button
          type="button"
          className="leftbar-btn"
          onClick={handleRandomObject}
          aria-label="Objeto aleatorio"
        >
          🎲
        </button>
        <span className="leftbar-tooltip">Objeto aleatorio</span>
      </div>

      <div className="leftbar-divider" />

      <div className="leftbar-tooltip-wrapper">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "leftbar-btn active" : "leftbar-btn"
          }
          aria-label="Configuración"
        >
          ⚙️
        </NavLink>
        <span className="leftbar-tooltip">Configuración</span>
      </div>

      <div className="leftbar-bottom">
        <div className="leftbar-tooltip-wrapper">
          <button
            type="button"
            className="leftbar-btn"
            onClick={handleLogout}
            aria-label="Cerrar sesión"
          >
            🚪
          </button>
          <span className="leftbar-tooltip">Cerrar sesión</span>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
