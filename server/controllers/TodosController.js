const { Todo } = require('../models')
const { addTODO } = require('../helpers/sendEmail')

class TodoControllers {

    static getTodos(req, res) {
        let option = { where: { userId: req.user.id } }
        Todo.findAll(option)
            .then(todos => {
                res.status(200).json({ todos: todos })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getTodoId(req, res) {
        const option = { where: { id: req.params.id } }
        Todo.findOne(option)
            .then(todo => {
                if (todo) {
                    res.status(200).json({ todo: todo })
                } else {
                    res.status(404).json({
                        message: 'error not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addTodo(req, res) {
        const { title, description, status, due_date } = req.body
        Todo.create({
            title,
            description,
            status,
            due_date,
            userId: req.user.id
        })
            .then(todo => {
                addTODO(todo, req.user.email)
                res.status(201).json({ todo })
            })
            .catch(err => {
                if (err.errors) {
                    let errData = []
                    for (let i = 0; i < err.errors.length; i++) {
                        errData.push({ message: err.errors[i].message })
                    }
                    res.status(400).json(errData)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static update(req, res) {
        let option = { where: { id: req.params.id } }
        const { title, description, status, due_date } = req.body
        let input = {
            title,
            description,
            status,
            due_date,
            userId: req.user.id
        }
        Todo.update(input, option)
            .then(todo => {
                if (todo) {
                    res.status(200).json(input)
                } else {
                    res.status(404).json({
                        message: 'data not found'
                    })
                }
            })
            .catch(err => {
                if (err.errors) {
                    let errData = []
                    for (let i = 0; i < err.errors.length; i++) {
                        errData.push({ message: err.errors[i].message })
                    }
                    res.status(400).json(errData)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static deleteTodo(req, res) {
        const option = { where: { id: req.params.id } }
        Todo.destroy(option)
            .then(todo => {
                if (todo) {
                    res.status(200).json({ todo: todo })
                } else {
                    res.status(404).json({
                        message: 'error not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoControllers