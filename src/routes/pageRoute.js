import { Router} from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router()

router.get('/', (req, res)=>{
    console.log('/');
    const HomePath = path.join(__dirname, '../../public/index.html')
    res.status(200).sendFile(HomePath);
});
router.get('/home', (req, res)=>{
    console.log('/home');
    const HomePath = path.join(__dirname, '../../public/index.html')
    res.status(200).sendFile(HomePath);
});
router.get('/dashboard', (req, res)=>{
    console.log('/dashboard');
    const HomePath = path.join(__dirname, '../../public/index.html')
    res.status(200).sendFile(HomePath);
});
router.get('/codigo-qr', (req, res)=>{
    console.log('/codigo-qr');
    res.status(200).send('existe ruta');
});
router.get('/crear-qr', (req, res)=>{
    console.log('/crear-qr');
    res.status(200).send('existe ruta');
});
router.get('/analiticas', (req, res)=>{
    console.log('/analiticas');
    res.status(200).send('existe ruta');
});
router.get('/mi-cuenta', (req, res)=>{
    console.log('/mi-cuenta');
    res.status(200).send('existe ruta');
});
router.get('/usuarios', (req, res)=>{
    console.log('/usuarios');
    res.status(200).send('existe ruta');
});
router.get('/administracion', (req, res)=>{
    console.log('/administracion');
    res.status(200).send('existe ruta');
});
router.get('/faq', (req, res)=>{
    console.log('/faq');
    res.status(200).send('existe ruta');
});

export default router;