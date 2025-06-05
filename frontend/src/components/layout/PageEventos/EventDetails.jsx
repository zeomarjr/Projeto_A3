import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../util/conn";
import styles from "./PageEventos.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      const token = localStorage.getItem("token");
      const editToken = token ? token.replace(/"/g, "") : "";
      try {
        const response = await api.get(`/eventos/EventosId/${id}`, {
          headers: {
            Authorization: `Bearer ${editToken}`,
          },
        });
        setEvento(response.data.message);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      }
    };
    fetchEvento();
  }, [id]);

  const handleComprarIngresso = async () => {
    const token = localStorage.getItem("token");
    const editToken = token ? token.replace(/"/g, "") : "";

    setLoading(true);
    setMensagem("");

    try {
      const response = await api.post(
        "/ingressos/comprar",
        { eventoId: evento.Evento.id },
        {
          headers: {
            Authorization: `Bearer ${editToken}`,
          },
        }
      );
      setMensagem("🎉 Ingresso garantido com sucesso!");
    } catch (error) {
      console.error("Erro ao garantir ingresso:", error);
      setMensagem("❌ Não foi possível garantir o ingresso.");
    } finally {
      setLoading(false);
    }
  };

  if (!evento) {
    return <p className={styles.info}>Carregando evento...</p>;
  }

  const {
    Evento: { Titulo, Descricao, Data, Hora, Endereco, imagem },
    user: { name },
  } = evento;

  const enderecoCompleto = `${Endereco.logradouro}, ${Endereco.bairro}, ${Endereco.localidade} - ${Endereco.uf}`;
  const imagemUrl = imagem ? `http://localhost:3001${imagem}` : "https://placehold.co/600x300";

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img
          src={imagemUrl}
          alt="Imagem do evento"
          className={styles.bannerImage}
        />
      </div>

      <h1 className={styles.title}>{Titulo}</h1>
      <p className={styles.info}>📍 Local: {enderecoCompleto}</p>
      <p className={styles.info}>
        📅 Data: {new Date(Data).toLocaleDateString()} - {Hora}
      </p>

      <button
        className={styles.button}
        onClick={handleComprarIngresso}
        disabled={loading}
      >
        {loading ? "Processando..." : "Garantir ingresso"}
      </button>

      {mensagem && <p className={styles.info}>{mensagem}</p>}

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Descrição do Evento</h2>
        <p className={styles.text}>{Descricao}</p>
      </div>

      <div className={`${styles.section} ${styles.divider}`}>
        <h2 className={styles.subtitle}>Organizador</h2>
        <p className={styles.text}>Usuário: {name}</p>
      </div>
    </div>
  );
};

export default EventDetails;
