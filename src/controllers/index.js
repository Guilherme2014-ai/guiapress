const pass = require('../config/crypto_pass.json').Crypto_Pass


module.exports.index = async (req,res,Model,model2) => {
    try{
        const articles = await Model.findAll({ 
            order: [['id','DESC']],
            include: [{ model: model2 }],
            limit: 3
        })
        const categories = await model2.findAll()
        res.render('user',{articles,categories,req})
    } catch(err){console.error(err)}
}
module.exports.article = async (req,res,model,model2) => {
    try{
        const slug = req.params.slug
        const article = await model.findOne({ where:{ slug } })
        const categories = await model2.findAll()
        article != undefined ? res.render('user/article',{article,categories,req}) : res.redirect('/')
    } catch(err){console.error(err)}
}
module.exports.category_slug = async (req,res,Model,model2) => {
    try{
        const slug = req.params.slug
        const categories = await Model.findAll()
        const category = await Model.findOne({ 
            where: {slug},
            include: [{ model: model2 }] 
        })
        
        res.render('user/articles-category', {category,categories,req})
    } catch(err){console.error(err)}
}
module.exports.page = async (req,res,Model,model2) => {
    try{
        let offset = req.params.num
        const limit = 3

        const next = Number(offset)+1, back = Number(offset)-1

        const categories = await model2.findAll()
        const articlesModel = await Model.findAll({ include:[{ model:model2 }], order: [['id','DESC']] })

        if(offset == undefined || isNaN(offset)){offset = 0}else{
            const start_index = (offset - 1) * limit, end_index = offset * limit

            if(!articlesModel[start_index]){res.redirect('/')}else{
                const articles = articlesModel.slice(start_index, end_index)
                res.render('user/page',{categories,articles,next,back,req})
            }
        }
    } catch(err){console.error(err)}
}
module.exports.login = async (req,res) => {
    res.render('user/login',{req})
}
module.exports.authenticate = async (req,res,model,Crypto) => {
    try{
        const {email,password} = req.body
        const user = await model.findOne({ where:{email} })
            const passDecrypted = Crypto.AES.decrypt(user.password,pass).toString(Crypto.enc.Utf8)

            switch (password) {
                case passDecrypted:
                req.session.user = await {id: user.id, email}
                return res.redirect('/')

                default:
                return res.redirect('/login')
            } 
    } catch(err){
        console.error(err)
        res.redirect('/login')
    }
}
module.exports.logout = async (req,res) => {
    try{
        req.session.destroy()
        res.redirect('/')
    } catch(err){console.error(err)}
}