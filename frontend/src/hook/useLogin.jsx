import { useState, useEffect } from "react";
import api from "../util/conn";
import { useNavigate } from "react-router-dom";

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);
  async function autheticar(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  const criarUsuario = async (dados) => {
    try {
      const res = await api.post("users/criar", dados);
      console.log(dados)
      autheticar(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (dados) => {
    try {
      const res = await api.post("users/login", dados);
      autheticar(res.data);
      navigate("/");
      return true; 
    } catch (error) {
      console.log(error);
      return false; 
    }
  };

  const sair = ()=>{
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/");
  }
  return {
    authenticated,
    login,
    criarUsuario,
    sair
  };
}
