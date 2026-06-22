const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Docker API Aula',
      version: '1.0.0',
      description: 'API de Tasks com MongoDB'
    }
  },
  apis: ['./src/routes/*.js',
        './routes/**/*.js',
  ]
}

module.exports = swaggerJsdoc(options)