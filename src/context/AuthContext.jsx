import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Get token from backend
      const token = response.data.token;

      if (!token) {
        throw new Error("Access token was not returned by the server.");
      }

      // Save token
      localStorage.setItem("token", token);

      // Get user information
      const loggedInUser = response.data.user;

      if (!loggedInUser) {
        throw new Error("User information was not returned by the server.");
      }

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      setUser(loggedInUser);

      return loggedInUser;

    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}