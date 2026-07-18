import { ApiError, apiRequest } from "./api";

const normalizeAstro = (astro) => ({
  ...astro,
  id: astro._id || astro.id,
});

export const getAstros = async () => {
  const response = await apiRequest("/astros?limit=50&isActive=true");
  const astros = Array.isArray(response?.data)
    ? response.data
    : response?.data?.astros;

  if (!Array.isArray(astros)) {
    throw new ApiError("La respuesta de Astros no es válida.", 500);
  }

  return astros.map(normalizeAstro);
};

export const getAstroCatalog = async ({
  page = 1,
  limit = 50,
  search,
  type,
  isActive,
} = {}) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search?.trim()) query.set("search", search.trim());
  if (type) query.set("type", type);
  if (typeof isActive === "boolean") {
    query.set("isActive", String(isActive));
  }

  const response = await apiRequest(`/astros?${query.toString()}`);
  const astros = response?.data?.astros;
  const pagination = response?.data?.pagination;

  if (!Array.isArray(astros) || !pagination) {
    throw new ApiError("La respuesta del catálogo de Astros no es válida.", 500);
  }

  return {
    astros: astros.map(normalizeAstro),
    pagination,
  };
};

export const getAstroById = async (astroId) => {
  const response = await apiRequest(
    `/astros/${encodeURIComponent(astroId)}`,
  );
  const astro = response?.data?.astro;

  if (!astro) {
    throw new ApiError("La respuesta del Astro no es válida.", 500);
  }

  return normalizeAstro(astro);
};

export const createAstro = async (payload) => {
  const response = await apiRequest("/astros", {
    method: "POST",
    body: payload,
  });
  const astro = response?.data?.astro;

  if (!astro) {
    throw new ApiError("La respuesta del Astro creado no es válida.", 500);
  }

  return normalizeAstro(astro);
};

export const updateAstro = async (astroId, payload) => {
  const response = await apiRequest(
    `/astros/${encodeURIComponent(astroId)}`,
    {
      method: "PUT",
      body: payload,
    },
  );
  const astro = response?.data?.astro;

  if (!astro) {
    throw new ApiError("La respuesta del Astro actualizado no es válida.", 500);
  }

  return normalizeAstro(astro);
};

export const deleteAstro = async (astroId) => {
  const response = await apiRequest(
    `/astros/${encodeURIComponent(astroId)}`,
    { method: "DELETE" },
  );

  return {
    success: response?.success === true,
    message: response?.message || "Astro eliminado correctamente.",
  };
};
