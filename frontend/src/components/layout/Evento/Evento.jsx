import React from "react";
import styles from "./Evento.module.css";
function Evento() {
  return (
    <section className={styles.conteiner_evento}>
      <div className={styles.infor}>
        <span>
          <h1>Nome</h1>
          <p>Data</p>
          <p>Local</p>
        </span>
        <span>
          <img src="" alt="LOGO DO EVENTO" />
        </span>
      </div>
      <div className={styles.descricao}>
        <span className={styles.description}>
          <h1>Descrição do eventos</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
            rerum voluptate a incidunt saepe, optio quam dolorem dolores neque
            similique natus velit? Earum sequi est omnis quidem ratione nesciunt
            tempora.
          </p>
        </span>
        <span>
            <h1>INGRESSOS</h1>
            <span>
                Comprei aqui 
            </span>
        </span>
      </div>
    </section>
  );
}

export default Evento;
