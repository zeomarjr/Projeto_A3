import React from "react";
import Card from "../Cards/Card";
import sytle from './MyEventos.module.css'
const MyEventos = () => {
  return (
    <section className={sytle.container_myeventos}>
        <h1>Meus Eventos</h1>
      <Card />
    </section>
  );
};

export default MyEventos;
