const Twytte = require('../models/Twytte')
const User  = require('../models/User')

module.exports = class TwytteController {
    static async showTwytter(req, res) {
        res.render('twytter/home')
    }
}