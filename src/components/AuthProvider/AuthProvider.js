import { createContext, useState } from "react";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [jwtToken, setJWTToken] = useState(
    () => window.sessionStorage.getItem('token')
  );

  return (
    <Context.Provider value={{jwtToken, setJWTToken}}>
      {children}
    </Context.Provider>
  );
};

export { AuthProvider, Context };