const Sequelize = require('sequelize')
const connection = require('../index')

const Category = connection.define('categories', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({ force:false }).then(() => {}).catch((err) => {console.error(err)})
module.exports = Category;