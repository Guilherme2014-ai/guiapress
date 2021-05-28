const router = require("express").Router()
const controllers = require('../controllers/admin')
const Category = require('../database/models/Category')
const Articles = require('../database/models/Article')
const Users = require('../database/models/User')
const Crypto = require('crypto-js')
const adminAuth = require('../middlewares/adminAuth')


router.get('/user/create', adminAuth, (req,res) => {
    controllers.create_users(req,res)
})
router.post('/user/create', adminAuth, (req,res) => {
    controllers.create_users_POST(req,res,Users,Crypto)
})
router.get('/user', adminAuth, (req,res) => {
    controllers.users(req,res,Users)
})
router.get('/user/delete/:id', adminAuth, (req,res) => {
    controllers.users_delete(req,res,Users)
})


router.get('/categories/new', adminAuth, (req,res) => {
    controllers.categories_new(req,res)
})
router.post('/categories/new', adminAuth, (req,res) => {
    controllers.categories_new_POST(req,res,Category)
})
router.get('/categories', adminAuth, (req,res) => {
    controllers.categories(req,res,Category)
})
router.get('/delete/:id', adminAuth, (req,res) => {
    controllers.categories_delete_id(req,res,Category)
})
router.get('/edit/:id', adminAuth, (req,res) => {
    controllers.categories_edit_render(req,res,Category)
})
router.post('/edit', adminAuth, (req,res) => {
    controllers.categories_edit(req,res,Category)
})


router.get('/articles', adminAuth, (req,res) => {
    controllers.articles(req,res,Articles,Category)
})
router.get('/articles/new', adminAuth, (req,res) => {
    controllers.articles_new(req,res,Category)
})
router.post('/articles/new', adminAuth, (req,res) => {
    controllers.articles_new_POST(req,res,Articles)
})
router.get('/articles/edit/:id', adminAuth, (req,res) => {
    controllers.articles_edit_render(req,res,Articles,Category)
})
router.post('/articles/edit', adminAuth, (req,res) => {
    controllers.articles_edit(req,res,Articles)
})
router.get('/articles/delete/:id', adminAuth, (req,res) => {
    controllers.articles_delete(req,res,Articles)
})




module.exports = router;
// Trips: Desestruturacao ES6 e usar so o nome da variavel quando variavel e o nome do valor for igual
