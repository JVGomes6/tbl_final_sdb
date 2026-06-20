const express = require('express')
const router = express.Router()

const {
  getCep,
  getTempo,
  getPosts
} = require('../controllers/external.controller')

router.get('/cep/:cep', getCep)
router.get('/tempo', getTempo)
router.get('/posts', getPosts)

module.exports = router