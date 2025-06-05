import { createContext, useContext } from "react";
import useEventos from "../hook/Eventos"; 
const EventosContext = createContext();

export const EventosProvider = ({ children }) => {
  const eventoData = useEventos();
  return (
    <EventosContext.Provider value={eventoData}>
      {children}
    </EventosContext.Provider>
  );
};

export const useEventosContext = () => useContext(EventosContext);
