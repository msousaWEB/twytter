const Twytte = require('../models/Twytte')
const User  = require('../models/User')
const {Op}  = require('sequelize')

module.exports = class TwytteController {
    static async showTwytter(req, res) {
        let search = ''

        if(req.query.search) {
            search = req.query.search 
        }

        const twytteData = await Twytte.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%`},
            },
        })
        const twyttes = twytteData.map((result) => result.get({plain: true}))

        let twyttesQtd = twyttes.length
        if(twyttesQtd === 0){
            twyttesQtd = false
        }
        res.render('twytter/home', {twyttes, search, twyttesQtd})
    }

    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId},
            include: Twytte,
            plain: true,
        });

        //checar se o user existe
        if(!user) {
            res.redirect('/login')
        }

        const twyttes = user.Twyttes.map((result) => result.dataValues)
        let emptyTwyttes = false

        if(twyttes.length === 0) {
            emptyTwyttes = true
        }

        res.render('twytter/dashboard', {twyttes, emptyTwyttes})
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

    static async delTwytte(req, res) {
        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Twytte.destroy({where: {id:id, UserId: UserId}})
            req.flash('success', 'Seu twytte foi removido!')

            req.session.save(() => {
                res.redirect('/twytter/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTwytte(req, res) {
        const id = req.params.id

        const twytte = await Twytte.findOne({where: {id: id}, raw: true})

        res.render('twytter/edit', {twytte})
    }

    static async saveTwytte(req, res) {
        const id = req.body.id
        const twytte = {
            title: req.body.title,
        }

        try {
            await Twytte.update(twytte, {where: {id:id}})
            req.flash('success', 'Seu twytte foi atualizado!')

            req.session.save(() => {
                res.redirect('/twytter/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}