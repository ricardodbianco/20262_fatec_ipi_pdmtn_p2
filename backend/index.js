require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
    },
    params: {
        language: 'pt-BR'
    }
})

const simplificarFilme = (filme) => {
    return {
        id: filme.id,
        titulo: filme.tittle,
        ano: filme.release_date ? filme.release_date.slice(0, 4) : null,
        nota: Number(filme.vote_average.toFixed(1)),
        poster: filme.poster_path ? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null
    }
}

app.get('/', (req,res) => {
    res.json({
        "app": "OndePassa", 
        "status": "online"
    })
})

app.get('/em-alta', async (req, res) =>{
    try{
        const resposta = await tmdbClient.get('/trending/movie/week')
        const filmes = resposta.data.results.map(simplificarFilme)
        res.json(filmes)

    } catch(erro){
        console.log(erro.message)
        res.status(502).json({
            mensagem: 'Não foi possivél consultar o catálogo de filmes.'
        })
    }
})

app.get('/filmes', async (req, res) => {
    const busca = req.query.busca

    if (!busca || !busca.trim()) {
        return res.status(400).json({
            mensagem: 'Informe o título de um filme.'
        })
    }

    const termo = busca.trim()
    console.log(`Busca: ${termo}`)

    try {
        const resposta = await tmdbClient.get('/search/movie', {
            params: {
                query: termo,
                include_adult: false
            }
        })

        const filmes = resposta.data.results.map(simplificarFilme)
        res.json(filmes)

    } catch (erro) {
        console.log(erro.message)

        res.status(502).json({
            mensagem: 'Não foi possível consultar o catálogo de filmes.'
        })
    }
})

const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))