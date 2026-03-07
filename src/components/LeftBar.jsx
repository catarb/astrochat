import { NavLink } from "react-router-dom";

function LeftBar() {
  return (
    <div className="leftbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? "leftbar-btn active" : "leftbar-btn"
        }
        aria-label="Chats"
      >
        💬
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? "leftbar-btn active" : "leftbar-btn"
        }
        aria-label="Favoritos"
      >
        ⭐
      </NavLink>

      <NavLink
        to="/objects"
        className={({ isActive }) =>
          isActive ? "leftbar-btn active" : "leftbar-btn"
        }
        aria-label="Objetos"
      >
        🔭
      </NavLink>

      <div className="leftbar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "leftbar-btn active" : "leftbar-btn"
          }
          aria-label="Ajustes"
        >
          ⚙️
        </NavLink>
      </div>
    </div>
  );
}

export default LeftBar;