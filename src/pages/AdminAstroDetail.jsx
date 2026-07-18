import { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AstroChatContext } from "../context/astro-chat-context";
import { getAstroById } from "../services/astro.service";
import {
  getImageFallbackSource,
  getImageSource,
  handleImageError,
} from "../utils/image";
import "./admin-astros.css";

const MONGO_ID_PATTERN = /^[a-f\d]{24}$/i;

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

function AdminAstroDetail() {
  const { astroId } = useParams();
  const navigate = useNavigate();
  const { deleteAstro } = useContext(AstroChatContext);
  const [astro, setAstro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const deletionInProgress = useRef(false);

  useEffect(() => {
    let isActive = true;

    if (!MONGO_ID_PATTERN.test(astroId || "")) {
      setAstro(null);
      setError("Astro no encontrado.");
      setLoading(false);
      return () => {
        isActive = false;
      };
    }

    const loadAstro = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getAstroById(astroId);

        if (isActive) setAstro(result);
      } catch (requestError) {
        if (isActive) {
          setAstro(null);
          setError(
            requestError?.status === 404
              ? "Astro no encontrado."
              : "No se pudo cargar el Astro.",
          );
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadAstro();

    return () => {
      isActive = false;
    };
  }, [astroId]);

  const handleDelete = async () => {
    if (deletionInProgress.current || !astro) return;

    const confirmed = window.confirm(
      `¿Seguro que querés eliminar “${astro.name}”?\n\n` +
        "Esta acción es permanente y no se puede deshacer. " +
        "Si existen conversaciones asociadas, podrían quedar referencias incompletas.",
    );

    if (!confirmed) return;

    deletionInProgress.current = true;
    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteAstro(astroId);
      navigate("/admin/astros", { replace: true });
    } catch (requestError) {
      if (requestError?.status === 400) {
        setDeleteError("El identificador del Astro no es válido.");
      } else if (requestError?.status === 404) {
        setDeleteError("Astro no encontrado.");
      } else if (requestError?.status !== 401) {
        setDeleteError("No se pudo eliminar el Astro.");
      }
    } finally {
      deletionInProgress.current = false;
      setIsDeleting(false);
    }
  };

  return (
    <main className="admin-astros-page">
      <div className="admin-astros-content">
        <Link to="/admin/astros" className="admin-back-link">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver al listado
        </Link>

        {loading ? (
          <p className="admin-status">Cargando Astro...</p>
        ) : error ? (
          <p className="admin-status admin-status-error">{error}</p>
        ) : astro ? (
          <article className="admin-astro-detail">
            <header className="admin-detail-header">
              <div className="admin-detail-identity">
                <img
                  src={getImageSource(astro)}
                  alt={astro.name || "Astro"}
                  data-fallback-src={getImageFallbackSource(astro)}
                  onError={handleImageError}
                />

                <div>
                  <div className="admin-detail-title-row">
                    <h1>{astro.name}</h1>
                    <span
                      className={`admin-status-badge ${
                        astro.isActive ? "is-active" : "is-inactive"
                      }`}
                    >
                      {astro.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  {astro.scientificName && (
                    <p className="admin-scientific-name">
                      {astro.scientificName}
                    </p>
                  )}
                  <p className="admin-astro-type">{astro.type}</p>
                </div>
              </div>

              <div className="admin-detail-actions">
                <Link
                  to={`/admin/astros/${astro.id}/edit`}
                  className={`admin-primary-button ${
                    isDeleting ? "is-disabled" : ""
                  }`}
                  aria-disabled={isDeleting}
                  tabIndex={isDeleting ? -1 : undefined}
                  onClick={(event) => {
                    if (isDeleting) event.preventDefault();
                  }}
                >
                  <Pencil size={18} aria-hidden="true" />
                  Editar
                </Link>
                <button
                  type="button"
                  className="admin-danger-button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 size={18} aria-hidden="true" />
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </header>

            {deleteError && (
              <p className="admin-form-submit-error" role="alert">
                {deleteError}
              </p>
            )}

            <section className="admin-detail-section">
              <h2>Descripción</h2>
              <p>{astro.shortDescription}</p>
              <p>{astro.description}</p>
            </section>

            <dl className="admin-detail-data">
              {astro.distance && (
                <div>
                  <dt>Distancia</dt>
                  <dd>{astro.distance}</dd>
                </div>
              )}
              {astro.constellation && (
                <div>
                  <dt>Constelación</dt>
                  <dd>{astro.constellation}</dd>
                </div>
              )}
              {astro.slug && (
                <div>
                  <dt>Slug</dt>
                  <dd>{astro.slug}</dd>
                </div>
              )}
              {formatDate(astro.createdAt) && (
                <div>
                  <dt>Creado</dt>
                  <dd>{formatDate(astro.createdAt)}</dd>
                </div>
              )}
              {formatDate(astro.updatedAt) && (
                <div>
                  <dt>Actualizado</dt>
                  <dd>{formatDate(astro.updatedAt)}</dd>
                </div>
              )}
            </dl>
          </article>
        ) : null}
      </div>
    </main>
  );
}

export default AdminAstroDetail;
