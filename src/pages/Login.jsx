import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    const root = document.documentElement;

    function updateViewportVars() {
      const vv = window.visualViewport;

      if (vv) {
        root.style.setProperty("--app-height", `${vv.height}px`);
        root.style.setProperty("--vv-top", `${vv.offsetTop}px`);
      } else {
        root.style.setProperty("--app-height", `${window.innerHeight}px`);
        root.style.setProperty("--vv-top", "0px");
      }
    }

    updateViewportVars();

    window.addEventListener("resize", updateViewportVars);
    window.addEventListener("orientationchange", updateViewportVars);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updateViewportVars);
      window.visualViewport.addEventListener("scroll", updateViewportVars);
    }

    if (!video) {
      return () => {
        window.removeEventListener("resize", updateViewportVars);
        window.removeEventListener("orientationchange", updateViewportVars);

        if (window.visualViewport) {
          window.visualViewport.removeEventListener("resize", updateViewportVars);
          window.visualViewport.removeEventListener("scroll", updateViewportVars);
        }
      };
    }

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
      window.removeEventListener("resize", updateViewportVars);
      window.removeEventListener("orientationchange", updateViewportVars);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportVars);
        window.visualViewport.removeEventListener("scroll", updateViewportVars);
      }
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