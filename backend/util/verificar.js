import { jwtVerify } from 'jose';
import getToken from '../helpers/get-token.js'; 

const checkToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    const token = getToken(req);

    if (!token) {
        return res.status(401).json({ message: "Acesso Negado!" });
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode('minha-chave-secreta'));
        req.user = payload; 
        next(); 
    } catch (error) {
        return res.status(400).json({ message: "Token inválido" });
    }
};

export default checkToken;
