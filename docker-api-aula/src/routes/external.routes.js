const express = require('express')
const router = express.Router()

const {
  getCep,
  getTempo,
  getPosts,
  importarPost
} = require('../controllers/external.controller')


/**
 * @swagger
 * /external/cep/{cep}:
 *   get:
 *     summary: Consulta um endereço pelo CEP
 *     parameters:
 *       - in: path
 *         name: cep
 *         required: true
 *         schema:
 *           type: string
 *         example: "01001000"
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *       400:
 *         description: CEP inválido ou não encontrado
 */

router.get('/cep/:cep', getCep)

/**
 * @swagger
 * /external/tempo:
 *   get:
 *     summary: Consulta o tempo atual
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema:
 *           type: number
 *         example: -23.55
 *       - in: query
 *         name: lon
 *         required: true
 *         schema:
 *           type: number
 *         example: -46.63
 *     responses:
 *       200:
 *         description: Dados meteorológicos retornados
 *       400:
 *         description: Latitude ou longitude não informadas
 */

router.get('/tempo', getTempo)

/**
 * @swagger
 * /external/posts:
 *   get:
 *     summary: Lista posts da API JSONPlaceholder
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */

router.get('/posts', getPosts)


/**
 * @swagger
 * /external/importar-post:
 *   post:
 *     summary: Importa um post da API externa para o MongoDB
 *     tags:
 *       - External
 *     responses:
 *       201:
 *         description: Task criada com sucesso
 *       500:
 *         description: Erro ao importar post
 */



router.post('/importar-post', importarPost)

module.exports = router