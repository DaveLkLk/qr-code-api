require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');
const path = require('path');
const routes = require('./src/routes/index.js');
// const { PaginaNoEncontrada } = require('/src/routes/404Route.js');
const { PaginaNoEncontrada } = require('./src/routes/404Route.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));
app.use('/', routes);
app.use((req,res) => PaginaNoEncontrada(req,res));
app.use((err,req,res,next)=> {
    console.error(err.message);
    res.status(500).render('404');
})
module.exports = app;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
