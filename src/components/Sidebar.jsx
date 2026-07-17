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
    conversations,
    messages,
    favorites,
    unreadCounts,
    loadingConversations,
    conversationsError,
    selectConversation,
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

  const safeConversations = Array.isArray(conversations) ? conversations : [];
  const filteredConversations = safeConversations
    .filter((conversation) => {
      const searchableText = `${conversation.title || ""} ${
        conversation.astro?.name || ""
      }`;

      return searchableText.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const aFav = favorites.includes(a.astro?.demoId || a.astro?.id);
      const bFav = favorites.includes(b.astro?.demoId || b.astro?.id);

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

  function getLastMessageTime(objectId, lastMessageAt) {
    const chatMessages = messages[objectId] || [];

    if (chatMessages.length === 0) {
      const fallbackTimes = {
        sn1987a: "18:42",
        cassiopeiaA: "17:15",
        sn1006: "12:08",
      };

      if (fallbackTimes[objectId]) return fallbackTimes[objectId];

      return lastMessageAt
        ? new Date(lastMessageAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
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
        {loadingConversations ? (
          <p className="no-results">Cargando conversaciones...</p>
        ) : conversationsError ? (
          <p className="no-results">No se pudieron cargar las conversaciones.</p>
        ) : filteredConversations.length === 0 ? (
          <p className="no-results">No hay conversaciones.</p>
        ) : (
          filteredConversations.map((conversation) => {
          const astro = conversation.astro || {};
          const chatDataId = astro.demoId || astro.id;
          const unreadCount = getUnreadCount(conversation.id);
          const favoriteId = astro.demoId || astro.id;
          const isFavorite = favorites.includes(favoriteId);
          const imageSrc = getImageSource(astro);

          return (
            <NavLink
              key={conversation.id}
              to={`/chat/${conversation.id}`}
              onClick={() => selectConversation(conversation.id)}
              className={({ isActive }) =>
                isActive ? "chat-item active-chat" : "chat-item"
              }
            >
              <img
                src={imageSrc}
                alt={astro.name || "Astro"}
                className="astro-avatar"
                data-fallback-src={getImageFallbackSource(astro)}
                onError={handleImageError}
              />

              <div className="chat-info">
                <div className="chat-top-row">
                  <h4>
                    {conversation.title || astro.name} {isFavorite && "⭐"}
                  </h4>
                  <span className="chat-time">
                    {getLastMessageTime(chatDataId, conversation.lastMessageAt)}
                  </span>
                </div>

                <p className="chat-type">{astro.type}</p>

                <div className="chat-bottom-row">
                  <p className="chat-preview">{getLastMessageText(chatDataId)}</p>

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
