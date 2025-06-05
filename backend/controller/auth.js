import User from "../model/Usuario.js";
import { criarToken, verificarToken } from "../util/Token.js";
import { criarHashSenha, verificarSenha } from "../util/Senha.js";
import getToken from "../helpers/get-token.js";

const CreateUser = async (req, res) => {
  try {
    const { name, email, confirmasenha, senha, telefone } = req.body;

    if (!name || !email || !confirmasenha || !senha || !telefone) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }
    const verificarEmail = await User.findOne({ where: { email } });

    if (verificarEmail) {
      return res.status(400).json({ errorr: "E-mail já existe" });
    }
    const hash = await criarHashSenha(senha);

    const user = await User.create({
      name,
      email,
      senha: hash,
      telefone,
    });
    const token = await criarToken(user);

    res.status(201).json({ message: "Usuário criado com sucesso!", token });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro no servidor." });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaValida = await verificarSenha(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = await criarToken(user);

    return res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, telefone, senha } = req.body;

    const token = getToken(req);
    const { id } = await verificarToken(token);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (req.file) {
      user.foto = `/uploads/${req.file.filename}`;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.telefone = telefone || user.telefone;

    if (senha) {
      user.senha = await criarHashSenha(senha);
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar o usuário" });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const token = getToken(req);
    const { id } = await verificarToken(token);

    const user = await User.findByPk(id, {
      attributes: { exclude: ["senha"] }, 
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    return res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
  }
};

export { CreateUser, login, updateUser,getUserProfile };
