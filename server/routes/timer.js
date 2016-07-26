'use strict'

const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  const io = req.io
  const payload = {
    minutes: req.body.minutes,
    seconds: req.body.seconds
  }

  io.emit('start-timer', payload)
  res.send()
})


module.exports = router;
