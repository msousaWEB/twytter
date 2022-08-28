const Twytte = require('../models/Twytte')
const User  = require('../models/User')

module.exports = class TwytteController {
    static async showTwytter(req, res) {
        res.render('twytter/home')
    }

    static async dashboard(req, res) {
        res.render('twytter/dashboard')
    }

    static async addTwytte(req, res) {
        const twytte = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {
            await Twytte.create(twytte)
            req.flash('success', 'Seu twytte foi enviado!')

            req.session.save(() => {
                res.redirect('/twytter/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static createTwytte(req, res) {
        res.render('twytter/create')
    }
}