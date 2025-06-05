import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Carrosel.module.css";
import api from "../../../util/conn";

function Carrosel() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get("/eventos/allEventos");
        setEventos(response.data.message);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <Carousel
      className={`mt-5 mb-5 ${styles.carouselContainer}`}
      interval={3000}
    >
      {eventos.map((evento, i) => (
        <Carousel.Item key={evento.id}>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={`http://localhost:3001${evento.imagem}`}
            alt={`Slide ${i + 1}`}
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>{evento.Titulo}</h3>
            <p>{new Date(evento.Data).toLocaleDateString()}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrosel;
