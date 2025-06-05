import axios from 'axios'
export default async function BuscarCEp(cep){
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        console.log(response.data)
        return response.data
    } catch (error) {
            console.error('Erro ao buscar CEP:', error);

    }
}

