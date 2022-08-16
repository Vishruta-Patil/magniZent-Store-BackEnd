const express = require('express')
const router = express.Router()
const {signIn, login} = require('../cantrollers/auth.cantroller')

router.route("/signin").post(signIn)
router.route("/login").post(login)

module.exports = router