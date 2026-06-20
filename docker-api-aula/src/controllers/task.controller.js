const Task = require('../models/task.model')

// GET /tasks — Listar todas as tasks
async function getAll(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })

    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tasks', error: error.message })
  }
}

// GET /tasks/:id — Buscar uma task pelo ID
async function getById(req, res) {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task não encontrada' })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar task', error: error.message })
  }
}

// POST /tasks — Criar uma nova task
async function create(req, res) {
  try {
    const { title, description, completed } = req.body

    const task = await Task.create({ title, description, completed })

    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar task', error: error.message })
  }
}

// PUT /tasks/:id — Substituir uma task por completo
async function replace(req, res) {
  try {
    const { title, description, completed } = req.body

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true, overwrite: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task não encontrada' })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ message: 'Erro ao substituir task', error: error.message })
  }
}

// PATCH /tasks/:id — Atualizar campos específicos de uma task
async function update(req, res) {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task não encontrada' })
    }

    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar task', error: error.message })
  }
}

// DELETE /tasks/:id — Remover uma task pelo ID
async function remove(req, res) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task não encontrada' })
    }

    res.status(200).json({ message: 'Task removida com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover task', error: error.message })
  }
}

module.exports = { getAll, getById, create, replace, update, remove }