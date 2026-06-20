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
  updateGame,
  patchGame,
  deleteGame
}