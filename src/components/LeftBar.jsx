import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";

function LeftBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { objects } = useContext(AstroChatContext);

  const isChatsActive =
    location.pathname === "/" || location.pathname.startsWith("/chat/");

  const user = localStorage.getItem("astrochat_user");
  const avatar = localStorage.getItem("astrochat_avatar");

  function handleLogout() {
    localStorage.removeItem("astrochat_user");
    localStorage.removeItem("astrochat_avatar");
    window.location.href = "/";
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
          src={avatar || "https://i.pravatar.cc/150?img=12"}
          alt={user || "Usuario"}
          className="user-avatar"
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