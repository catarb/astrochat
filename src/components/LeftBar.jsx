import { NavLink, useLocation } from "react-router-dom";

function LeftBar() {
  const location = useLocation();

  const isChatsActive =
    location.pathname === "/" || location.pathname.startsWith("/chat/");

  const user = localStorage.getItem("astrochat_user");
  const avatar = localStorage.getItem("astrochat_avatar");

  function handleLogout() {
    localStorage.removeItem("astrochat_user");
    localStorage.removeItem("astrochat_avatar");
    window.location.href = "/";
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