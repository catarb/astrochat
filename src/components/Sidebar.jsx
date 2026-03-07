import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import { NavLink, useSearchParams } from "react-router-dom";

function Sidebar() {
  const { objects, messages } = useContext(AstroChatContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  function handleSearch(e) {
    setSearchParams({ search: e.target.value });
  }

  const filteredObjects = objects.filter((obj) =>
    obj.name.toLowerCase().includes(search.toLowerCase())
  );

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

  function getFakeTime(objectId) {
    const fakeTimes = {
      sn1987a: "18:42",
      cassiopeiaA: "17:15",
      sn1006: "12:08",
    };

    return fakeTimes[objectId] || "09:30";
  }

function getUnreadCount(objectId) {
  const fakeUnread = {
    sn1987a: 1,
    cassiopeiaA: 2,
    sn1006: 0,
  };

  return fakeUnread[objectId] || 0;
}

  return (
    <div className="sidebar">
      <h2 style={{ marginBottom: "20px", color: "#e2e8f0" }}>AstroChat 🌌</h2>

      <input
        type="text"
        placeholder="Buscar objeto..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="chat-list" style={{ marginTop: "20px" }}>
        {filteredObjects.map((obj) => {
          const unreadCount = getUnreadCount(obj.id);

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
                  <h4>{obj.name}</h4>
                  <span className="chat-time">{getFakeTime(obj.id)}</span>
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