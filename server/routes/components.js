'use strict'

const express = require('express');
const router = express.Router();

let components = []

router.get('/', function(req, res, next) {
  console.log('sending components', components)
  res.send({ components: components })
})

router.put('/', function(req, res) {
  if (req.body.components) === [] {
    res.send({ components: components })
    return
  }
  const io = req.io
  components = req.body.components || ""
  console.log('new components', components)
  io.emit('update-components', { components: components })
  res.send({ components: components })
})


module.exports = router;
