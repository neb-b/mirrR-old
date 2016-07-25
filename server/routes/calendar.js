'use strict'

const express = require('express')
const router = express.Router()
require('dotenv').config()

// const google = require('googleapis')
// const OAuth2 = google.auth.OAuth2
// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// const REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL
// const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)


router.get('/', function(req, res, next) {
  res.status(200).send()
})

module.exports = router
