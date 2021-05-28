//=================Functions=======================================//
function toSlug (title) {
    return String(String(title).split("").map((a) => {if(a == ' '){return '-'}else{return a}}).join("")).toLowerCase()
}

const pass = require('../config/crypto_pass.json').Crypto_Pass

//=================Modules========================================//
module.exports.categories_new = (req,res) => {
    res.render('admin/categories/categories-new',{req})
}
module.exports.categories_new_POST = (req,res,model) => {
    const title = req.body.title
    const slug = toSlug(title)

    if(title == undefined || title == null || title.length == 0){res.redirect('/admin/categories/new')}else{
        model.create({title,slug}).then(() => {res.redirect('/admin/categories')}).catch((err) => {
            console.error(err)
            res.redirect('/admin/categories/new')
        })
    }
}
module.exports.categories = async (req,res,model) => {
    try{
        const categories = await model.findAll()
        res.render('admin/categories/categories',{categories,req})
    } catch(err){console.error(err)}
}
module.exports.categories_delete_id = async (req,res,model)=> {
    try{
        const id = req.params.id
        await model.destroy({where:{id}})
        res.redirect('/admin/categories')
    } catch(err){console.error(err)}
}
module.exports.categories_edit_render = async (req,res,model) => {
    try{
        const id = req.params.id
        const titleModel = await model.findOne({ where:{id} })
        const title = titleModel.title

        res.render('admin/categories/categories-edit',{id,title,req})
    } catch(err){console.error(err)}
}
module.exports.categories_edit = async (req,res,model) => {
    try{
        const {id,title} = req.body
        const slug = toSlug(title)

        await model.update({title,slug},{where:{id}})
        res.redirect('/admin/categories')
    } catch(err){console.error(err)}
}


module.exports.articles = async (req,res,Model,model2) => {
    try{
        const articles = await Model.findAll({
            include: [{ model:model2 }] //Adiciona o campo a Category para cada Article de acordo com o "categoryId" de cada Article
        })
        res.render('admin/articles/articles',{articles,req})
    } catch(err){console.error(err)}
} 
module.exports.articles_new = async (req,res,model) => {
    try{
        const categories = await model.findAll()
        res.render('admin/articles/articles-new',{categories,req})
    } catch(err){console.error(err)}
}
module.exports.articles_new_POST = async (req,res,model) => {
    try{
        const {title,body,category} = req.body
        const slug = toSlug(title)

        await model.create({
            title,
            slug,
            body,
            categoryId: category
        })

        res.redirect('/admin/articles')
    } catch(err){console.error(err)}
}
module.exports.articles_edit_render = async (req,res,model,model2) => {
    try{
        const id = req.params.id
        const article = await model.findOne({ where:{id} })
        const categories = await model2.findAll()

        res.render('admin/articles/articles-edit', {categories,article,req})
    } catch(err){console.error(err)}
}
module.exports.articles_edit = async (req,res,model) => {
    try{
        const {title,body,category,articleId} = req.body
        const slug = toSlug(title)

        await model.update({
            title,
            slug,
            body,
            categoryId:category
        },{where:{id:articleId}})

        res.redirect('/admin/articles')
    } catch(err){console.error(err)}
}
module.exports.articles_delete = async (req,res,model) => {
    try{
        const id = req.params.id

        await model.destroy({where:{id}})
        res.redirect('/admin/articles')
    } catch(err){console.error(err)}
}


module.exports.create_users = (req,res) => {
    res.render('admin/users/user_create',{req})
}
module.exports.create_users_POST = async (req,res,model,Crypto) => {
    try{
        const {email,password} = req.body

        const password_encrypted = await Crypto.AES.encrypt(password,pass).toString()
        const userRepeat = await model.findOne({ where: {email} })

        if(userRepeat == null){
            await model.create({
                email,
                password: password_encrypted
            })
    
            res.redirect('/')
        }else{
            res.redirect('/admin/user/create')
        }
        
    } catch(err){console.error(err)}
}
module.exports.users = async (req,res,model) => {
    try{
        const users = await model.findAll()
        res.render('admin/users/index',{users,req})
    } catch(err){console.error(err)}
}
module.exports.users_delete = async (req,res,model) => {
    try{
        const id = req.params.id
        await model.destroy({ where: {id} })
        res.redirect('/admin/user') 
    } catch(err){console.error(err)}
}
//================================================================//