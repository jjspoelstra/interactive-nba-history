const express = require('express')
const router = express.Router()
const dataController = require('../controllers/getData')



    router.get(`/:year/:stats`, dataController.findData);
  

module.exports = router