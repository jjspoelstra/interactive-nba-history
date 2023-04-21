const express = require('express')
const router = express.Router()
const bracketController = require('../controllers/brackets')



  router.get(`/:year`, bracketController.getBracket);




module.exports = router;