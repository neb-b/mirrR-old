'use strict'

const express = require('express');
const router = express.Router();

let components = []

router.get('/', function(req, res, next) {
  let payload = {
    components: components
  }
  console.log('payload', payload)
  res.send(payload)
})

router.put('/', function(req, res) {

  const io = req.io
  components = req.body.components || ""
  console.log('new components', components)
  io.emit('update-components', { components: components })
  res.send({ components: components })
})


module.exports = router;
