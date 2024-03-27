import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Initialize accessFeatures from localStorage
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
    // Persist accessFeatures changes to localStorage
    localStorage.setItem("accessFeatures", JSON.stringify(accessFeatures));
  }, [accessFeatures]);

  const login = (userData, token) => {
    setUser(userData);
    console.log("Logged in user data:", userData);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
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
