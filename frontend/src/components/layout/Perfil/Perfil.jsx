import React from "react";
import styles from './Perfil.module.css'
const Perfil = () => {
  return (
    <section className={styles.container_perfil}>
      <div>
        <h1>Perfil</h1>
        <img src="" alt="FOTO" />
      </div>
      <form>
        <input text="imagem" type="file" name="image" />
        <input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
        />
        <input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
        />

        <input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
        />
        <input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite o sua senha"
        />
        <input
          text="Confirmação de Senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme sua senha"
        />
        <input type="submit" value="editar" />
      </form>
    </section>
  );
};

export default Perfil;
