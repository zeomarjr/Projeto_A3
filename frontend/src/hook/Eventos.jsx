import api from "../util/conn";
import { useState, useEffect } from "react";

export default function Eventos() {
  const [allEventos, setallEventos] = useState({ message: [] });
  const [MyEventos, seteMyEventos] = useState({ message: [] });
  const token = localStorage.getItem("token");

  const fetchAllEventos = async () => {
    const editToken = token ? token.replace(/"/g, "") : "";
    try {
      const res = await api.get("/eventos/allEventos", {
        headers: {
          Authorization: `Bearer ${editToken}`,
        },
      });
      setallEventos(res.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const fetchMyEventos = async () => {
    const editToken = token ? token.replace(/"/g, "") : "";
    try {
      const res = await api.get("/eventos/EventosUset", {
        headers: {
          Authorization: `Bearer ${editToken}`,
        },
      });
      seteMyEventos(res.data);
    } catch (error) {
      console.error("Erro ao buscar eventos do usuário:", error);
    }
  };

  useEffect(() => {
    fetchAllEventos();
    fetchMyEventos();
  }, [token]);

  const CriarEvento = async (dados, token) => {
    const editToken = token ? token.replace(/"/g, "") : "";
    try {
      const response = await api.post("/eventos/createEvento", dados, {
        headers: {
          Authorization: `Bearer ${editToken}`,
        },
      });

      await fetchMyEventos();

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return error.response.data;
      }
      return { error: "Erro desconhecido ao criar evento." };
    }
  };

  const AtualizarEvento = async (id, dados, token) => {
    const editToken = token ? token.replace(/"/g, "") : "";
    await api.put(`/eventos/editEvento/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${editToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    await fetchAllEventos();
    await fetchMyEventos();
  };

  const DeletarEvento = async (id, token) => {
    const editToken = token ? token.replace(/"/g, "") : "";
    await api.delete(`/eventos/DeletarEvento/${id}`, {
      headers: {
        Authorization: `Bearer ${editToken}`,
      },
    });
    await fetchAllEventos();
    await fetchMyEventos();
  };

  return {
    CriarEvento,
    AtualizarEvento,
    DeletarEvento,
    allEventos,
    MyEventos,
    fetchAllEventos,
    fetchMyEventos,
  };
}
