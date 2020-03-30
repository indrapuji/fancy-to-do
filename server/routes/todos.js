const express = require('express')
const router = express.Router()
const TodosControllers = require('../controllers/TodosController')

router.get('/', TodosControllers.getTodos)
router.get('/:id', TodosControllers.getTodoId)
router.post('/', TodosControllers.addTodo)
router.put('/:id', TodosControllers.update)
router.delete('/:id', TodosControllers.deleteTodo)

module.exports = router