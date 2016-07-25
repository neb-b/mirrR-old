'use strict'

const express = require('express')
const router = express.Router()
const googleTrends = require('google-trends-api')
require('dotenv').config()


router.get('/', function(req, res, next) {
    googleTrends.top30in30(function(err, results) {
        res.send(results)
    })
})

module.exports = router