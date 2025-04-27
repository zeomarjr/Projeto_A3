import { createContext } from "react";
import useAuth from "../hook/useLogin";

const Context = createContext();

function UserProvider({ children }) {
  const auth = useAuth();

  return (
    <Context.Provider value={auth}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
