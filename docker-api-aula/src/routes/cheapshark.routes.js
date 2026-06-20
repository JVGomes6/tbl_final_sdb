const express = require('express')
const router = express.Router()

const {
  getGames
} = require('../controllers/cheapshark.controller')

/**
 * @openapi
 * /cheapshark/games/{title}:
 *   get:
 *     summary: Busca jogos na API CheapShark
 *     tags:
 *       - CheapShark
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do jogo (Ex: batman)
 *     responses:
 *       200:
 *         description: Jogos encontrados
 *       404:
 *         description: Nenhum jogo encontrado
 *       500:
 *         description: Erro interno
 */
router.get('/games/:title', getGames)

module.exports = router