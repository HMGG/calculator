var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/', (req, res) => {
  fs.readFile(global.__basedir + '/memory/memory.txt', 'utf-8', (err, data) => {
    res.send(data)
  })
})

router.put('/', (req, res) => {
  fs.writeFile(global.__basedir + '/memory/memory.txt', req.body.number, () => {
    res.end()
  })
})

module.exports = router;