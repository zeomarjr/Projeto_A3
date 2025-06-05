import React, { useState, useEffect } from "react";
import styles from "./Perfil.module.css";
import api from "../../../util/conn";

const Perfil = () => {
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dados, setDados] = useState({
    name: "",
    email: "",
    telefone: "",
    senha: "",
    confirmasenha: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(true); 

  const token = localStorage.getItem("token")?.replace(/"/g, "") || "";

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const res = await api.get(`/users/getUserProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;

        setDados({
          name: user.name || "",
          email: user.email || "",
          telefone: user.telefone || "",
          senha: "",
          confirmasenha: "",
        });

        if (user.foto) {
          setPreview(`http://localhost:3001${user.foto}`);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil", error);
        setMensagem("❌ Não foi possível carregar os dados.");
      } finally {
        setLoading(false); 
      }
    };

    carregarPerfil();
  }, [token]);

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dados.senha !== dados.confirmasenha) {
      return setMensagem("❌ As senhas não coincidem");
    }

    const formData = new FormData();
    formData.append("name", dados.name);
    formData.append("email", dados.email);
    formData.append("telefone", dados.telefone);
    if (dados.senha) formData.append("senha", dados.senha);
    if (imagem) formData.append("foto", imagem);

    try {
      await api.put(`/users/edit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMensagem("✅ Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMensagem("❌ Erro ao atualizar perfil");
    }
  };

  if (loading) {
    return <p className={styles.loading}>Carregando perfil...</p>;
  }

  return (
    <section className={styles.container_perfil}>
      <div className={styles.profileHeader}>
        <h1>Meu Perfil</h1>
        <div className={styles.imagePreview}>
          <img src={preview || "/default-user.png"} alt="Foto de perfil" />
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Foto de Perfil
          <input type="file" name="image" onChange={handleImagemChange} />
        </label>

        <label>
          Nome
          <input type="text" name="name" value={dados.name} onChange={handleChange} />
        </label>

        <label>
          E-mail
          <input type="email" name="email" value={dados.email} onChange={handleChange} />
        </label>

        <label>
          Telefone
          <input type="text" name="telefone" value={dados.telefone} onChange={handleChange} />
        </label>

        <label>
          Nova Senha
          <input type="password" name="senha" value={dados.senha} onChange={handleChange} />
        </label>

        <label>
          Confirmar Nova Senha
          <input type="password" name="confirmasenha" value={dados.confirmasenha} onChange={handleChange} />
        </label>

        {mensagem && <p>{mensagem}</p>}
        <button type="submit">Salvar</button>
      </form>
    </section>
  );
};

export default Perfil;
