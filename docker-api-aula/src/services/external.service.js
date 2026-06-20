// Consulta endereço por CEP no ViaCEP
async function buscarCep(cep) {
  const cepLimpo = String(cep).replace(/\D/g, '')

  if (cepLimpo.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos')
  }

  const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
  const dados = await res.json()

  if (dados.erro) {
    throw new Error('CEP não encontrado')
  }

  return dados
}

// Consulta o tempo atual no Open-Meteo
async function buscarTempo(latitude, longitude) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,wind_speed_10m`

  const res = await fetch(url)
  const dados = await res.json()

  return dados.current
}

// Lista posts de exemplo no JSONPlaceholder
async function listarPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')

  return res.json()
}

module.exports = { buscarCep, buscarTempo, listarPosts }