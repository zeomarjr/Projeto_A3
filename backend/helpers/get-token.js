const getToken = (req) => {
    const authHeader = req.headers.authorization;
   console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null; 
    }
  
    const token = authHeader.split(" ")[1];
    return token;
  };
  
  export default getToken;
  