'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const filePath = '../data/list.json'
const file = path.join(__dirname, filePath)
let currentComponents = require(filePath)

router.get('/', function(req, res, next) {
  console.log('current', currentComponents)
  res.send({
    components: currentComponents || ['Google']
  })
})

router.put('/', function(req, res) {
  const io = req.io
  const newComponents = req.body.components
  console.log('newComponents', newComponents)
  fs.writeFile(file, JSON.stringify(newComponents), function() {
    console.log('write file')
    res.send({
      components: newComponents
    })
  })
})


module.exports = router;
