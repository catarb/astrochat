import { createContext, useState, useEffect } from "react";

export const AstroChatContext = createContext();

export function AstroChatProvider({ children }) {
  const [objects] = useState([
    {
      id: "sn1987a",
      name: "SN 1987A",
      type: "Supernova",
      galaxy: "LMC",
      // Imagen real de la NASA
      image: "/sn1987a.jpg"
    },
    {
      id: "cassiopeiaA",
      name: "Cassiopeia A",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      // Imagen del observatorio Chandra
      image: "/Cassiopeia_A.jpg"
    },
    {
      id: "sn1006",
      name: "SN 1006",
      type: "Supernova",
      galaxy: "Milky Way",
      // Imagen histórica
      image: "/sn1006.jpg"
    },
  ]);

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("astrochat-messages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : {
          sn1987a: [{ sender: "bot", text: "Explosión detectada en 1987 👀" }],
          cassiopeiaA: [{ sender: "bot", text: "Uno de los remanentes más brillantes en radio 📡" }],
          sn1006: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("astrochat-messages", JSON.stringify(messages));
  }, [messages]);

function generateAstroResponse(chatId, userText) {
  const text = userText.toLowerCase();

  const responses = {
    sn1987a: [
      "Soy SN 1987A, observada en la Gran Nube de Magallanes.",
      "Fui clave para estudiar neutrinos provenientes de una supernova.",
      "Mi explosión fue detectada en 1987 y marcó un antes y un después.",
      "Soy una de las supernovas más famosas de la astronomía moderna."
    ],
    cassiopeiaA: [
      "Soy Cassiopeia A, un remanente brillante en rayos X.",
      "Mi explosión ocurrió hace unos 350 años.",
      "Soy uno de los remanentes mejor estudiados de la Vía Láctea.",
      "En radio, óptico y rayos X soy realmente fascinante."
    ],
    sn1006: [
      "Soy SN 1006, una de las supernovas más brillantes registradas.",
      "En el año 1006 fui visible incluso de noche con enorme intensidad.",
      "Mi remanente todavía se estudia en distintas longitudes de onda.",
      "Soy un objeto histórico muy importante para la astronomía."
    ]
  };

  if (text.includes("hola")) {
    return "¡Hola! Qué bueno verte por acá 🌌";
  }

  if (text.includes("quién sos") || text.includes("quien sos")) {
    return responses[chatId]?.[0] || "Soy un objeto astronómico fascinante.";
  }

  if (text.includes("gracias")) {
    return "¡De nada! Me encanta hablar del universo ✨";
  }

  const options = responses[chatId] || ["El universo es más complejo de lo que parece 🌌"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

  function sendMessage(chatId, message) {
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message],
    }));

    if (message.sender === "user") {
      const typingMessage = { sender: "bot", text: "...", typing: true };
      setMessages((prev) => ({
        ...prev,
        [chatId]: [...(prev[chatId] || []), typingMessage],
      }));

      setTimeout(() => {
        const botMessage = {
          sender: "bot",
          text: generateAstroResponse(chatId, message.text),
        };
        setMessages((prev) => {
          const updated = [...(prev[chatId] || [])];
          updated.pop(); // Quitar el "typing..."
          return { ...prev, [chatId]: [...updated, botMessage] };
        });
      }, 1500);
    }
  }

  return (
    <AstroChatContext.Provider value={{ objects, messages, sendMessage }}>
      {children}
    </AstroChatContext.Provider>
  );
}