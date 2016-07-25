'use strict'

const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
  const io = req.io
  const payload = {
    time: req.body.time
  }

  io.emit('start-timer', payload)
  res.send()
})


module.exports = router;
