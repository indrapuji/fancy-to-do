const express = require('express')
const router = express.Router()
const todosRouter = require('./todos')

router.get('/', (req, res) => res.json({ message: 'Welcome to Todos Application'}))
router.use('/todos', todosRouter)

module.exports = router