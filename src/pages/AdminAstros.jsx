import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Telescope } from "lucide-react";
import { Link } from "react-router-dom";
import { getAstroCatalog } from "../services/astro.service";
import {
  getImageFallbackSource,
  getImageSource,
  handleImageError,
} from "../utils/image";
import "./admin-astros.css";

function AdminAstros() {
  const [astros, setAstros] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCatalog = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await getAstroCatalog({ page: 1, limit: 50 });

        if (isActive) {
          setAstros(result.astros);
          setPagination(result.pagination);
        }
      } catch {
        if (isActive) {
          setAstros([]);
          setPagination(null);
          setError("No se pudieron cargar los Astros.");
        }
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadCatalog();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="admin-astros-page">
      <div className="admin-astros-content">
        <Link to="/" className="admin-back-link">
          <ArrowLeft size={18} aria-hidden="true" />
          Volver a AstroChat
        </Link>

        <header className="admin-page-header">
          <div>
            <h1>
              <Telescope size={30} aria-hidden="true" />
              Administrar Astros
            </h1>
            <p>Consultá los Astros activos e inactivos registrados.</p>
          </div>

          <div className="admin-header-actions">
            {pagination && !loading && !error && (
              <span className="admin-catalog-count">
                {pagination.total}{" "}
                {pagination.total === 1 ? "Astro" : "Astros"}
              </span>
            )}
            <Link to="/admin/astros/new" className="admin-primary-button">
              <Plus size={18} aria-hidden="true" />
              Nuevo Astro
            </Link>
          </div>
        </header>

        {loading ? (
          <p className="admin-status">Cargando Astros...</p>
        ) : error ? (
          <p className="admin-status admin-status-error">{error}</p>
        ) : astros.length === 0 ? (
          <p className="admin-status">No hay Astros disponibles.</p>
        ) : (
          <div className="admin-astro-grid">
            {astros.map((astro) => (
              <Link
                key={astro.id}
                to={`/admin/astros/${astro.id}`}
                className="admin-astro-card"
              >
                <img
                  src={getImageSource(astro)}
                  alt={astro.name || "Astro"}
                  data-fallback-src={getImageFallbackSource(astro)}
                  onError={handleImageError}
                />

                <div className="admin-astro-card-content">
                  <div className="admin-astro-card-heading">
                    <h2>{astro.name}</h2>
                    <span
                      className={`admin-status-badge ${
                        astro.isActive ? "is-active" : "is-inactive"
                      }`}
                    >
                      {astro.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>

                  <p className="admin-astro-type">{astro.type}</p>
                  <p className="admin-astro-summary">
                    {astro.shortDescription || "Sin descripción corta."}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminAstros;
