'use strict'

const express = require('express');
const router = express.Router();

let components = ['Google', 'Greeting', 'Time', 'Weather', 'News', 'Twitter']

router.get('/', function(req, res, next) {
  res.send({ components: components })
})

router.put('/', function(req, res) {
  const io = req.io
  components = req.body.components || ""

  io.emit('update-components', { components: components })
  res.send({ components: components })
})


module.exports = router;
