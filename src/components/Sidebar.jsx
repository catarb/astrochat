import { useContext } from "react";
import { AstroChatContext } from "../context/astro-chat-context";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import {
  getImageFallbackSource,
  getImageSource,
  handleImageError,
} from "../utils/image";

function Sidebar() {
  const {
    objects,
    messages,
    favorites,
    unreadCounts,
    loadingAstros,
    astrosError,
  } = useContext(AstroChatContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userImageSrc = getImageSource(user, "/astro-icon.jpg");

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  function handleSearch(e) {
    setSearchParams({ search: e.target.value });
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  const safeObjects = Array.isArray(objects) ? objects : [];
  const filteredObjects = safeObjects
    .filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aFav = favorites.includes(a.id);
      const bFav = favorites.includes(b.id);

      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });

  function getLastMessageText(objectId) {
    const chatMessages = messages[objectId] || [];

    if (chatMessages.length === 0) {
      return "Sin mensajes todavía";
    }

    const lastMessage = chatMessages[chatMessages.length - 1];

    if (lastMessage.typing) {
      return "AstroBot está escribiendo...";
    }

    return lastMessage.text;
  }

  function getLastMessageTime(objectId) {
    const chatMessages = messages[objectId] || [];

    if (chatMessages.length === 0) {
      const fallbackTimes = {
        sn1987a: "18:42",
        cassiopeiaA: "17:15",
        sn1006: "12:08",
      };

      return fallbackTimes[objectId] || "";
    }

    const lastMessage = chatMessages[chatMessages.length - 1];
    return lastMessage.time || "";
  }

  function getUnreadCount(objectId) {
    return unreadCounts?.[objectId] || 0;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="mobile-topbar">
          <div className="mobile-topbar-left">
            <img
              src={userImageSrc}
              alt={user?.name || "Usuario"}
              className="mobile-user-avatar"
              data-fallback-src={getImageFallbackSource(user)}
              onError={handleImageError}
            />
            <h1 className="sidebar-title">AstroChat 🌌</h1>
          </div>

          <button className="logout-mobile-button" onClick={handleLogout}>
            ⎋ Salir
          </button>
        </div>

        <h1 className="sidebar-title desktop-title">AstroChat 🌌</h1>

        <input
          type="text"
          placeholder="Buscar objeto..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="chat-list">
        {loadingAstros ? (
          <p className="no-results">Cargando astros...</p>
        ) : astrosError ? (
          <p className="no-results">No se pudieron cargar los astros</p>
        ) : filteredObjects.length === 0 ? (
          <p className="no-results">No hay astros disponibles.</p>
        ) : (
          filteredObjects.map((obj) => {
          const unreadCount = getUnreadCount(obj.id);
          const favoriteId = obj.demoId || obj.id;
          const isFavorite = favorites.includes(favoriteId);
          const imageSrc = getImageSource(obj);

          return (
            <NavLink
              key={obj.id}
              to={`/chat/${obj.id}`}
              className={({ isActive }) =>
                isActive ? "chat-item active-chat" : "chat-item"
              }
            >
              <img
                src={imageSrc}
                alt={obj.name || obj.astro?.name || "Astro"}
                className="astro-avatar"
                data-fallback-src={getImageFallbackSource(obj)}
                onError={handleImageError}
              />

              <div className="chat-info">
                <div className="chat-top-row">
                  <h4>
                    {obj.name} {isFavorite && "⭐"}
                  </h4>
                  <span className="chat-time">{getLastMessageTime(obj.id)}</span>
                </div>

                <p className="chat-type">{obj.type}</p>

                <div className="chat-bottom-row">
                  <p className="chat-preview">{getLastMessageText(obj.id)}</p>

                  {unreadCount > 0 && (
                    <span className="unread-badge">{unreadCount}</span>
                  )}
                </div>
              </div>
            </NavLink>
          );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
