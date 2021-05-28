module.exports = (req,res,next) => { // Quando se e um middleware ja recebi os campos "req/res" automaticamente
    req.session.user ? next() : res.redirect('/')
}