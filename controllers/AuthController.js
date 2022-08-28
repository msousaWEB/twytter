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

        //checar se usuário já existe
        const checkExistUser = await User.findOne({
            where: {email: email}
        })
        if(checkExistUser) {
            req.flash('error', 'Já existe uma conta com este e-mail!')
            res.render('auth/register')

            return
        }

        //criar senha
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashPassword
        }

        try {
           const createdUser = await User.create(user)

            // inicializar a sessao
            req.session.userid = createdUser.id

            req.flash('success', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        } catch(err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        req.flash('success', 'Você saiu!')
        res.redirect('/login')
    }
}