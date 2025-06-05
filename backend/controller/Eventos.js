import Eventos from "../model/Eventos.js";
import User from "../model/Usuario.js";
import Ingresso from '../model/Ingresso.js'
import getToken from "../helpers/get-token.js";
import { verificarToken } from "../util/Token.js";
import path from "path";

const CreateEvento = async (req, res) => {
  const { titulo, descricao, data, hora, endereco } = req.body;
  const token = getToken(req);

  if (!titulo || !descricao || !data || !hora) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos do evento corretamente." });
  }

  if (!endereco) {
    return res.status(400).json({ error: "Endereço é obrigatório." });
  }

  const { id } = await verificarToken(token);

  const usuarioExist = await User.findOne({ where: { id } });
  if (!usuarioExist) {
    return res.status(400).json({ error: "Usuário não existe." });
  }

  const eventoExist = await Eventos.findOne({
    where: {
      Titulo: titulo,
      Data: data,
    },
  });

  if (eventoExist) {
    return res.status(400).json({ error: "Evento já existe nessa data." });
  }

  try {
    const imagem = req.file ? `/uploads/${req.file.filename}` : null;

    await Eventos.create({
      Usuario: id,
      Titulo: titulo,
      Descricao: descricao,
      Data: data,
      Hora: hora,
      Endereco: JSON.parse(endereco),
      imagem,
    });

    return res.status(201).json({ message: "Evento criado com sucesso!" });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
};

const BuscarAll = async (req, res) => {
  const eventos = await Eventos.findAll();
  return res.status(200).json({ message: eventos });
};
const EventosUset = async (req, res) => {
  const token = getToken(req);

  const { id } = await verificarToken(token);

  try {
    const eventos = await Eventos.findAll({ where: { Usuario: id } });

    res.status(200).json({ message: eventos });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const EventosId = async (req, res) => {
  const { id: eventoId } = req.params;
  const token = getToken(req);
  const Evento = await Eventos.findOne({ where: { id: eventoId } });
  const user = await User.findOne({
    where: { id: Evento.dataValues.Usuario },
    attributes: ["name"],
  });

  try {
    return res.status(200).json({ message: { Evento, user } });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getEventos = async (req, res) => {
  const { id: eventoId } = req.params;
  try {
    const Evento = await Eventos.findOne({ where: { id: eventoId } });
    return res.status(200).json({ message: { Evento } });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const EditarEvento = async (req, res) => {
  const { id: eventoId } = req.params;
  const { titulo, descricao, data, hora, endereco } = req.body;
  const token = getToken(req);

  if (!titulo || !descricao || !data || !hora) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos obrigatórios." });
  }

  try {
    const { id: usuarioId } = await verificarToken(token);

    const evento = await Eventos.findOne({ where: { id: eventoId } });

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }

    console.log(evento.Usuario);
    console.log(usuarioId);
    if (String(evento.Usuario) !== String(usuarioId)) {
      return res.status(403).json({ error: "Ação não autorizada." });
    }

    const novaImagem = req.file
      ? `/uploads/${req.file.filename}`
      : evento.imagem;

    await evento.update({
      Titulo: titulo,
      Descricao: descricao,
      Data: data,
      Hora: hora,
      Endereco: JSON.parse(endereco),
      imagem: novaImagem,
    });

    return res.status(200).json({ message: "Evento atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao editar evento:", error);
    return res
      .status(500)
      .json({ error: "Erro no servidor ao editar evento." });
  }
};
const DeletarEvento = async (req, res) => {
  const { id: eventoId } = req.params;
  const token = getToken(req);

  try {
    const { id: usuarioId } = await verificarToken(token);

    const evento = await Eventos.findOne({ where: { id: eventoId } });

    if (!evento) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }

    if (String(evento.Usuario) !== String(usuarioId)) {
      return res.status(403).json({ error: "Ação não autorizada." });
    }

    await Ingresso.destroy({ where: { eventoId: eventoId } });

    await evento.destroy();

    return res.status(200).json({ message: "Evento e ingressos excluídos com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    return res.status(500).json({ error: "Erro no servidor ao deletar evento." });
  }
};

export {
  CreateEvento,
  BuscarAll,
  EventosUset,
  EventosId,
  getEventos,
  EditarEvento,
  DeletarEvento
};
