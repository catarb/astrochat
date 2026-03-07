import { NavLink, useLocation } from "react-router-dom";

function LeftBar() {
  const location = useLocation();

  const isChatsActive =
    location.pathname === "/" || location.pathname.startsWith("/chat/");

  return (
    <div className="leftbar">
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
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "leftbar-btn active" : "leftbar-btn"
            }
            aria-label="Ajustes"
          >
            ⚙️
          </NavLink>
          <span className="leftbar-tooltip">Ajustes</span>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;