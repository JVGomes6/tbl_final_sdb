const express = require('express')
const router  = express.Router()

const {
  getAll,
  getById,
  create,
  replace,
  update,
  remove
} = require('../controllers/task.controller')

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tasks
 *     responses:
 *       200:
 *         description: Lista de tasks retornada com sucesso
 */

router.get('/',     getAll)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Busca uma task pelo ID
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task encontrada
 *       404:
 *         description: Task não encontrada
 */

router.get('/:id',  getById)


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Estudar Swagger
 *               description:
 *                 type: string
 *                 example: Documentar a API
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task criada
 */

router.post('/',    create)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Substitui completamente uma task
 *     tags:
 *       - Tasks
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
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task atualizada
 */

router.put('/:id',  replace)

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Atualiza parcialmente uma task
 *     tags:
 *       - Tasks
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
 *         description: Task atualizada
 */

router.patch('/:id', update)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Remove uma task
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task removida com sucesso
 *       404:
 *         description: Task não encontrada
 */

router.delete('/:id', remove)

module.exports = router