'use strict'

const express = require('express');
const router = express.Router();

let components = ['Mic', 'Google', 'Greeting', 'Time', 'Weather', 'News', 'Twitter']

router.get('/', function(req, res, next) {
  res.send({components})
})

router.put('/', function(req, res) {
  const io = req.io
  components = req.body.components

  console.log('update')
  io.emit('update-components', { components })
  res.send({ components })
})


module.exports = router;
