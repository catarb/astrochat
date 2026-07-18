import { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AstroForm from "../components/AstroForm";
import { AstroChatContext } from "../context/astro-chat-context";
import { getAstroById } from "../services/astro.service";
import "./admin-astros.css";

const MONGO_ID_PATTERN = /^[a-f\d]{24}$/i;

const cleanOptionalValue = (value) => value.trim() || null;

const buildInitialValues = (astro) => ({
  name: astro.name || "",
  type: astro.type || "planet",
  shortDescription: astro.shortDescription || "",
  description: astro.description || "",
  imageUrl: astro.imageUrl || "",
  scientificName: astro.scientificName || "",
  distance: astro.distance || "",
  constellation: astro.constellation || "",
  isActive: astro.isActive !== false,
});

const buildUpdatePayload = (values) => ({
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

const getValidationErrors = (requestError) => {
  const errors = {};

  requestError.errors?.forEach((error) => {
    if (error?.field && error?.message) errors[error.field] = error.message;
  });

  return errors;
};

function AdminAstroEdit() {
  const { astroId } = useParams();
  const navigate = useNavigate();
  const { updateAstro } = useContext(AstroChatContext);
  const [astro, setAstro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const submissionInProgress = useRef(false);

  useEffect(() => {
    let isCurrent = true;

    if (!MONGO_ID_PATTERN.test(astroId || "")) {
      setAstro(null);
      setLoadError("Astro no encontrado.");
      setLoading(false);
      return () => {
        isCurrent = false;
      };
    }

    const loadAstro = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const result = await getAstroById(astroId);
        if (isCurrent) setAstro(result);
      } catch (requestError) {
        if (isCurrent) {
          setAstro(null);
          setLoadError(
            requestError?.status === 404
              ? "Astro no encontrado."
              : "No se pudo cargar el Astro.",
          );
        }
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    loadAstro();

    return () => {
      isCurrent = false;
    };
  }, [astroId]);

  const handleSubmit = async (values) => {
    if (submissionInProgress.current) return;

    submissionInProgress.current = true;
    setIsSubmitting(true);
    setSubmitError("");
    setFieldErrors({});

    try {
      const updatedAstro = await updateAstro(
        astroId,
        buildUpdatePayload(values),
      );
      navigate(`/admin/astros/${updatedAstro.id}`, { replace: true });
    } catch (requestError) {
      if (requestError?.status === 400) {
        const nextFieldErrors = getValidationErrors(requestError);
        setFieldErrors(nextFieldErrors);
        setSubmitError(
          Object.keys(nextFieldErrors).length > 0
            ? "Revisá los campos indicados."
            : "Los datos del Astro no son válidos.",
        );
      } else if (requestError?.status === 404) {
        setSubmitError("Astro no encontrado.");
      } else if (requestError?.status === 409) {
        setSubmitError(
          requestError.message || "Ya existe un Astro con ese nombre.",
        );
      } else if (requestError?.status !== 401) {
        setSubmitError("No se pudo actualizar el Astro. Intentá nuevamente.");
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

  const detailPath = `/admin/astros/${astroId}`;

  return (
    <main className="admin-astros-page">
      <div className="admin-astros-content admin-form-page-content">
        <Link to={detailPath} className="admin-back-link">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver al detalle
        </Link>

        {loading ? (
          <p className="admin-status">Cargando Astro...</p>
        ) : loadError ? (
          <p className="admin-status admin-status-error">{loadError}</p>
        ) : astro ? (
          <>
            <header className="admin-page-header">
              <div>
                <h1>
                  <Pencil size={30} aria-hidden="true" />
                  Editar Astro
                </h1>
                <p>Actualizá los datos de {astro.name}.</p>
              </div>
            </header>

            <AstroForm
              key={astro.id}
              initialValues={buildInitialValues(astro)}
              onSubmit={handleSubmit}
              submitLabel="Guardar cambios"
              submittingLabel="Guardando..."
              isSubmitting={isSubmitting}
              submitError={submitError}
              fieldErrors={fieldErrors}
              onFieldErrorClear={clearFieldError}
              onCancel={() => navigate(detailPath)}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}

export default AdminAstroEdit;
