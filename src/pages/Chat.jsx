import { useParams, useNavigate } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import QuickQuestions from "../components/QuickQuestions";

import {
  ArrowLeft,
  Star,
  Search,
  MoreVertical,
  Info,
} from "lucide-react";

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const {
    objects,
    messages,
    favorites,
    toggleFavorite,
    sendMessage,
    clearChat,
    resetChat,
  } = useContext(AstroChatContext);

  const currentObject = objects.find((obj) => obj.id === id);
  const currentMessages = messages[id] || [];
  const isFavorite = favorites.includes(id);

  const filteredMessages = useMemo(() => {
    if (!searchText.trim()) return currentMessages;

    return currentMessages.filter((msg) =>
      (msg.text || "").toLowerCase().includes(searchText.toLowerCase())
    );
  }, [currentMessages, searchText]);

  if (!currentObject) {
    return (
      <div className="chat-container">
        <div className="messages-list">
          <p style={{ color: "#94a3b8" }}>Objeto no encontrado.</p>
        </div>
      </div>
    );
  }

  function handleSend(text) {
    sendMessage(id, {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  function handleQuickQuestion(question) {
    sendMessage(id, {
      sender: "user",
      text: question,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  const botTyping = currentMessages.some((msg) => msg.typing);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-left">
          <button onClick={() => navigate("/")} className="back-button">
            <ArrowLeft size={20} />
          </button>

          <img
            src={currentObject.image}
            alt={currentObject.name}
            className="chat-avatar"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/150/1e293b/ffffff?text=Astro";
            }}
          />

          <div className="chat-header-info">
            <h2>{currentObject.name}</h2>
            <p>{botTyping ? "AstroBot está escribiendo..." : "en línea"}</p>
          </div>
        </div>

        <div className="chat-header-actions">
          {/* FAVORITO */}
          <div className="tooltip-wrapper">
            <button
              type="button"
              className={`header-icon-button ${
                isFavorite ? "favorite-active" : ""
              }`}
              aria-label="Marcar favorito"
              onClick={() => toggleFavorite(id)}
            >
              <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <span className="tooltip-text">
              {isFavorite ? "Quitar favorito" : "Marcar favorito"}
            </span>
          </div>

          {/* INFO */}
          <div className="tooltip-wrapper">
            <button
              type="button"
              className="header-icon-button"
              aria-label="Ver información"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              <Info size={18} />
            </button>

            <span className="tooltip-text">Información del objeto</span>
          </div>

          {/* BUSCAR */}
          <div className="tooltip-wrapper">
            <button
              type="button"
              className="header-icon-button"
              aria-label="Buscar"
              onClick={() => {
                setShowSearch((prev) => !prev);
                setSearchText("");
                setShowMenu(false);
              }}
            >
              <Search size={18} />
            </button>

            <span className="tooltip-text">Buscar en el chat</span>
          </div>

          {/* MENU */}
          <div className="chat-menu-wrapper tooltip-wrapper">
            <button
              type="button"
              className="header-icon-button"
              aria-label="Más opciones"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <MoreVertical size={18} />
            </button>

            <span className="tooltip-text">Más opciones</span>

            {showMenu && (
              <div className="chat-menu">
                <button
                  type="button"
                  className="chat-menu-item"
                  onClick={() => {
                    resetChat(id);
                    setShowMenu(false);
                  }}
                >
                  Reiniciar chat
                </button>

                <button
                  type="button"
                  className="chat-menu-item"
                  onClick={() => {
                    clearChat(id);
                    setShowMenu(false);
                  }}
                >
                  Borrar conversación
                </button>

                <button
                  type="button"
                  className="chat-menu-item"
                  onClick={() => {
                    setShowProfile(false);
                    setShowMenu(false);
                  }}
                >
                  Cerrar perfil
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="chat-search-bar">
          <input
            type="text"
            className="chat-search-input"
            placeholder="Buscar en la conversación..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}

      {showProfile && (
        <div className="object-profile">
          <img
            src={currentObject.image}
            alt={currentObject.name}
            className="object-profile-image"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/150/1e293b/ffffff?text=Astro";
            }}
          />

          <h3>{currentObject.name}</h3>

          <p>
            <strong>Tipo:</strong> {currentObject.type}
          </p>

          <p>
            <strong>Galaxia:</strong> {currentObject.galaxy}
          </p>

          <p>
            <strong>Año:</strong> {currentObject.year}
          </p>

          <p>
            <strong>Distancia:</strong> {currentObject.distance}
          </p>

          <p className="object-description">{currentObject.description}</p>
        </div>
      )}

      {!showSearch && <QuickQuestions onAsk={handleQuickQuestion} />}

      <div className="messages-list">
        {showSearch && searchText.trim() && filteredMessages.length === 0 ? (
          <p className="no-results">No se encontraron mensajes.</p>
        ) : (
          <MessageList messages={filteredMessages} />
        )}
      </div>

      <div className="message-input-wrapper">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;