const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const { login, register } = require('../helpers/sendEmail')


class SocialController {

    static googleLogin(req, res) {
        let user = {}
        const token = req.body.token
        client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        })
            .then(googleData => {
                const payload = googleData.getPayload()
                console.log(payload);
                user.email = payload.email
                user.password = process.env.SECRET_PASSWORD
                let option = { where: { email: user.email } }
                return User.findOne(option)
            })
            .then(userData => {
                if (userData) {
                    login(user.email)
                    return userData
                } else {
                    register(user.email)
                    return User.create(user)
                }
            })
            .then(user => {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.SECRET)
                res.status(201).json({ email: user.email, accessToken })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server Error'
                })
            })
    }
}

module.exports = SocialController