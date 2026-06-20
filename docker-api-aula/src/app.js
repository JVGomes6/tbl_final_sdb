require('dotenv').config()

const express      = require('express')
const connectDatabase = require('./config/database')
const taskRoutes   = require('./routes/task.routes')
const externalRoutes = require('./routes/external.routes')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

const app = express()

app.use(express.json())

connectDatabase()

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando com Node.js, Express, Docker e MongoDB'
  })
})


app.use('/tasks', taskRoutes)
app.use('/external', externalRoutes)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})


