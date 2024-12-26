const { Router } = require('express')
const path = require('path');
const { LoginControllerSystem } = require('../controllers/login.controller.js');
const { PaginaNoEncontrada } = require('./404Route.js');
const router = Router()

router.get('/', (req, res)=>{
    // console.log('/');
    const page = {
        title: 'UNTELS - Certificados',
    }
    res.status(200).render('index', page);
    // res.status(200).render('certificadoAlumno', page);
    // res.status(200).render('mantenimiento');
});
router.get('/mantenimiento', (req, res)=>{
    console.log('/mantenimiento');
    res.status(200).render('mantenimiento');
    // res.status(200).render('certificadoAlumno', page);
});
// router.get('/login', (req, res)=>{
//     console.log(req.body);
//     console.log('/login');
//     res.status(200).render('login');
// });
// router.post('/login', (req, res)=>{
//     const data = req.body
//     const {username, password} = req.body
//     if(!username || !password){
//         return res.status(400).json({message: 'Debes enviar el nombre de usuario y la contraseña'})
//     }
//     console.log(data);
//     console.log('/login');
//     res.status(200).json(data);
// });
router.get('/validar', (req, res)=>{
    console.log(req.body);
    console.log('/validar');
    res.status(200).render('validar');
});



// ENRUTADOR PARA EL USUARIO ADMINISTRADOR
router.get('/home', (req, res)=>{
    console.log('/home');
    const HomePath = path.join(__dirname, '../', 'views', 'dashboard.html')
    res.status(200).render('dashboard');
});


// router.get('/dashboard', (req, res)=>{
//     console.log('/dashboard');
//     const HomePath = path.join(__dirname, '../../public/index.html')
//     res.status(200).sendFile(HomePath);
// });
// router.get('/codigo-qr', (req, res)=>{
//     console.log('/codigo-qr');
//     res.status(200).send('existe ruta');
// });
// router.get('/crear-qr', (req, res)=>{
//     console.log('/crear-qr');
//     res.status(200).send('existe ruta');
// });
// router.get('/analiticas', (req, res)=>{
//     console.log('/analiticas');
//     res.status(200).send('existe ruta');
// });
// router.get('/mi-cuenta', (req, res)=>{
//     console.log('/mi-cuenta');
//     res.status(200).send('existe ruta');
// });
// router.get('/usuarios', (req, res)=>{
//     console.log('/usuarios');
//     res.status(200).send('existe ruta');
// });
// router.get('/administracion', (req, res)=>{
//     console.log('/administracion');
//     res.status(200).send('existe ruta');
// });
// router.get('/faq', (req, res)=>{
//     console.log('/faq');
//     res.status(200).send('existe ruta');
// });

module.exports = router;