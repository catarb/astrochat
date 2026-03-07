function Home() {
  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0b141a 0%, #111b21 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "520px",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
          }}
        >
          🌌
        </div>

        <h1
          style={{
            color: "#e2e8f0",
            fontSize: "2.5rem",
            marginBottom: "14px",
          }}
        >
          Bienvenida a AstroChat
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.05rem",
            lineHeight: 1.6,
          }}
        >
          Seleccioná un objeto astronómico del panel izquierdo para comenzar a
          chatear.
        </p>
      </div>
    </div>
  );
}

export default Home;