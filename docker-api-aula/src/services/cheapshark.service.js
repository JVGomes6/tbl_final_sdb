const axios = require('axios')
const Game = require('../models/game.model')

async function buscarJogos(title) {
  const response = await axios.get('https://www.cheapshark.com/api/1.0/games', {
    params: { title }
  })

  const games = response.data || []

  const saved = []

  for (const g of games) {
    const doc = {
      gameID: g.gameID,
      steamAppID: g.steamAppID || null,
      cheapest: Number(g.cheapest || 0),
      cheapestDealID: g.cheapestDealID || undefined,
      external: g.external || undefined,
      internalName: g.internalName || g.external || '',
      thumb: g.thumb || undefined
    }

    try {
      const savedDoc = await Game.findOneAndUpdate(
        { gameID: doc.gameID },
        doc,
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      )
      saved.push(savedDoc)
    } catch (err) {
      console.error('cheapshark.service - failed to save game', doc.gameID, err.message)
    }
  }

  console.log(`cheapshark.service - saved ${saved.length}/${games.length} games for title="${title}"`)

  if (games.length > 0 && saved.length === 0) {
    throw new Error('Falha ao salvar resultados da CheapShark no banco local')
  }

  return saved
}

module.exports = {
  buscarJogos
}