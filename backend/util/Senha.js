import argon2 from "argon2";

async function criarHashSenha(senha) {
  try {
    const hash = await argon2.hash(senha);
    console.log("Hash da senha:", hash); 
    return hash;
  } catch (err) {
    console.error("Erro ao criar hash:", err);
  }
}

async function verificarSenha(senha, hash) {
  try {
    const isValid = await argon2.verify(hash, senha);  
    console.log("Senha válida:", isValid);
    return isValid;
  } catch (err) {
    console.error("Erro ao verificar a senha:", err);
  }
}

export { criarHashSenha, verificarSenha };
