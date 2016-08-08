'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const filePath = '../data/list.json'
const file = path.join(__dirname, filePath)

router.get('/', function(req, res, next) {
  let currentComponents = require(filePath)
  console.log('current', currentComponents)
  res.send(currentComponents)
})

router.put('/', function(req, res) {
  const io = req.io
  const newComponents = req.body.components
  console.log('newComponents', newComponents)
  const newObj = {
    components: newComponents
  }
  fs.writeFile(file, JSON.stringify(newObj), function() {
    res.send(newObj)
    io.emit('update-components', newObj)
  })
})


module.exports = router;
