const express = require('express')
const router = express.Router()
const TodosControllers = require('../controllers/TodosController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, TodosControllers.getTodos)
router.post('/', authentication, TodosControllers.addTodo)
router.get('/:id', authentication, authorization, TodosControllers.getTodoId)
router.put('/:id', authentication, authorization, TodosControllers.update)
router.delete('/:id', authentication, authorization, TodosControllers.deleteTodo)

module.exports = router