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
        titulo: filme.title,
        ano: filme.release_date ? filme.release_date.slice(0, 4) : null,
        nota: Number(filme.vote_average.toFixed(1)),
        poster: filme.poster_path ? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null
    }
}

const simplificarProvedores = (provedores) => {
    return (provedores || []).map(provedor => ({
        nome: provedor.provider_name,
        logo: `https://image.tmdb.org/t/p/w92${provedor.logo_path}`
    }))
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
            mensagem: 'Não foi possível consultar o catálogo de filmes.'
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

app.get('/filme', async (req, res) => {
    const id = req.query.id

    if (!id){
        return res.status(400).json({
            mensagem: 'Informe o id do filme.'
        })
    }

    try {
        const resposta = await tmdbClient.get(`/movie/${id}`, {
            params : {
                append_to_response: 'watch/providers'
            }
        })
        const filme = resposta.data
        const provedoresBR = filme['watch/providers']?.results?.BR
        const detalhes = {
            ...simplificarFilme(filme),
            duracao: filme.runtime || null,
            generos: filme.genres.map(genero => genero.name),
            sinopse: filme.overview || null,
            fundo: filme.backdrop_path ? `https://image.tmdb.org/t/p/w780${filme.backdrop_path}` : null,

            ondeAssistir: {
                assinatura: simplificarProvedores(provedoresBR?.flatrate),
                aluguel: simplificarProvedores(provedoresBR?.rent),
                compra: simplificarProvedores(provedoresBR?.buy)
            }
        }
        res.json(detalhes)

    } catch (erro){
        console.log(erro.message)

        if (erro.response?.status === 404) {
            return res.status(404).json({
                mensagem: 'Filme não encontrado.'
            })
        }

        res.status(502).json({
            mensagem: 'Não foi possível consultar o catálogo de filmes.'
        })
    }
})

const port = 3000
app.listen(port, () => console.log(`Backend do OndePassa no ar. Porta: ${port}.`))