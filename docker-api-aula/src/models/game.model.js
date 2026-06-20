const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema(
  {
    gameID: {
      type: String,
      required: true
    },

    steamAppID: {
      type: String,
      default: null
    },

    cheapest: {
      type: Number,
      required: true
    },

    cheapestDealID: {
      type: String,
      required: false
    },

    external: {
      type: String,
      required: false
    },

    internalName: {
      type: String,
      required: true
    },

    thumb: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Game', GameSchema)