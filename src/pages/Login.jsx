import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Safari móvil a veces bloquea el autoplay.
        // Dejamos el intento silencioso para no romper la UI.
      });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("astrochat_user", user || "invitado");
    localStorage.setItem("astrochat_avatar", "https://i.pravatar.cc/150?img=12");

    navigate("/");
    window.location.reload();
  }

  return (
    <div className="login-page">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="login-video"
      >
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