import React, { useContext, useEffect, useState } from "react";
import styles from "./EditarEventos.module.css";
import { Context } from "../../../context/context";
import FormEvento from "../form/FormEvento";
import { useParams } from "react-router-dom";
import api from "../../../util/conn";

const EditarEventos = () => {
  const { AtualizarEvento } = useContext(Context); 
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const token = localStorage.getItem("token")?.replace(/"/g, "") || "";

        const response = await api.get(`/eventos/getEventos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEvento(response.data.message.Evento);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
      }
    };

    fetchEvento();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      await AtualizarEvento(id, formData, token);

      setMensagem("✅ Evento atualizado com sucesso!");
      setResetForm(true);

      setTimeout(() => {
        setMensagem("");
        setResetForm(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      setMensagem("❌ Erro ao atualizar evento.");
    }
  };

  if (!evento) {
    return <p>Carregando...</p>;
  }

  return (
    <section className={styles.container}>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      <FormEvento key={resetForm} eventoData={evento} onSubmit={handleSubmit} />
    </section>
  );
};

export default EditarEventos;
