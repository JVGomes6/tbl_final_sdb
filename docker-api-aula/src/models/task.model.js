const mongoose = require('mongoose')

const task = await Task.create({
  title: 'Estudar Docker',
  description: 'Ver aula de Docker Compose',
  completed: false
})

const tasks = await Task.insertMany([
  { title: 'Tarefa 1' },
  { title: 'Tarefa 2', completed: true },
  { title: 'Tarefa 3', description: 'Com descrição' }
])

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)