import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    if (name.trim().length < 2 || name.trim().length > 50) {
      return "El nombre debe tener entre 2 y 50 caracteres.";
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      return "Ingresá un correo electrónico válido.";
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password)
    ) {
      return "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login", {
        replace: true,
        state: {
          success:
            result.message ||
            "Usuario registrado. Revisá tu correo para verificar la cuenta.",
        },
      });
    } catch (requestError) {
      setError(requestError.message || "No se pudo completar el registro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
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

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h1>AstroChat 🌌</h1>

        <input
          type="text"
          autoComplete="name"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isSubmitting}
        />

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
          autoComplete="new-password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isSubmitting}
        />

        {error && <p className="auth-message auth-error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="auth-switch">
          ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
