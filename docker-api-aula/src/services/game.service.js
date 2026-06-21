const Game = require('../models/game.model')
const axios = require('axios')



// CREATE
async function createGame(data) {
  return await Game.create(data)
}

// READ ALL
async function getGames() {
  return await Game.find()
}

// READ BY ID
async function getGameById(id) {
  return await Game.findById(id)
}

// SEARCH BY NAME (partial, case-insensitive)
async function findGamesByName(name, limit = 50) {
  if (!name) return []
  const q = new RegExp(name, 'i')
  return await Game.find({ $or: [{ internalName: q }, { external: q }] }).limit(limit)
}

// UPDATE (PUT completo)
async function updateGame(id, data) {
  return await Game.replaceOne({ _id: id }, data)
}


// PATCH (parcial)
async function patchGame(id, data) {
  return await Game.findByIdAndUpdate(id, data, { new: true })
}

// DELETE
async function deleteGame(id) {
  return await Game.findByIdAndDelete(id)
}

module.exports = {
  createGame,
  getGames,
  getGameById,
  findGamesByName,
  updateGame,
  patchGame,
  deleteGame
}