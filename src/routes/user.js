const router = require("express").Router()
const controllers = require('../controllers/index')
const Crypto = require('crypto-js')
const Articles = require('../database/models/Article')
const Category = require('../database/models/Category')
const User = require('../database/models/User')

router.get('/', (req,res) => {
    controllers.index(req,res,Articles,Category)
})
router.get('/articles/:slug', (req,res) => {
    controllers.article(req,res,Articles,Category)
})
router.get('/category/:slug', (req,res) => {
    controllers.category_slug(req,res,Category,Articles)
})
router.get('/articles/page/:num', (req,res) => {
    controllers.page(req,res,Articles,Category)
})


router.get('/login', (req,res) => {
    controllers.login(req,res)
})
router.post('/authenticate', (req,res) => {
    controllers.authenticate(req,res,User,Crypto)
})
router.get('/logout', (req,res) => {
    controllers.logout(req,res)
})

module.exports = router;