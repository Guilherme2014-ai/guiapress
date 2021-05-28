const Sequelize = require('sequelize')
const connection = require('../index')

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({ force:false }).then(() => {}).catch((err) => {console.error(err)})
module.exports = User;