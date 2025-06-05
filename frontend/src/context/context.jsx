import { createContext, useContext } from "react";
import useAuth from "../hook/useLogin";
import Eventos from "../hook/Eventos";

const Context = createContext();

function UserProvider({ children }) {
  const { login, criarUsuario, authenticated, sair } = useAuth();
  const {
    CriarEvento,
    AtualizarEvento,
    DeletarEvento,
    allEventos,
    MyEventos,
    fetchAllEventos,
    fetchMyEventos,
  } = Eventos();

  return (
    <Context.Provider
      value={{
        login,
        criarUsuario,
        authenticated,
        sair,
        CriarEvento,
        AtualizarEvento,
        DeletarEvento,
        allEventos,
        MyEventos,
        fetchAllEventos,
        fetchMyEventos,
      }}
    >
      {children}
    </Context.Provider>
  );
}

const useUser = () => useContext(Context);

export { Context, UserProvider, useUser };
