import { useContext } from "react";
import { AstroChatContext } from "../context/AstroChatContext";
import { NavLink } from "react-router-dom";

function Objects() {
  const { objects } = useContext(AstroChatContext);

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0b141a 0%, #111b21 100%)",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#e2e8f0", marginBottom: "10px" }}>🔭 Objetos</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Explorá todos los objetos astronómicos disponibles.
      </p>

      <div style={{ display: "grid", gap: "16px", maxWidth: "700px" }}>
        {objects.map((obj) => (
          <NavLink
            key={obj.id}
            to={`/chat/${obj.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                backgroundColor: "#1b2730",
                border: "1px solid #2a3942",
                borderRadius: "18px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <img
                src={obj.image}
                alt={obj.name}
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #3b82f6",
                }}
              />
              <div>
                <h3 style={{ margin: 0, color: "#f8fafc" }}>{obj.name}</h3>
                <p style={{ margin: "4px 0 0 0", color: "#94a3b8" }}>
                  {obj.type} — {obj.galaxy}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Objects;