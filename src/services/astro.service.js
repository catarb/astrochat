import { ApiError, apiRequest } from "./api";

export const getAstros = async () => {
  const response = await apiRequest("/astros?limit=50&isActive=true");
  const astros = Array.isArray(response?.data)
    ? response.data
    : response?.data?.astros;

  if (!Array.isArray(astros)) {
    throw new ApiError("La respuesta de Astros no es válida.", 500);
  }

  return astros.map((astro) => ({
    ...astro,
    id: astro._id || astro.id,
  }));
};
