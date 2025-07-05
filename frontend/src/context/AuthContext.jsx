import { createContext, useState, useContext, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const buttonRef = useRef(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthModalVisible,
        setIsAuthModalVisible,
        authMode,
        setAuthMode,
        buttonRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
