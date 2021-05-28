const Sequelize = require('sequelize')
const connection = require('../index')

const Category = require('./Category')

const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article)
Article.belongsTo(Category)

Article.sync({ force:false }).then(()=>{}).catch((err) => {console.error(err)})
module.exports = Article;