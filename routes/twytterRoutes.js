const express = require('express')
const router = express.Router()
const TwytteController = require('../controllers/TwytteController')

//HELPER AUTH
const checkAuth = require('../helpers/auth').checkAuth

// CONTROLLER
router.get('/', TwytteController.showTwytter)
router.get('/dashboard', checkAuth, TwytteController.dashboard)
router.get('/add', checkAuth, TwytteController.createTwytte)

module.exports = router