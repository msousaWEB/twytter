const express = require('express')
const router = express.Router()
const TwytteController = require('../controllers/TwytteController')

// CONTROLLER
router.get('/', TwytteController.showTwytter)

module.exports = router