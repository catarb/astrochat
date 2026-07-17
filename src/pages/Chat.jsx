import {
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useContext, useMemo, useState, useEffect } from "react";
import { AstroChatContext } from "../context/astro-chat-context";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import QuickQuestions from "../components/QuickQuestions";
import {
  getImageFallbackSource,
  getImageSource,
  handleImageError,
} from "../utils/image";

import {
  ArrowLeft,
  Star,
  Search,
  MoreVertical,
  Info,
} from "lucide-react";

const EMPTY_MESSAGES = [];

function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get("search") || "";

  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(!!initialSearch);
  const [searchText, setSearchText] = useState(initialSearch);
  const [showMenu, setShowMenu] = useState(false);

  const {
    conversations,
    activeConversation,
    activeConversationId,
    selectConversation,
    deleteConversation,
    messages,
    favorites,
    toggleFavorite,
    sendMessage,
    resetChat,
    loadingConversations,
    conversationsError,
  } = useContext(AstroChatContext);

  const safeConversations = Array.isArray(conversations) ? conversations : [];
  const currentConversation =
    activeConversation?.id === id
      ? activeConversation
      : safeConversations.find((conversation) => conversation.id === id);
  const currentObject = currentConversation?.astro;
  const currentImageSrc = getImageSource(currentObject);
  const chatDataId = currentObject?.demoId || currentObject?.id || id;
  const currentMessages = messages[chatDataId] || EMPTY_MESSAGES;
  const isFavorite = favorites.includes(chatDataId);

  const filteredMessages = useMemo(() => {
    if (!searchText.trim()) return currentMessages;

    return currentMessages.filter((msg) =>
      (msg.text || "").toLowerCase().includes(searchText.toLowerCase())
    );
  }, [currentMessages, searchText]);

  useEffect(() => {
    const root = document.documentElement;

    function updateViewportVars() {
      const vv = window.visualViewport;

      if (vv) {
        root.style.setProperty("--app-height", `${vv.height}px`);
        root.style.setProperty("--vv-top", `${vv.offsetTop}px`);
      } else {
        root.style.setProperty("--app-height", `${window.innerHeight}px`);
        root.style.setProperty("--vv-top", "0px");
      }
    }

    updateViewportVars();

    window.addEventListener("resize", updateViewportVars);
    window.addEventListener("orientationchange", updateViewportVars);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewportVars);
      window.visualViewport.addEventListener("scroll", updateViewportVars);
    }

    return () => {
      window.removeEventListener("resize", updateViewportVars);
      window.removeEventListener("orientationchange", updateViewportVars);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportVars);
        window.visualViewport.removeEventListener("scroll", updateViewportVars);
      }
    };
  }, []);

  useEffect(() => {
    if (currentConversation && activeConversationId !== id) {
      selectConversation(id);
    }
  }, [activeConversationId, currentConversation, id, selectConversation]);

  if (loadingConversations || conversationsError || !currentObject) {
    const statusMessage = loadingConversations
      ? "Cargando conversaciones..."
      : conversationsError
        ? "No se pudieron cargar las conversaciones."
        : "Conversación no encontrada.";

    return (
      <div className="chat-container">
        <div className="chat-body">
          <div className="messages-list">
            <p style={{ color: "#94a3b8" }}>{statusMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  function handleSend(text) {
    sendMessage(chatDataId, {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  function handleQuickQuestion(question) {
    sendMessage(chatDataId, {
      sender: "user",
      text: question,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  }

  async function handleDeleteConversation() {
    try {
      await deleteConversation(id);
      setShowMenu(false);
      navigate("/", { replace: true });
    } catch {
      setShowMenu(false);
    }
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
            src={currentImageSrc}
            alt={currentObject.name || currentObject.astro?.name || "Astro"}
            className="chat-avatar"
            data-fallback-src={getImageFallbackSource(currentObject)}
            onError={handleImageError}
          />

          <div className="chat-header-info">
            <h2>{currentObject.name}</h2>
            <p>{botTyping ? "AstroBot está escribiendo..." : "en línea"}</p>
          </div>
        </div>

        <div className="chat-header-actions">
          <div className="tooltip-wrapper">
            <button
              type="button"
              className={`header-icon-button ${
                isFavorite ? "favorite-active" : ""
              }`}
              aria-label="Marcar favorito"
              onClick={() => toggleFavorite(chatDataId)}
            >
              <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <span className="tooltip-text">
              {isFavorite ? "Quitar favorito" : "Marcar favorito"}
            </span>
          </div>

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

          <div className="tooltip-wrapper">
            <button
              type="button"
              className="header-icon-button"
              aria-label="Buscar"
              onClick={() => {
                const nextShowSearch = !showSearch;
                setShowSearch(nextShowSearch);

                if (!nextShowSearch) {
                  setSearchText("");
                  setSearchParams({});
                }

                setShowMenu(false);
              }}
            >
              <Search size={18} />
            </button>
            <span className="tooltip-text">Buscar en el chat</span>
          </div>

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
                    resetChat(chatDataId);
                    setShowMenu(false);
                  }}
                >
                  Reiniciar chat
                </button>

                <button
                  type="button"
                  className="chat-menu-item"
                  onClick={handleDeleteConversation}
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

      <div className="chat-body">
        {showSearch && (
          <div className="chat-search-bar">
            <input
              type="text"
              className="chat-search-input"
              placeholder="Buscar en la conversación..."
              value={searchText}
              onChange={(e) => {
                const value = e.target.value;
                setSearchText(value);

                if (value.trim()) {
                  setSearchParams({ search: value });
                } else {
                  setSearchParams({});
                }
              }}
            />
          </div>
        )}

        {showProfile && (
          <div className="object-profile">
            <img
              src={currentImageSrc}
              alt={currentObject.name || currentObject.astro?.name || "Astro"}
              className="object-profile-image"
              data-fallback-src={getImageFallbackSource(currentObject)}
              onError={handleImageError}
            />

            <h3>{currentObject.name}</h3>

            <p>
              <strong>Tipo:</strong> {currentObject.type}
            </p>
            {currentObject.scientificName && (
              <p>
                <strong>Nombre científico:</strong>{" "}
                {currentObject.scientificName}
              </p>
            )}
            {currentObject.constellation && (
              <p>
                <strong>Constelación:</strong> {currentObject.constellation}
              </p>
            )}
            {currentObject.distance && (
              <p>
                <strong>Distancia:</strong> {currentObject.distance}
              </p>
            )}

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
      </div>

      <div className="message-input-wrapper">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}

export default Chat;
