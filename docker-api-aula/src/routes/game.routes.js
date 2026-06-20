const express = require('express')
const router = express.Router()

const controller = require('../controllers/game.controller')

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Criar um jogo
 *     tags:
 *       - Games
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameID
 *               - cheapest
 *               - internalName
 *             properties:
 *               gameID:
 *                 type: string
 *               steamAppID:
 *                 type: string
 *                 nullable: true
 *               cheapest:
 *                 type: number
 *               cheapestDealID:
 *                 type: string
 *                 nullable: true
 *               external:
 *                 type: string
 *               internalName:
 *                 type: string
 *               thumb:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo criado com sucesso
 */
router.post('/', controller.create)

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Listar todos os jogos
 *     tags:
 *       - Games
 *     responses:
 *       200:
 *         description: Lista de jogos
 */
router.get('/', controller.findAll)

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Buscar jogo por ID
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *       404:
 *         description: Jogo não encontrado
 */
router.get('/:id', controller.findById)

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Atualizar jogo completamente
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gameID:
 *                 type: string
 *               steamAppID:
 *                 type: string
 *                 nullable: true
 *               cheapest:
 *                 type: number
 *               cheapestDealID:
 *                 type: string
 *                 nullable: true
 *               external:
 *                 type: string
 *               internalName:
 *                 type: string
 *               thumb:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jogo atualizado
 */
router.put('/:id', controller.update)

/**
 * @swagger
 * /games/{id}:
 *   patch:
 *     summary: Atualização parcial do jogo
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Jogo atualizado parcialmente
 */
router.patch('/:id', controller.patch)

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Remover jogo
 *     tags:
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jogo removido
 */
router.delete('/:id', controller.remove)

module.exports = router