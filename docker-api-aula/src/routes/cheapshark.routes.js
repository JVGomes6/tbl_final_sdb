const express = require('express');
const router = express.Router();

const {
  getGames,
  findDeals,
  findDealsByTitle
} = require('../controllers/cheapshark.controller');

/**
 * @swagger
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
 *         description: Nome do jogo para buscar
 *     responses:
 *       200:
 *         description: Jogos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   gameID:
 *                     type: string
 *                   steamAppID:
 *                     type: string
 *                   cheapest:
 *                     type: number
 *                   cheapestDealID:
 *                     type: string
 *                   external:
 *                     type: string
 *                   internalName:
 *                     type: string
 *                   thumb:
 *                     type: string
 *       404:
 *         description: Nenhum jogo encontrado com esse titulo
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/games/:title', getGames);

/**
 * @swagger
 * /cheapshark/games/{id}/deals:
 *   get:
 *     summary: Busca as ofertas de um jogo especifico pelo ID
 *     tags:
 *       - CheapShark
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do jogo na API CheapShark
 *     responses:
 *       200:
 *         description: Lista de ofertas do jogo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deals:
 *                   type: array
 *                   items:
 *                     type: object
 *                 info:
 *                   type: object
 *       404:
 *         description: Jogo nao encontrado
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/games/:id/deals', findDeals);


/**
 * @swagger
 * /cheapshark/deals/{title}:
 *   get:
 *     summary: Busca ofertas de jogos pelo título
 *     description: Retorna uma lista de ofertas de jogos encontradas na API CheapShark com base no título informado.
 *     tags:
 *       - CheapShark
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do jogo para buscar ofertas
 *         example: batman
 *     responses:
 *       200:
 *         description: Lista de ofertas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   storeID:
 *                     type: string
 *                     example: "21"
 *                   storeName:
 *                     type: string
 *                     example: "WinGameStore"
 *                   dealID:
 *                     type: string
 *                     example: "Dtzv5PHBf71720cIYjxx3oHvvZK3iHUbQjv6fWLVpd8%3D"
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   retailPrice:
 *                     type: number
 *                     example: 19.99
 *                   savings:
 *                     type: number
 *                     example: 0
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/deals/:title', findDealsByTitle)


module.exports = router;