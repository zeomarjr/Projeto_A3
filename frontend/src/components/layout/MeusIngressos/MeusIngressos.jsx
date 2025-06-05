import React, { useEffect, useState } from "react";
import styles from "./MeusIngressos.module.css";
import api from "../../../util/conn";

const MeusIngressos = () => {
  const [ingressos, setIngressos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const carregarIngressos = async () => {
    try {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      const response = await api.get("/ingressos/meus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIngressos(response.data.ingressos);
    } catch (error) {
      console.error("Erro ao buscar ingressos:", error);
    }
  };

  const cancelarIngresso = async (id) => {
    try {
      const token = localStorage.getItem("token")?.replace(/"/g, "");
      await api.patch(`/ingressos/cancelar/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMensagem("Ingresso cancelado com sucesso!");
      carregarIngressos(); 
    } catch (error) {
      console.error("Erro ao cancelar ingresso:", error);
      setMensagem("Erro ao cancelar ingresso.");
    }
  };

  useEffect(() => {
    carregarIngressos();
  }, []);

  return (
    <section className={styles.container}>
      <h1>Meus Ingressos</h1>
      {mensagem && <p className={styles.message}>{mensagem}</p>}

      {ingressos.length === 0 ? (
        <p>Você ainda não possui ingressos.</p>
      ) : (
        <ul className={styles.lista}>
          {ingressos.map((ingresso) => (
            <li key={ingresso.id} className={styles.ingresso}>
              <h3>{ingresso.evento?.Titulo}</h3>
              <p><strong>Data:</strong> {new Date(ingresso.evento?.Data).toLocaleDateString()} - {ingresso.evento?.Hora}</p>
              <p><strong>Local:</strong> {ingresso.evento?.Endereco?.localidade} - {ingresso.evento?.Endereco?.uf}</p>
              <p><strong>Status:</strong> {ingresso.status}</p>
              {ingresso.status !== "cancelado" && (
                <button
                  className={styles.cancelar}
                  onClick={() => cancelarIngresso(ingresso.id)}
                >
                  Cancelar ingresso
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MeusIngressos;
