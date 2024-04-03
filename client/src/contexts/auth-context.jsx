import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load the user and token from localStorage
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const initialToken = localStorage.getItem("token");

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);
  const [isAuthenticated, setIsAuthenticated] = useState(!!initialToken);
  const [accessFeatures, setAccessFeatures] = useState(() => {
    const savedFeatures = localStorage.getItem("accessFeatures");
    return savedFeatures
      ? JSON.parse(savedFeatures)
      : {
          allowEditContent: false,
          allowDeleteExam: false,
          allowAddCreateExam: false,
          allowCreateContent: false,
        };
  });

  useEffect(() => {
    // Persist user and token changes to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }, [user, token]);

  useEffect(() => {
    // Persist accessFeatures changes to localStorage
    localStorage.setItem("accessFeatures", JSON.stringify(accessFeatures));
  }, [accessFeatures]);

  const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // Clear user and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAdmin = () => {
    return user?.user_type === "admin" || user?.user_type === "co-admin";
  };

  const updateAccessFeatures = (features) => {
    setAccessFeatures(features);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        isAdmin,
        accessFeatures,
        updateAccessFeatures,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
