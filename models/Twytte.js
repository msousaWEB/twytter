const {DataTypes} = require('sequelize')
const db = require('../db/connection')

// USER
const User = require('./User')

const Twytte = db.define('Twytte', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Twytte.belongsTo(User)
User.hasMany(Twytte)

module.exports = Twytte