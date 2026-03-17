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
    {
      id: "crabNebula",
      name: "Crab Nebula",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "1054",
      distance: "6,500 años luz",
      description:
        "Remanente histórico asociado a la supernova observada en el año 1054, famoso por su púlsar central.",
      image: "/Crab_Nebula.jpg",
    },
    {
      id: "tycho",
      name: "Tycho",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "1572",
      distance: "8,000 años luz",
      description:
        "Remanente de la supernova observada por Tycho Brahe, fundamental para la historia de la astronomía.",
      image: "/Tychos-Supernova-Chandra.webp",
    },
    {
      id: "kepler",
      name: "Kepler",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "1604",
      distance: "20,000 años luz",
      description:
        "Remanente asociado a la última supernova observada a simple vista en la Vía Láctea.",
      image: "/kepler.jpg",
    },
    {
      id: "vela",
      name: "Vela",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "hace ~11,000 años",
      distance: "800 años luz",
      description:
        "Uno de los remanentes de supernova más cercanos a la Tierra, brillante en rayos X.",
      image: "/vela.webp",
    },
    {
      id: "rcw86",
      name: "RCW 86",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "185",
      distance: "8,200 años luz",
      description:
        "Posible remanente de la supernova registrada por astrónomos chinos en el año 185.",
      image: "/rcw86.jpg",
    },
    {
      id: "puppisA",
      name: "Puppis A",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "hace ~4,000 años",
      distance: "7,000 años luz",
      description:
        "Remanente galáctico joven con estructura compleja y estudiado en múltiples longitudes de onda.",
      image: "/puppisA.jpg",
    },
    {
      id: "ic443",
      name: "IC 443",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "hace ~3,000-30,000 años",
      distance: "5,000 años luz",
      description:
        "Remanente que interactúa con nubes moleculares, muy interesante para estudios de choques.",
      image: "/ic443.jpg",
    },
    {
      id: "w49b",
      name: "W49B",
      type: "Supernova Remnant",
      galaxy: "Milky Way",
      year: "hace ~1,000 años",
      distance: "26,000 años luz",
      description:
        "Remanente brillante y peculiar, posiblemente originado por una explosión altamente asimétrica.",
      image: "/w49b.jpg",
    },
    {
      id: "n63a",
      name: "N63A",
      type: "Supernova Remnant",
      galaxy: "LMC",
      year: "joven",
      distance: "160,000 años luz",
      description:
        "Remanente ubicado en la región H II N63, inmerso en un entorno muy rico en gas interestelar.",
      image: "/n63a.jpg",
    },
  ]);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("astrochat-favorites");
    return savedFavorites
      ? JSON.parse(savedFavorites)
      : ["sn1987a", "cassiopeiaA", "n63a"];
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
    sn1006: [
      {
        sender: "bot",
        text: "Fui una de las supernovas más brillantes observadas por la humanidad ✨",
        time: "12:08",
      },
    ],
    crabNebula: [
      {
        sender: "bot",
        text: "Mi púlsar central es uno de mis rasgos más famosos 🦀",
        time: "11:34",
      },
    ],
    tycho: [
      {
        sender: "bot",
        text: "Estoy asociado a la supernova observada por Tycho Brahe 🔭",
        time: "10:52",
      },
    ],
    kepler: [
      {
        sender: "bot",
        text: "Soy la última supernova observada a simple vista en la Vía Láctea 🌌",
        time: "09:47",
      },
    ],
    vela: [
      {
        sender: "bot",
        text: "Soy uno de los remanentes de supernova más cercanos a la Tierra 💫",
        time: "08:40",
      },
    ],
    rcw86: [
      {
        sender: "bot",
        text: "Podría estar vinculado a una supernova registrada en el año 185 📜",
        time: "16:19",
      },
    ],
    puppisA: [
      {
        sender: "bot",
        text: "Tengo una morfología compleja y soy muy interesante en rayos X ⚡",
        time: "15:03",
      },
    ],
    ic443: [
      {
        sender: "bot",
        text: "Interactúo con nubes moleculares, lo que me hace muy especial ☁️",
        time: "14:26",
      },
    ],
    w49b: [
      {
        sender: "bot",
        text: "Mi estructura sugiere una explosión poco común 🚀",
        time: "13:11",
      },
    ],
    n63a: [
      {
        sender: "bot",
        text: "Estoy inmerso en la región H II N63 en la Nube Mayor de Magallanes 🌠",
        time: "19:04",
      },
    ],
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
      crabNebula: {
        intro: "Soy Crab Nebula, un remanente de supernova muy famoso.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 6.500 años luz.",
        year: "Estoy asociado a la supernova observada en 1054.",
        type: "Soy un remanente de supernova con un púlsar central.",
        extra: [
          "Mi púlsar central es uno de los más conocidos de la astronomía.",
          "Soy un objeto clásico para estudiar física de altas energías.",
          "Tengo una estructura filamentaria muy característica.",
        ],
      },
      tycho: {
        intro: "Soy Tycho, remanente de la supernova observada en 1572.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 8.000 años luz.",
        year: "Mi supernova fue observada en 1572.",
        type: "Soy un remanente de supernova histórica.",
        extra: [
          "Estoy ligado al trabajo de Tycho Brahe.",
          "Soy importante tanto histórica como astrofísicamente.",
          "Se me estudia mucho para entender remanentes jóvenes.",
        ],
      },
      kepler: {
        intro: "Soy Kepler, remanente de la supernova observada en 1604.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 20.000 años luz.",
        year: "Mi explosión fue observada en 1604.",
        type: "Soy un remanente de supernova histórica muy importante.",
        extra: [
          "Fui la última supernova observada a simple vista en nuestra galaxia.",
          "Tengo un lugar especial en la historia de la astronomía.",
          "Se me estudia mucho en rayos X y otras longitudes de onda.",
        ],
      },
      vela: {
        intro: "Soy Vela, un remanente de supernova muy cercano.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 800 años luz.",
        year: "Me originé hace unos 11.000 años.",
        type: "Soy un remanente de supernova extenso y cercano.",
        extra: [
          "Mi cercanía me hace ideal para muchos estudios detallados.",
          "Soy brillante en rayos X.",
          "Formo parte de una región muy interesante del cielo austral.",
        ],
      },
      rcw86: {
        intro: "Soy RCW 86, un remanente posiblemente asociado a la supernova del año 185.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 8.200 años luz.",
        year: "Podría estar vinculado a una observación histórica del año 185.",
        type: "Soy un remanente de supernova galáctico.",
        extra: [
          "Tengo interés histórico y físico al mismo tiempo.",
          "Soy útil para estudiar choques y aceleración de partículas.",
          "Mi morfología es muy atractiva en distintas bandas.",
        ],
      },
      puppisA: {
        intro: "Soy Puppis A, un remanente de supernova joven de la Vía Láctea.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 7.000 años luz.",
        year: "Me originé hace unos 4.000 años.",
        type: "Soy un remanente de supernova joven.",
        extra: [
          "Tengo una estructura compleja muy estudiada.",
          "Soy interesante en radio y en rayos X.",
          "Aporto información valiosa sobre la evolución de remanentes jóvenes.",
        ],
      },
      ic443: {
        intro: "Soy IC 443, un remanente de supernova que interactúa con nubes moleculares.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 5.000 años luz.",
        year: "Mi edad estimada está entre unos pocos miles y decenas de miles de años.",
        type: "Soy un remanente de supernova en interacción con el medio interestelar.",
        extra: [
          "Soy un caso muy interesante para estudiar choques con nubes.",
          "Mi estructura refleja una interacción compleja con el entorno.",
          "Se me observa mucho en varias longitudes de onda.",
        ],
      },
      w49b: {
        intro: "Soy W49B, un remanente de supernova brillante y peculiar.",
        galaxy: "Estoy en la Vía Láctea.",
        distance: "Estoy a unos 26.000 años luz.",
        year: "Se estima que me originé hace alrededor de 1.000 años.",
        type: "Soy un remanente de supernova con rasgos poco comunes.",
        extra: [
          "Podría haberme formado en una explosión muy asimétrica.",
          "Soy muy interesante para estudios de altas energías.",
          "Mi morfología me hace destacar frente a otros remanentes.",
        ],
      },
      n63a: {
        intro: "Soy N63A, un remanente de supernova en la Nube Mayor de Magallanes.",
        galaxy: "Estoy en la Gran Nube de Magallanes.",
        distance: "Estoy a unos 160.000 años luz.",
        year: "Soy un remanente relativamente joven.",
        type: "Soy un remanente de supernova inmerso en una región H II.",
        extra: [
          "Estoy asociado a un entorno interestelar muy rico y complejo.",
          "Soy muy interesante para estudiar interacción entre remanente y medio circundante.",
          "Mi ubicación en N63 me vuelve un objeto muy atractivo para la astrofísica.",
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