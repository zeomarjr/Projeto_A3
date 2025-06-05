import React, { useContext, useState } from "react";
import styles from "./CriarEventos.module.css";
import { Context } from "../../../context/context";
import FormEvento from "../form/FormEvento";

const CriarEventos = () => {
  const { CriarEvento } = useContext(Context);
  const [mensagem, setMensagem] = useState("");
  const [limparFormulario, setLimparFormulario] = useState(false);

  const handleSubmit = async (dados) => {
    const token = localStorage.getItem("token");
    const response = await CriarEvento(dados, token);

    if (response.message) {
      setMensagem(response.message);
      setLimparFormulario(true);
      setTimeout(() => setMensagem(""), 4000);
    } else if (response.error) {
      setMensagem(response.error);
      setTimeout(() => setMensagem(""), 4000);
    }
  };

  return (
    <section className={styles.container}>
      {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
      <FormEvento
        onSubmit={handleSubmit}
        limpar={limparFormulario}
        setLimpar={setLimparFormulario}
      />
    </section>
  );
};

export default CriarEventos;
