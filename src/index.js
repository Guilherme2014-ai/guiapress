//=================Dependencies=====================//
const express = require('express')
const PORT = process.env.PORT || 80
const app = express()

//================Others===========================//
require('./database/models/Category')
require('./database/models/Article')
require('./database/models/User')

const user = require('./routes/user')
const admin = require('./routes/admin')
const connection = require('./database/index')
const session = require('express-session')

//=================Config==========================//
app.set('views', './views')
app.set('view engine', 'ejs')

//============================================
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(express.static('./public'))

//=================Sessions=======================//
app.use(session({
    secret: 'Gu1apress2014',
    cookie: { maxAge: 30000000 },
    resave: true,
    saveUninitialized: true
}))

//=================Database========================//
connection.authenticate().then(() => {
    console.log('Database Connected With Success !')
}).catch((err) => {console.error(err)}) 

//=================Routes=========================//
app.use('/',user)
app.use('/admin',admin)

//=================Listen=========================//
app.listen(PORT, () => {console.log(`Server is Running At Port: ${PORT}`)})
