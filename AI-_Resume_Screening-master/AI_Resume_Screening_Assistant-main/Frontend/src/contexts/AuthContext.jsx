import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  ======================================================
  Load Logged In User
  ======================================================
  */

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token =
      localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const currentUser =
        await authService.getCurrentUser();

      setUser(currentUser);
    } catch (error) {
      console.error(error);

      authService.logout();

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /*
  ======================================================
  Login
  ======================================================
  */

  const login = async (
    email,
    password
  ) => {
    try {
      const data =
        await authService.login(
          email,
          password
        );

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      const currentUser =
        await authService.getCurrentUser();

      localStorage.setItem(
        "user",
        JSON.stringify(currentUser)
      );

      setUser(currentUser);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.detail ||
          "Login failed",
      };
    }
  };

  /*
  ======================================================
  Register
  ======================================================
  */

  const register = async (
    userData
  ) => {
    try {
      await authService.register(
        userData
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.detail ||
          "Registration failed",
      };
    }
  };

  /*
  ======================================================
  Logout
  ======================================================
  */

  const logout = () => {
    authService.logout();

    localStorage.clear();

    setUser(null);
  };

  /*
  ======================================================
  Values
  ======================================================
  */

  const value = {
    user,

    loading,

    login,

    register,

    logout,

    isAuthenticated:
      !!user,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
======================================================
Custom Hook
======================================================
*/

export function useAuth() {
  return useContext(AuthContext);
}