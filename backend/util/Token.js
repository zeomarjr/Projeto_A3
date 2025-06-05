import { SignJWT, jwtDecrypt, jwtVerify } from "jose";

async function criarToken(usuario) {
  const secret = new TextEncoder().encode("minha-chave-secreta");

  const jwt = await new SignJWT({ id: usuario.id, email: usuario.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return jwt;
}

async function verificarToken(token) {
  const secret = new TextEncoder().encode("minha-chave-secreta");

  try {
    const {payload} = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("Token inválido ou expirado:", err);
    return null;
  }
}


export { verificarToken, criarToken };
