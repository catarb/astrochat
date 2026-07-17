import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const videoRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const success = location.state?.success;

  useEffect(() => {
    const video = videoRef.current;
    const root = document.documentElement;

    function updateViewportVars() {
      const viewport = window.visualViewport;

      if (viewport) {
        root.style.setProperty("--app-height", `${viewport.height}px`);
        root.style.setProperty("--vv-top", `${viewport.offsetTop}px`);
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

    const removeViewportListeners = () => {
      window.removeEventListener("resize", updateViewportVars);
      window.removeEventListener("orientationchange", updateViewportVars);

      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateViewportVars);
        window.visualViewport.removeEventListener("scroll", updateViewportVars);
      }
    };

    if (!video) {
      return removeViewportListeners;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const promise = video.play();
      if (promise?.catch) promise.catch(() => {});
    };
    const onFirstTouch = () => {
      tryPlay();
      window.removeEventListener("touchstart", onFirstTouch);
    };

    video.addEventListener("canplay", tryPlay);
    window.addEventListener("touchstart", onFirstTouch, { passive: true });
    tryPlay();

    return () => {
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onFirstTouch);
      removeViewportListeners();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }

    if (!password) {
      setError("La contraseña es obligatoria.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
      const origin = location.state?.from;
      const destination = origin
        ? `${origin.pathname}${origin.search || ""}${origin.hash || ""}`
        : "/";
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "No se pudo iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
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

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h1>AstroChat 🌌</h1>

        <input
          type="email"
          autoComplete="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
        />

        <input
          type="password"
          autoComplete="current-password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
        />

        {success && !error && (
          <p className="auth-message auth-success">{success}</p>
        )}
        {error && <p className="auth-message auth-error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Entrar"}
        </button>

        <p className="auth-switch">
          ¿No tenés una cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
