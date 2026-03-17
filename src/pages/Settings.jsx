function Settings() {
  const user = localStorage.getItem("astrochat_user") || "invitado";

  function logout() {
    localStorage.removeItem("astrochat_user");
    window.location.reload();
  }

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0b141a 0%, #111b21 100%)",
        padding: "40px",
      }}
    >
      <h1 style={{ color: "#e2e8f0", marginBottom: "10px" }}>⚙️ Ajustes</h1>

      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Configuración general de AstroChat.
      </p>

      <div style={{ display: "grid", gap: "16px", maxWidth: "700px" }}>
        <div
          style={{
            backgroundColor: "#1b2730",
            border: "1px solid #2a3942",
            borderRadius: "18px",
            padding: "20px",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              color: "#f8fafc",
              fontSize: "1.1rem",
            }}
          >
            Cuenta
          </h2>

          <p
            style={{
              margin: 0,
              color: "#cbd5e1",
            }}
          >
            Usuario actual: <strong>{user}</strong>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            width: "fit-content",
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Settings;