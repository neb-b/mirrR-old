'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const filePath = '../data/components.json'
const file = path.join(__dirname, filePath)

let mirrorComponents = require(filePath)

router.get('/', function(req, res, next) {
  console.log('current', mirrorComponents)
  res.send(mirrorComponents)
})

router.put('/', function(req, res) {
  const io = req.io
  mirrorComponents = req.body.components
  console.log('newComponents', mirrorComponents)

  fs.writeFile(file, JSON.stringify(mirrorComponents), function() {
    res.send(mirrorComponents)
    io.emit('update-components', mirrorComponents)
  })
})


module.exports = router;
