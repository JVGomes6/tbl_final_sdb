const axios = require('axios')

async function buscarJogos(title) {
  const response = await axios.get(
    'https://www.cheapshark.com/api/1.0/games',
    {
      params: { title }
    }
  )

  return response.data
}

module.exports = {
  buscarJogos
}