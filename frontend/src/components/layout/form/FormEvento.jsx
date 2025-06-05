import React, { useState, useEffect } from "react";
import styles from "./CriarEventos.module.css";
import BuscarCep from "../../../util/Cep";

const FormEvento = ({ eventoData = {}, onSubmit }) => {
  const [imagem, setImagem] = useState(null);
  const [cep, setCep] = useState(eventoData?.Endereco?.cep || "");
  const [endereco, setEndereco] = useState(eventoData?.Endereco || null);
  const [eventos, setEventos] = useState({
    titulo: eventoData?.Titulo || "",
    descricao: eventoData?.Descricao || "",
    data: eventoData?.Data || "",
    hora: eventoData?.Hora || "",
  });

  useEffect(() => {
    if (eventoData?.id) {
      setEventos({
        titulo: eventoData?.Titulo || "",
        descricao: eventoData?.Descricao || "",
        data: eventoData?.Data || "",
        hora: eventoData?.Hora || "",
      });
      setCep(eventoData?.Endereco?.cep || "");
      setEndereco(eventoData?.Endereco || null);
    }
  }, [eventoData?.id]);

  useEffect(() => {
    if (cep.length === 8) {
      BuscarCep(cep).then((data) => setEndereco(data));
    }
  }, [cep]);

  const handleEventos = (e) => {
    setEventos({ ...eventos, [e.target.name]: e.target.value });
  };

  const handleCep = (e) => {
    setCep(e.target.value);
  };

  const handleImagem = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("titulo", eventos.titulo);
    formData.append("descricao", eventos.descricao);
    formData.append("data", eventos.data);
    formData.append("hora", eventos.hora);

    formData.append(
      "endereco",
      JSON.stringify({
        cep: cep,
        logradouro: endereco?.logradouro,
        bairro: endereco?.bairro,
        localidade: endereco?.localidade,
        uf: endereco?.uf,
      })
    );

    if (imagem instanceof File) {
      formData.append("imagem", imagem);
    }

    onSubmit(formData); // Envia para o pai
  };

  return (
    <section className={styles.container}>
      <div className={styles.formBox}>
        <h2>{eventoData?.id ? "Editar Evento" : "Criar Novo Evento"}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Título do Evento
            <input
              type="text"
              placeholder="Ex: Reunião de equipe"
              name="titulo"
              value={eventos.titulo}
              onChange={handleEventos}
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              placeholder="Descreva os detalhes do evento..."
              rows={6}
              name="descricao"
              value={eventos.descricao}
              onChange={handleEventos}
              required
            />
          </label>

          <div className={styles.rowColumn}>
            <label>
              Data
              <input
                type="date"
                name="data"
                value={eventos.data}
                onChange={handleEventos}
                required
              />
            </label>

            <label>
              Horário
              <input
                type="time"
                name="hora"
                value={eventos.hora}
                onChange={handleEventos}
                required
              />
            </label>

            <label>
              Local (CEP)
              <input
                type="text"
                placeholder="Digite o CEP"
                className={styles.cepInput}
                onChange={handleCep}
                value={cep}
                required
              />
              {endereco && endereco.cep && (
                <div className={styles.endereco}>
                  <p>
                    {endereco.logradouro}, {endereco.bairro} -{" "}
                    {endereco.localidade}/{endereco.uf}
                  </p>
                </div>
              )}
            </label>
          </div>

          <label>
            Imagem do Evento
            <input type="file" accept="image/*" onChange={handleImagem} />
          </label>

          <button type="submit">
            {eventoData?.id ? "Salvar Alterações" : "Criar Evento"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FormEvento;
