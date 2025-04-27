import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/' // ou a URL da sua API real
});
