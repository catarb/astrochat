import { useCallback, useEffect, useMemo, useState } from "react";
import * as authService from "../services/auth.service";
import { subscribeToUnauthorized } from "../services/api";
import { getToken, removeLegacySession } from "../services/token.storage";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => getToken());
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const currentUser = await authService.getMe();
    setUser(currentUser);
    return currentUser;
  }, []);

  useEffect(() => subscribeToUnauthorized(clearSession), [clearSession]);

  useEffect(() => {
    let isActive = true;

    removeLegacySession();

    const restoreSession = async () => {
      if (!getToken()) {
        if (isActive) setIsLoading(false);
        return;
      }

      try {
        const currentUser = await authService.getMe();
        if (isActive) setUser(currentUser);
      } catch {
        if (isActive) setUser(null);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    restoreSession();

    return () => {
      isActive = false;
    };
  }, []);

  const login = useCallback(async (payload) => {
    const result = await authService.login(payload);
    setToken(result.token);
    setUser(result.user);
    return result;
  }, []);

  const register = useCallback(
    (payload) => authService.register(payload),
    [],
  );

  const logout = useCallback(() => {
    authService.logout();
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
