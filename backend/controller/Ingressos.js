import Ingressos from "../model/Ingresso.js";
import { v4 as uuidv4 } from "uuid";
import getToken from "../helpers/get-token.js";
import { verificarToken } from "../util/Token.js";

const CriarIngresso = async (req, res) => {
  try {
    const { eventoId } = req.body;
    const token = getToken(req);
    const { id: usuarioId } = await verificarToken(token);

    if (!eventoId) {
      return res.status(400).json({ message: "ID do evento é obrigatório." });
    }

    const ingressoExistente = await Ingressos.findOne({
      where: { usuarioId, eventoId },
    });

    if (ingressoExistente) {
      return res
        .status(400)
        .json({ message: "Você já garantiu ingresso para esse evento." });
    }

    const novoIngresso = await Ingressos.create({
      codigo: uuidv4(),
      status: "ativo",
      usuarioId,
      eventoId,
    });

    return res.status(201).json({
      message: "Ingresso criado com sucesso!",
      ingresso: novoIngresso,
    });
  } catch (error) {
    console.error("Erro ao criar ingresso:", error);
    return res.status(500).json({ message: "Erro interno ao criar ingresso." });
  }
};

const ListarIngressosDoUsuario = async (req, res) => {
  const token = getToken(req);
  const { id } = await verificarToken(token);

  try {
    const ingressos = await Ingressos.findAll({
      where: { usuarioID: id },
      include: ["evento"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ ingressos });
  } catch (error) {
    console.error("Erro ao listar ingressos:", error);
    return res.status(500).json({ message: "Erro ao listar ingressos." });
  }
};

const CancelarIngresso = async (req, res) => {
  try {
    const { id } = req.params;
    const token = getToken(req);
    const { id: usuarioId } = await verificarToken(token);

    const ingresso = await Ingressos.findOne({
      where: { id, usuarioId },
    });

    if (!ingresso) {
      return res
        .status(404)
        .json({ message: "Ingresso não encontrado ou não pertence a você." });
    }

    await ingresso.destroy(); 

    return res.status(200).json({ message: "Ingresso removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover ingresso:", error);
    return res.status(500).json({ message: "Erro ao remover ingresso." });
  }
};


export { CriarIngresso, ListarIngressosDoUsuario, CancelarIngresso };
