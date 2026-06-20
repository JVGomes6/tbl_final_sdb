const service = require('../services/game.service')

// POST
async function create(req, res) {
  try {
    const game = await service.createGame(req.body)
    return res.status(201).json(game)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

// GET ALL
async function findAll(req, res) {
  const games = await service.getGames()
  return res.json(games)
}

// GET BY ID
async function findById(req, res) {
  const game = await service.getGameById(req.params.id)
  return res.json(game)
}

// PUT
async function update(req, res) {
  const game = await service.updateGame(req.params.id, req.body)
  return res.json(game)
}

// PATCH
async function patch(req, res) {
  const game = await service.patchGame(req.params.id, req.body)
  return res.json(game)
}

// DELETE
async function remove(req, res) {
  await service.deleteGame(req.params.id)
  return res.json({ message: 'Deletado com sucesso' })
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  patch,
  remove
}