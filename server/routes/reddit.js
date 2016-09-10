'use strict'

const express = require('express')
const router = express.Router()
const request = require('request')

//Top 5 stories
const baseUrl = 'https://www.reddit.com/top.json?limit=5'

router.get('/', function(req, res, next) {
	request(baseUrl, function (error, response, body) {
		res.status(error ? 400 : 200).send(error || body)
	})
})

module.exports = router
