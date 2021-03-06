const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { login, register } = require('../helpers/sendEmail')

class UserController {

    static register(req, res) {
        const { email, password } = req.body
        let option = { where: { email } }
        User.findOne(option)
            .then(data => {
                if (data) {
                    res.status(400).json({
                        message: 'User already exist'
                    })
                } else {
                    register(email)
                    return User.create({ email, password })
                }
            })
            .then(user => {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.SECRET)
                res.status(201).json({ email, accessToken })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server Error'
                })
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        const option = { where: { email } }
        User.findOne(option)
            .then(user => {
                if (!user) {
                    res.status(404).json({
                        message: 'Email not found'
                    })
                } else {
                    if (compare(password, user.password)) {
                        login(user.email)
                        const accessToken = jwt.sign({
                            id: user.id,
                            email: user.email
                        }, process.env.SECRET)
                        res.status(201).json({ email, accessToken })
                    } else {
                        res.status(400).json({
                            message: 'Wrong password'
                        })
                    }
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server Error'
                })
            })
    }

}

module.exports = UserController