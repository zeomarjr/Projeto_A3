import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/context"; 
 
const Card = ({ evento, mostrarBotao }) => {
  const navigate = useNavigate();
  const { DeletarEvento } = useUser();

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este evento?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await DeletarEvento(id, token);
      alert("Evento excluído com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Erro ao excluir evento.");
    }
  };

  return (
    <section className={styles.container_card}>
      {evento?.message ? (
        evento.message.map((evento) => (
          <div key={evento.id} className={styles.card}>
            <Link to={`/detalis/${evento.id}`}>
              <img
                src={`http://localhost:3001${evento.imagem}`}
                alt="Logo do evento"
              />
              <div className={styles.info}>
                <h3>{evento.Titulo}</h3>
                <p>Data: {new Date(evento.Data).toLocaleDateString()}</p>
                <p>
                  {evento.Endereco.localidade} - {evento.Endereco.uf}
                </p>
              </div>
            </Link>

            {mostrarBotao && (
              <>
                <Link className={styles.botao} to={`/edit/${evento.id}`}>
                  Editar
                </Link>
                <button
                  className={styles.botao}
                  onClick={() => handleDelete(evento.id)}
                >
                  Excluir
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <>Sem nenhum evento</>
      )}
    </section>
  );
};

export default Card;
