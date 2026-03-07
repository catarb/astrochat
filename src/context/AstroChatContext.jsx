import { createContext, useState, useEffect } from "react";

export const AstroChatContext = createContext();

export function AstroChatProvider({ children }) {
  const [objects] = useState([
    {
      id: "sn1987a",
      name: "SN 1987A",
      type: "Supernova",
      galaxy: "LMC",
      year: "1987",
      distance: "168,000 años luz",
      description:
        "Una de las supernovas más estudiadas de la historia moderna, observada en la Gran Nube de Magallanes.",
      image: "/sn1987a.jpg",
    },
    {
      id: "cassiopeiaA",
      name: "Cassiopeia A",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "ca. 1680",
      distance: "11,000 años luz",
      description:
        "Uno de los remanentes de supernova más brillantes de la Vía Láctea, muy observado en radio y rayos X.",
      image: "/Cassiopeia_A.jpg",
    },
    {
      id: "sn1006",
      name: "SN 1006",
      type: "Supernova",
      galaxy: "Milky Way",
      year: "1006",
      distance: "7,200 años luz",
      description:
        "Una de las supernovas más brillantes registradas por la humanidad, visible a simple vista en el año 1006.",
      image: "/sn1006.jpg",
    },
  ]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("astrochat-favorites");
    return savedFavorites
      ? JSON.parse(savedFavorites)
      : ["sn1987a", "cassiopeiaA"];
  });

  const initialMessages = {
    sn1987a: [
      {
        sender: "bot",
        text: "Explosión detectada en 1987 👀",
        time: "18:42",
      },
    ],
    cassiopeiaA: [
      {
        sender: "bot",
        text: "Uno de los remanentes más brillantes en radio 📡",
        time: "17:15",
      },
    ],
    sn1006: [],
  };

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("astrochat-messages");
    return savedMessages ? JSON.parse(savedMessages) : initialMessages;
  });

  useEffect(() => {
    localStorage.setItem("astrochat-messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("astrochat-favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(objectId) {
    setFavorites((prev) =>
      prev.includes(objectId)
        ? prev.filter((id) => id !== objectId)
        : [...prev, objectId]
    );
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function clearChat(chatId) {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [],
    }));
  }

  function resetChat(chatId) {
    setMessages((prev) => ({
      ...prev,
      [chatId]: initialMessages[chatId] || [],
    }));
  }

  function generateAstroResponse(chatId, userText) {
    const text = userText.toLowerCase();

    const objectData = {
      sn1987a: {
        intro: "Soy SN 1987A, observada en la Gran Nube de Magallanes.",
        galaxy: "Estoy en la Gran Nube de Magallanes.",
        distance: "Estoy a unos 168.000 años luz de la Tierra.",
        year: "Mi explosión fue observada en 1987.",
        type: "Soy una supernova de colapso del núcleo.",
        extra: [
          "Fui clave para estudiar neutrinos provenientes de una supernova.",
          "Soy una de las supernovas más famosas de la astronomía moderna.",
          "Mi explosión marcó un antes y un después en la astrofísica observacional.",
        ],
      },
      cassiopeiaA: {
        intro: "Soy Cassiopeia A, un remanente de supernova muy brillante.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 11.000 años luz.",
        year: "Mi explosión ocurrió aproximadamente hacia 1680.",
        type: "Soy un remanente de supernova muy estudiado en radio y rayos X.",
        extra: [
          "Soy uno de los remanentes más estudiados de la galaxia.",
          "En rayos X me veo especialmente brillante.",
          "En radio también soy un objeto muy importante.",
        ],
      },
      sn1006: {
        intro: "Soy SN 1006, una de las supernovas más brillantes registradas.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 7.200 años luz.",
        year: "Fui observada en el año 1006.",
        type: "Soy el remanente de una supernova histórica muy famosa.",
        extra: [
          "Mi brillo fue tan intenso que la gente podía verme con enorme claridad.",
          "Soy un objeto histórico muy importante para la astronomía.",
          "Mi remanente todavía se estudia en distintas longitudes de onda.",
        ],
      },
    };

    const current = objectData[chatId];

    if (!current) {
      return "El universo es más complejo de lo que parece 🌌";
    }

    if (text.includes("hola")) return `¡Hola! ${current.intro}`;
    if (text.includes("quién sos") || text.includes("quien sos"))
      return current.intro;
    if (text.includes("galaxia")) return current.galaxy;
    if (text.includes("distancia")) return current.distance;
    if (
      text.includes("año") ||
      text.includes("cuando") ||
      text.includes("cuándo")
    )
      return current.year;
    if (text.includes("tipo")) return current.type;

    if (text.includes("radio")) {
      return "Este objeto es interesante en observaciones de radioastronomía 📡";
    }

    if (
      text.includes("rayos x") ||
      text.includes("rayosx") ||
      text.includes("x-ray") ||
      text.includes("xray")
    ) {
      return "También puede estudiarse en rayos X, donde revela procesos físicos muy energéticos.";
    }

    if (text.includes("neutrinos")) {
      return chatId === "sn1987a"
        ? "SN 1987A fue fundamental porque permitió detectar neutrinos asociados a una supernova."
        : "Los neutrinos son clave para entender explosiones estelares muy energéticas.";
    }

    if (text.includes("gracias")) {
      return "¡De nada! Me encanta hablar del universo ✨";
    }

    const randomIndex = Math.floor(Math.random() * current.extra.length);
    return current.extra[randomIndex];
  }

  function sendMessage(chatId, message) {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));

    if (message.sender === "user") {
      const typingMessage = {
        sender: "bot",
        text: "...",
        typing: true,
        time: getCurrentTime(),
      };

      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), typingMessage],
      }));

      setTimeout(() => {
        const botMessage = {
          sender: "bot",
          text: generateAstroResponse(chatId, message.text),
          time: getCurrentTime(),
        };

        setMessages((prev) => {
          const updated = [...(prev[chatId] || [])];
          updated.pop();
          return { ...prev, [chatId]: [...updated, botMessage] };
        });
      }, 1500);
    }
  }

  return (
    <AstroChatContext.Provider
      value={{
        objects,
        messages,
        favorites,
        toggleFavorite,
        sendMessage,
        clearChat,
        resetChat,
      }}
    >
      {children}
    </AstroChatContext.Provider>
  );
}