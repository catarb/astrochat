function Settings() {
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

      <div
        style={{
          maxWidth: "600px",
          backgroundColor: "#1b2730",
          border: "1px solid #2a3942",
          borderRadius: "20px",
          padding: "24px",
          display: "grid",
          gap: "16px",
        }}
      >
        <div>
          <h3 style={{ marginBottom: "6px", color: "#f8fafc" }}>Tema</h3>
          <p style={{ color: "#94a3b8" }}>Modo oscuro activado</p>
        </div>

        <div>
          <h3 style={{ marginBottom: "6px", color: "#f8fafc" }}>Notificaciones</h3>
          <p style={{ color: "#94a3b8" }}>Alertas astronómicas simuladas</p>
        </div>

        <div>
          <h3 style={{ marginBottom: "6px", color: "#f8fafc" }}>Versión</h3>
          <p style={{ color: "#94a3b8" }}>AstroChat v1.0</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;