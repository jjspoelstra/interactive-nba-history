const express = require('express')
const router = express.Router()
const bracketController = require('../controllers/brackets')


for (let year = 1984; year <= 2023; year++){
  router.get(`/:${year}`, bracketController.getBracket);
}



module.exports = router;