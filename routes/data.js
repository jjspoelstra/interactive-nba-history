const express = require('express')
const router = express.Router()
const dataController = require('../controllers/getData')


for (let year = 1984; year <= 2023; year++){
    router.get(`/getData/${year}/:stats`, dataController.findData);
  }

module.exports = router