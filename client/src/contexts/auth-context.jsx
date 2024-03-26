import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // `user` now holds `userData` including `user_type`
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function updates the state with user data and authentication token
  const login = (userData, token) => {
    setUser(userData); // Assumes `userData` includes `user_type` among other details
    setToken(token);
    setIsAuthenticated(true);
  };

  // Logout function clears the authentication state
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Checks if the currently logged-in user is an admin
  const isAdmin = () => {
    // Log the current user object
    return true; // Temporarily return true to test the Sidebar rendering
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        isAdmin, // Function to check if the user is an admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
