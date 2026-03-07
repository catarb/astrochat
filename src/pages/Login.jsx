import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("astrochat_user", user || "invitado");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="login-page">
      <video autoPlay loop muted playsInline className="login-video">
        <source src="/video_fondo.mp4" type="video/mp4" />
      </video>

      <div className="login-overlay"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1>AstroChat 🌌</h1>

        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;