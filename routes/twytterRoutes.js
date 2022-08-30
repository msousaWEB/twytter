const express = require('express')
const router = express.Router()
const TwytteController = require('../controllers/TwytteController')

//HELPER AUTH
const checkAuth = require('../helpers/auth').checkAuth

// CONTROLLER
router.get('/', TwytteController.showTwytter)
router.get('/dashboard', checkAuth, TwytteController.dashboard)
router.get('/add', checkAuth, TwytteController.createTwytte)
router.get('/edit/:id', checkAuth, TwytteController.updateTwytte)
router.post('/edit', checkAuth, TwytteController.saveTwytte)
router.post('/add', checkAuth, TwytteController.addTwytte)
router.post('/remove', checkAuth, TwytteController.delTwytte)

module.exports = router