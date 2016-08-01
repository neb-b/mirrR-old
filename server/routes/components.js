'use strict'

const express = require('express');
const router = express.Router();

let components = []

router.get('/', function(req, res, next) {
  res.send({ components: components })
})

router.put('/', function(req, res) {
  const io = req.io
  components = req.body.components || ""
  console.log('Components...', components)
  io.emit('update-components', { components: components })
  res.send({ components: components })
})


module.exports = router;
