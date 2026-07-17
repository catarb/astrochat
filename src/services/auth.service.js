import {
  ApiError,
  apiRequest,
  resetUnauthorizedHandling,
} from "./api";
import { removeToken, setToken } from "./token.storage";

export const register = async (payload) => {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: payload,
    authenticated: false,
  });

  return {
    user: response?.data?.user,
    message: response?.message,
  };
};

export const login = async (payload) => {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: payload,
    authenticated: false,
  });
  const token = response?.data?.token;
  const user = response?.data?.user;

  if (!token || !user) {
    throw new ApiError("La respuesta de inicio de sesión no es válida.", 500);
  }

  setToken(token);
  resetUnauthorizedHandling();

  return {
    token,
    user,
    message: response?.message,
  };
};

export const getMe = async () => {
  const response = await apiRequest("/auth/me");

  return response?.data?.user;
};

export const logout = () => {
  removeToken();
};
