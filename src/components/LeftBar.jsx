import { NavLink, useLocation } from "react-router-dom";

function LeftBar() {
  const location = useLocation();

  const isChatsActive =
    location.pathname === "/" || location.pathname.startsWith("/chat/");

  function handleLogout() {
    localStorage.removeItem("astrochat_user");
    window.location.href = "/";
  }

  return (
    <div className="leftbar">
      {/* Chats */}
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

      {/* Favoritos */}
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

      {/* Objetos */}
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

      {/* Logout */}
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