const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('twytter', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('conectado')
} catch(err) {
    console.log(`erro ao conectar: ${err}`)
}

module.exports = sequelize