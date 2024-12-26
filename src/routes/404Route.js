const path = require("path");

function PaginaNoEncontrada(req, res){
    res.status(404).render('404');
}
module.exports = { PaginaNoEncontrada };