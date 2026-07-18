import { useState } from "react";
import {
  ASTRO_FORM_INITIAL_VALUES,
  ASTRO_TYPES,
} from "../constants/astro";

const TYPE_LABELS = {
  star: "Estrella",
  planet: "Planeta",
  moon: "Luna",
  galaxy: "Galaxia",
  nebula: "Nebulosa",
  "black-hole": "Agujero negro",
  comet: "Cometa",
  asteroid: "Asteroide",
  cluster: "Cúmulo",
  other: "Otro",
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const validateAstro = (values) => {
  const errors = {};
  const name = values.name.trim();
  const shortDescription = values.shortDescription.trim();
  const description = values.description.trim();
  const imageUrl = values.imageUrl.trim();

  if (!name) {
    errors.name = "El nombre es obligatorio.";
  } else if (name.length < 2 || name.length > 80) {
    errors.name = "El nombre debe tener entre 2 y 80 caracteres.";
  }

  if (!ASTRO_TYPES.includes(values.type)) {
    errors.type = "Seleccioná un tipo de Astro válido.";
  }

  if (shortDescription.length < 10 || shortDescription.length > 250) {
    errors.shortDescription =
      "La descripción corta debe tener entre 10 y 250 caracteres.";
  }

  if (description.length < 20 || description.length > 1500) {
    errors.description =
      "La descripción debe tener entre 20 y 1500 caracteres.";
  }

  if (!imageUrl) {
    errors.imageUrl = "La URL de la imagen es obligatoria.";
  } else if (!isValidUrl(imageUrl)) {
    errors.imageUrl = "Ingresá una URL de imagen válida.";
  }

  if (values.scientificName.trim().length > 150) {
    errors.scientificName =
      "El nombre científico debe tener como máximo 150 caracteres.";
  }

  if (values.distance.trim().length > 150) {
    errors.distance = "La distancia debe tener como máximo 150 caracteres.";
  }

  if (values.constellation.trim().length > 100) {
    errors.constellation =
      "La constelación debe tener como máximo 100 caracteres.";
  }

  if (typeof values.isActive !== "boolean") {
    errors.isActive = "El estado activo debe ser booleano.";
  }

  return errors;
};

function AstroForm({
  initialValues = ASTRO_FORM_INITIAL_VALUES,
  onSubmit,
  submitLabel = "Guardar Astro",
  submittingLabel = "Guardando...",
  isSubmitting = false,
  submitError = "",
  fieldErrors = {},
  onFieldErrorClear,
  onCancel,
}) {
  const [values, setValues] = useState(() => ({
    ...ASTRO_FORM_INITIAL_VALUES,
    ...initialValues,
  }));
  const [validationErrors, setValidationErrors] = useState({});

  const getFieldError = (field) =>
    validationErrors[field] || fieldErrors[field] || "";

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: nextValue,
    }));
    setValidationErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
    onFieldErrorClear?.(name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateAstro(values);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    await onSubmit(values);
  };

  return (
    <form className="admin-astro-form" onSubmit={handleSubmit} noValidate>
      <div className="admin-form-grid">
        <label className="admin-form-field">
          <span>Nombre *</span>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("name"))}
          />
          {getFieldError("name") && (
            <small className="admin-field-error">{getFieldError("name")}</small>
          )}
        </label>

        <label className="admin-form-field">
          <span>Tipo *</span>
          <select
            name="type"
            value={values.type}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("type"))}
          >
            {ASTRO_TYPES.map((type) => (
              <option key={type} value={type}>
                {TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          {getFieldError("type") && (
            <small className="admin-field-error">{getFieldError("type")}</small>
          )}
        </label>

        <label className="admin-form-field admin-form-field-full">
          <span>Descripción corta *</span>
          <textarea
            name="shortDescription"
            rows="3"
            value={values.shortDescription}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("shortDescription"))}
          />
          {getFieldError("shortDescription") && (
            <small className="admin-field-error">
              {getFieldError("shortDescription")}
            </small>
          )}
        </label>

        <label className="admin-form-field admin-form-field-full">
          <span>Descripción completa *</span>
          <textarea
            name="description"
            rows="6"
            value={values.description}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("description"))}
          />
          {getFieldError("description") && (
            <small className="admin-field-error">
              {getFieldError("description")}
            </small>
          )}
        </label>

        <label className="admin-form-field admin-form-field-full">
          <span>URL de la imagen *</span>
          <input
            type="url"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="https://example.com/astro.jpg"
            aria-invalid={Boolean(getFieldError("imageUrl"))}
          />
          {getFieldError("imageUrl") && (
            <small className="admin-field-error">
              {getFieldError("imageUrl")}
            </small>
          )}
        </label>

        <label className="admin-form-field">
          <span>Nombre científico</span>
          <input
            type="text"
            name="scientificName"
            value={values.scientificName}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("scientificName"))}
          />
          {getFieldError("scientificName") && (
            <small className="admin-field-error">
              {getFieldError("scientificName")}
            </small>
          )}
        </label>

        <label className="admin-form-field">
          <span>Distancia</span>
          <input
            type="text"
            name="distance"
            value={values.distance}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("distance"))}
          />
          {getFieldError("distance") && (
            <small className="admin-field-error">
              {getFieldError("distance")}
            </small>
          )}
        </label>

        <label className="admin-form-field admin-form-field-full">
          <span>Constelación</span>
          <input
            type="text"
            name="constellation"
            value={values.constellation}
            onChange={handleChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(getFieldError("constellation"))}
          />
          {getFieldError("constellation") && (
            <small className="admin-field-error">
              {getFieldError("constellation")}
            </small>
          )}
        </label>

        <label className="admin-active-control admin-form-field-full">
          <input
            type="checkbox"
            name="isActive"
            checked={values.isActive}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span>Astro activo y disponible en el catálogo público</span>
        </label>
        {getFieldError("isActive") && (
          <small className="admin-field-error admin-form-field-full">
            {getFieldError("isActive")}
          </small>
        )}
      </div>

      {submitError && (
        <p className="admin-form-submit-error" role="alert">
          {submitError}
        </p>
      )}

      <div className="admin-form-actions">
        <button
          type="button"
          className="admin-secondary-button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="admin-primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default AstroForm;
