const cheapsharkService = require('../services/cheapshark.service')

// GET /cheapshark/games/:title
async function getGames(req, res) {
  try {
    const { title } = req.params

    const games = await cheapsharkService.buscarJogos(title)

    if (!games || games.length === 0) {
      return res.status(404).json({
        message: 'Nenhum jogo encontrado'
      })
    }

    return res.status(200).json(games)
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar jogos na CheapShark',
      error: error.message
    })
  }
}

module.exports = {
  getGames
}