const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const jwt = require('jsonwebtoken')


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
                // console.log(payload);
                user.email = payload.email
                user.password = process.env.SECRET_PASSWORD
                // console.log(user);
                let option = { where: { email: user.email } }
                return User.findOne(option)
            })
            .then(userData => {
                if (userData) {
                    console.log('masuk ke sini');
                    return userData
                } else {
                    console.log('bikin baru');
                    return User.create(user)
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
}

module.exports = SocialController