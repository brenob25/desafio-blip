const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para buscar os 5 repositórios mais antigos da organização 'takenet' no GitHub
app.get('/github/takenet/repositories', async (req, res) => {
    try {
        // Endpoint da API pública do GitHub para obter os repositórios da organização 'takenet'
        const url = 'https://api.github.com/orgs/takenet/repos?type=all&q=sort%3Aupdated-asc';
        
        // Realiza a requisição GET para o GitHub API
        const response = await axios.get(url);
        
        // Obtém os dados JSON da resposta
        const repositories = response.data;
        
        // Ordena os repositórios pelo campo 'updated_at' (data de atualização)
        const sortedRepositories = repositories.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        
        // Seleciona os 5 repositórios mais antigos
        const oldestRepositories = sortedRepositories.slice(0, 5);
        
        // Retorna os dados dos 5 repositórios mais antigos em formato JSON
        res.json(oldestRepositories);
    } catch (error) {
        // Retorna uma mensagem de erro caso ocorra algum problema na requisição
        res.status(500).json({ error: 'Erro ao buscar os repositórios' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
