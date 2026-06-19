require('dotenv').config()

const express = require('express')
const connectDatabase = require('./config/database')

const app = express()

app.use(express.json())

connectDatabase()

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando com Node.js, Express, Docker e MongoDB'
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})