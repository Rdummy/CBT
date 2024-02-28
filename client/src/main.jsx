import React, { createContext, useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.css";
import { AuthProvider } from "./contexts/auth-context.jsx";

const CustomContext = createContext({
  examId: 0,
  setExamId: () => {},
  token: 0,
  setToken: () => {},
});

// create new context provider
const CustomContextProvider = ({ children }) => {
  const [examId, setExamId] = useState(0);
  return (
    <CustomContext.Provider value={{ examId, setExamId }}>
      {children}
    </CustomContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CustomContextProvider>
  </React.StrictMode>
);

export const useCustomContext = () => useContext(CustomContext);
