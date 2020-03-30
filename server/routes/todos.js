const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('ini dari todos router'))

module.exports = router