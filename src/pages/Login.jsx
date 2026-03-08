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
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const promise = video.play();
      if (promise?.catch) {
        promise.catch(() => {});
      }
    };

    const onCanPlay = () => {
      tryPlay();
    };

    const onFirstTouch = () => {
      tryPlay();
      window.removeEventListener("touchstart", onFirstTouch);
    };

    video.addEventListener("canplay", onCanPlay);
    window.addEventListener("touchstart", onFirstTouch, { passive: true });

    tryPlay();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      window.removeEventListener("touchstart", onFirstTouch);
    };
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
        preload="metadata"
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