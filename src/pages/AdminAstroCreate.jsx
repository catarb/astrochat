import { useContext, useRef, useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AstroForm from "../components/AstroForm";
import { ASTRO_FORM_INITIAL_VALUES } from "../constants/astro";
import { AstroChatContext } from "../context/astro-chat-context";
import "./admin-astros.css";

const cleanOptionalValue = (value) => value.trim() || null;

const buildCreatePayload = (values) => ({
  name: values.name.trim(),
  type: values.type,
  shortDescription: values.shortDescription.trim(),
  description: values.description.trim(),
  imageUrl: values.imageUrl.trim(),
  scientificName: cleanOptionalValue(values.scientificName),
  distance: cleanOptionalValue(values.distance),
  constellation: cleanOptionalValue(values.constellation),
  isActive: values.isActive,
});

function AdminAstroCreate() {
  const navigate = useNavigate();
  const { createAstro } = useContext(AstroChatContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const submissionInProgress = useRef(false);

  const handleSubmit = async (values) => {
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    setFieldErrors({});

    try {
      const createdAstro = await createAstro(buildCreatePayload(values));
      navigate(`/admin/astros/${createdAstro.id}`, { replace: true });
    } catch (requestError) {
      if (requestError?.status === 400) {
        const nextFieldErrors = {};

        requestError.errors?.forEach((error) => {
          if (error?.field && error?.message) {
            nextFieldErrors[error.field] = error.message;
          }
        });

        setFieldErrors(nextFieldErrors);
        setSubmitError(
          Object.keys(nextFieldErrors).length > 0
            ? "Revisá los campos indicados."
            : "Los datos del Astro no son válidos.",
        );
      } else if (requestError?.status === 409) {
        setSubmitError(
          requestError.message || "Ya existe un Astro con ese nombre.",
        );
      } else if (requestError?.status !== 401) {
        setSubmitError("No se pudo crear el Astro. Intentá nuevamente.");
      }
    } finally {
      submissionInProgress.current = false;
      setIsSubmitting(false);
    }
  };

  const clearFieldError = (field) => {
    setFieldErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setSubmitError("");
  };

  return (
    <main className="admin-astros-page">
      <div className="admin-astros-content admin-form-page-content">
        <Link to="/admin/astros" className="admin-back-link">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver al listado
        </Link>

        <header className="admin-page-header">
          <div>
            <h1>
              <Plus size={30} aria-hidden="true" />
              Nuevo Astro
            </h1>
            <p>Completá los datos para agregar un Astro al catálogo.</p>
          </div>
        </header>

        <AstroForm
          initialValues={ASTRO_FORM_INITIAL_VALUES}
          onSubmit={handleSubmit}
          submitLabel="Crear Astro"
          submittingLabel="Creando..."
          isSubmitting={isSubmitting}
          submitError={submitError}
          fieldErrors={fieldErrors}
          onFieldErrorClear={clearFieldError}
          onCancel={() => navigate("/admin/astros")}
        />
      </div>
    </main>
  );
}

export default AdminAstroCreate;
