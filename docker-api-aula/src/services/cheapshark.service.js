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

async function getGameDeals(gameId) {
  const { data } = await axios.get(
    `https://www.cheapshark.com/api/1.0/games?id=${gameId}`
  )

  const storesMap = await getStoresMap()

  const deals = data.deals.map(deal => ({
    storeID: deal.storeID,
    storeName: storesMap[deal.storeID] || 'Loja Desconhecida',
    dealID: deal.dealID,
    price: Number(deal.price),
    retailPrice: Number(deal.retailPrice),
    savings: Number(deal.savings)
  }))

  deals.sort((a, b) => a.price - b.price)

  return {
    game: {
      title: data.info.title,
      steamAppID: data.info.steamAppID,
      thumb: data.info.thumb
    },
    cheapestPriceEver: data.cheapestPriceEver,
    bestDeal: deals[0],
    deals
  }
}

let storesCache = null

async function getStores() {
  if (storesCache) return storesCache

  const response = await fetch('https://www.cheapshark.com/api/1.0/stores')
  const data = await response.json()

  storesCache = data
  return data
}

async function getStoresMap() {
  const stores = await getStores()

  return stores.reduce((acc, store) => {
    acc[store.storeID] = store.storeName
    return acc
  }, {})
}


async function getGameDealsByTitle(title) {
  const searchResponse = await axios.get(
    'https://www.cheapshark.com/api/1.0/games',
    {
      params: { title }
    }
  )

  const games = searchResponse.data

  if (!games.length) {
    throw new Error('Jogo não encontrado')
  }

  const gameId = games[0].gameID

  return getGameDeals(gameId)
}


module.exports = {
  buscarJogos, getGameDeals, getStores, getStoresMap, getGameDealsByTitle
}