import React, {useContext} from "react";
import Card from "../Cards/Card";
import sytle from './MyEventos.module.css'
import { Context } from "../../../context/context";
const MyEventos = () => {
  const {MyEventos} = useContext(Context)
  return (
    <section className={sytle.container_myeventos}>
        <h1>Meus Eventos</h1>
      <Card evento = {MyEventos}  mostrarBotao={true} />
    </section>
  );
};

export default MyEventos;
