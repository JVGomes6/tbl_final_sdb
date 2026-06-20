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

router.get('/',     getAll)
router.get('/:id',  getById)
router.post('/',    create)
router.put('/:id',  replace)
router.patch('/:id', update)
router.delete('/:id', remove)

module.exports = router