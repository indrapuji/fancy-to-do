const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare } = require('../helpers/bcrypt')

class UserController {

    static register(req, res) {
        const { email, password } = req.body
        let option = { where: { email } }
        User.findOne(option)
            .then(data => {
                if (data) {
                    console.log(data);
                    res.status(400).json({
                        message: 'User already exist'
                    })
                } else {
                    return User.create({ email, password })
                }
            })
            .then(user => {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.SECRET)
                res.status(201).json({ accessToken })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        const option = { where: { email } }
        User.findOne(option)
            .then(user => {
                if (!user) {
                    res.status(400).json({
                        message: 'email tidak terdaftar'
                    })
                } else {
                    const isPasswordValid = compare(password, user.password)
                    if (!isPasswordValid) {
                        res.status(400).json({
                            message: 'password salah'
                        })
                    } else {
                        const accessToken = jwt.sign({
                            id: user.id,
                            email: user.email
                        }, process.env.SECRET)
                        console.log(accessToken);
                        res.status(201).json({ accessToken })
                    }
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

}

module.exports = UserController