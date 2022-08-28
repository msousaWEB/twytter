const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    };

    static register(req, res) {
        res.render('auth/register')
    };

    static async registerPost(req,res) {
        const { name, email, password, confirmpassword } = req.body

        //confirmacao de senha
        if(password != confirmpassword) {
            //mensagem de erro
            req.flash('error', 'Confirmação de senha incorreta!')
            res.render('auth/register')

            return
        }
    }
}