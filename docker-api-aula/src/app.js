require('dotenv').config()

const express      = require('express')
const path = require('path')
const connectDatabase = require('./config/database')
const taskRoutes   = require('./routes/task.routes')
const externalRoutes = require('./routes/external.routes')
const cheapsharkRoutes = require('./routes/cheapshark.routes') //Rota necessaria da API //EXTERNO 
const gameRoutes = require('./routes/game.routes') //Local CRUD

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const app = express()

app.use(express.json())

// Servir frontend estático em /ui
app.use('/ui', express.static(path.join(__dirname, 'frontend')))

connectDatabase()

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando com Node.js, Express, Docker e MongoDB'
  })
})


app.use('/tasks', taskRoutes)
app.use('/external', externalRoutes)
app.use('/cheapshark', cheapsharkRoutes) //Registrando a rota da API //EXTERNO 
app.use('/games', gameRoutes) //Local CRUD

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
