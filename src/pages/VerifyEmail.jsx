import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ApiError } from "../services/api";
import { verifyEmail } from "../services/auth.service";

const MISSING_TOKEN_MESSAGE =
  "El enlace de verificación no contiene un token válido.";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";
  const requestedTokenRef = useRef(null);
  const [verification, setVerification] = useState(null);

  const currentVerification =
    verification?.token === token ? verification : null;
  const status = !token
    ? "error"
    : currentVerification?.status || "loading";
  const message = !token
    ? MISSING_TOKEN_MESSAGE
    : currentVerification?.message || "Estamos verificando tu correo…";

  useEffect(() => {
    if (!token) return;

    if (requestedTokenRef.current === token) return;

    requestedTokenRef.current = token;

    const runVerification = async () => {
      try {
        await verifyEmail(token);
        setVerification({
          token,
          status: "success",
          message: "Tu correo fue verificado correctamente.",
        });
      } catch (requestError) {
        setVerification({
          token,
          status: "error",
          message:
            requestError instanceof ApiError
              ? requestError.message
              : "No se pudo verificar el correo. Intentá nuevamente.",
        });
      }
    };

    void runVerification();
  }, [token]);

  return (
    <main className="login-page">
      <video
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

      <section className="login-form verify-email-card" aria-live="polite">
        <h1>AstroChat 🌌</h1>

        {status === "loading" && (
          <div className="verification-spinner" aria-hidden="true"></div>
        )}

        <p
          className={`auth-message ${
            status === "success"
              ? "auth-success"
              : status === "error"
                ? "auth-error"
                : "verification-loading"
          }`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>

        {status !== "loading" && (
          <Link className="verify-email-login-link" to="/login">
            Ir a iniciar sesión
          </Link>
        )}
      </section>
    </main>
  );
}

export default VerifyEmail;
