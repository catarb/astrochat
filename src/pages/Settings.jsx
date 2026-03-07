function Settings() {
  const user = localStorage.getItem("astrochat_user") || "invitado";

  function logout() {
    localStorage.removeItem("astrochat_user");
    window.location.reload();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #08111a 0%, #0b141a 100%)",
        padding: "40px 24px",
        color: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Ajustes ⚙️
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "28px",
          }}
        >
          Configuración general de AstroChat.
        </p>

        <div
          style={{
            backgroundColor: "#111b21",
            border: "1px solid #2a3942",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "18px",
          }}
        >
          <h2
            style={{
              fontSize: "1.1rem",
              marginBottom: "10px",
            }}
          >
            Cuenta
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              margin: 0,
            }}
          >
            Usuario actual: <strong>{user}</strong>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
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