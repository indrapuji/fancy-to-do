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
                // console.log(payload)
                user.email = payload.email
                user.password = process.env.SECRET_PASSWORD
                // console.log(user);
                let option = { where: { email: user.email } }
                return User.findOne(option)
            })
            .then(userData => {
                if (userData) {
                    login(user.email)
                    // console.log('email login send');
                    return userData
                } else {
                    register(user.email)
                    // console.log('email register send');
                    return User.create(user)
                }
            })
            .then(user => {
                console.log(user.email);
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.SECRET)
                res.status(201).json({ email: user.email, accessToken })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = SocialController