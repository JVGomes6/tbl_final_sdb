const externalService = require('../services/external.service')

// GET /external/cep/:cep
async function getCep(req, res) {
  try {
    const endereco = await externalService.buscarCep(req.params.cep)

    res.status(200).json(endereco)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GET /external/tempo?lat=...&lon=...
async function getTempo(req, res) {
  try {
    const { lat, lon } = req.query

    if (!lat || !lon) {
      return res.status(400).json({
        message: 'Informe lat e lon na query'
      })
    }

    const tempo = await externalService.buscarTempo(lat, lon)

    res.status(200).json(tempo)
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar o tempo',
      error: error.message
    })
  }
}

// GET /external/posts
async function getPosts(req, res) {
  try {
    const posts = await externalService.listarPosts()

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar posts',
      error: error.message
    })
  }
}

module.exports = { getCep, getTempo, getPosts }