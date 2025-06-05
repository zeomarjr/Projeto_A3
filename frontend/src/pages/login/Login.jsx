import styles from "./LoginModal.module.css";
import { useState, useContext } from "react";
import { Context } from "../../context/context";

const Login = ({ onClose }) => {
  const [tela, setTela] = useState("login");
  const { login, criarUsuario, loading, erro, authenticated } = useContext(Context);

  const [user, setUser] = useState({
    name: "",
    email: "",
    senha: "",
    confirmasenha: "",
    telefone: "",
  });

  const handleValue = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados =
      tela === "login" ? { email: user.email, senha: user.senha } : user;

    const success =
      tela === "login" ? await login(dados) : await criarUsuario(dados);
    if (success) {
      onClose();
    }
  };

  return (
    <>
      {!authenticated && (
        <section className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={onClose}>
              ×
            </button>

            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className={styles.title}>
                {tela === "login" ? "LOGIN" : "CADASTRO"}
              </h2>

              {tela === "criar" && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    value={user.name}
                    onChange={handleValue}
                    required
                  />
                  <input
                    type="text"
                    name="telefone"
                    placeholder="Digite seu telefone"
                    value={user.telefone}
                    onChange={handleValue}
                    required
                  />
                  <input
                    type="password"
                    name="confirmasenha"
                    placeholder="Digite confirmar senha"
                    value={user.confirmasenha}
                    onChange={handleValue}
                    required
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="Digite seu e-mail"
                value={user.email}
                onChange={handleValue}
                required
              />
              <input
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={user.senha}
                onChange={handleValue}
                required
              />

              {erro && <p className={styles.error}>{erro}</p>}

              <button type="submit" disabled={loading}>
                {loading
                  ? tela === "login"
                    ? "Entrando..."
                    : "Cadastrando..."
                  : tela === "login"
                  ? "Continuar com Email"
                  : "Criar conta"}
              </button>
            </form>

            <p className={styles.footer}>
              {tela === "login" ? (
                <>
                  Não possui uma conta?{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setTela("criar")}
                  >
                    Cadastre-se
                  </button>
                </>
              ) : (
                <>
                  Já possui uma conta?{" "}
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setTela("login")}
                  >
                    Entrar
                  </button>
                </>
              )}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
