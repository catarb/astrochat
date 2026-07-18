import { getToken, removeToken } from "./token.storage";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/$/, "");

const UNAUTHORIZED_EVENT = "astrochat:unauthorized";

let unauthorizedHandled = false;

export class ApiError extends Error {
  constructor(message, status = 0, errors = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = Array.isArray(errors) ? errors : [];
  }
}

export const resetUnauthorizedHandling = () => {
  unauthorizedHandled = false;
};

const handleUnauthorized = () => {
  removeToken();

  if (!unauthorizedHandled) {
    unauthorizedHandled = true;
    window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
  }
};

export const subscribeToUnauthorized = (callback) => {
  window.addEventListener(UNAUTHORIZED_EVENT, callback);

  return () => window.removeEventListener(UNAUTHORIZED_EVENT, callback);
};

export const apiRequest = async (
  path,
  { method = "GET", body, authenticated = true, headers = {} } = {},
) => {
  const token = authenticated ? getToken() : null;
  const requestHeaders = { ...headers };

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: requestHeaders,
      body:
        body === undefined || body instanceof FormData
          ? body
          : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(
      "No se pudo conectar con el servidor. Intentá nuevamente.",
    );
  }

  const contentType = response.headers.get("content-type") || "";
  let responseData = null;

  if (contentType.includes("application/json")) {
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }
  }

  if (!response.ok) {
    if (response.status === 401 && authenticated) {
      handleUnauthorized();
    }

    throw new ApiError(
      responseData?.message || "No se pudo completar la solicitud.",
      response.status,
      responseData?.errors,
    );
  }

  return responseData;
};
