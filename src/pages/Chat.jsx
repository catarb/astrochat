import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { objects, messages, sendMessage } = useContext(AstroChatContext);

  const currentObject = objects.find((obj) => obj.id === id);
  const currentMessages = messages[id] || [];

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
    });
  }

  const botTyping = currentMessages.some((msg) => msg.typing);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-left">
          <button onClick={() => navigate("/")} className="back-button">
            ←
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
          <button
            type="button"
            className="header-icon-button"
            aria-label="Buscar"
          >
            🔍
          </button>
          <button
            type="button"
            className="header-icon-button"
            aria-label="Más opciones"
          >
            ⋮
          </button>
        </div>
      </div>

      <div className="messages-list">
        <MessageList messages={currentMessages} />
      </div>

      <div className="message-input-wrapper">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;