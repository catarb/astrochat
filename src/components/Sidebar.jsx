import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import { NavLink, useSearchParams } from "react-router-dom";

function Sidebar() {
  const { objects, messages, favorites, unreadCounts } =
    useContext(AstroChatContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const user = localStorage.getItem("astrochat_user");
  const avatar = localStorage.getItem("astrochat_avatar");

  function handleSearch(e) {
    setSearchParams({ search: e.target.value });
  }

  function handleLogout() {
    localStorage.removeItem("astrochat_user");
    localStorage.removeItem("astrochat_avatar");
    window.location.href = "/";
  }

  const filteredObjects = objects
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
              src={avatar || "https://i.pravatar.cc/150?img=12"}
              alt={user || "Usuario"}
              className="mobile-user-avatar"
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
        {filteredObjects.map((obj) => {
          const unreadCount = getUnreadCount(obj.id);
          const isFavorite = favorites.includes(obj.id);

          return (
            <NavLink
              key={obj.id}
              to={`/chat/${obj.id}`}
              className={({ isActive }) =>
                isActive ? "chat-item active-chat" : "chat-item"
              }
            >
              <img
                src={obj.image}
                alt={obj.name}
                className="astro-avatar"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150/1e293b/ffffff?text=Astro";
                }}
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
        })}
      </div>
    </div>
  );
}

export default Sidebar;