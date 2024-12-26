const session = require('express-session');
const bodyParser = require('body-parser');
const { Captcha} = require('captcha-canvas')
const { Router } = require('express')
const router = Router()

router.get('/generar', (req, res)=>{
    const captcha = new Captcha();
    captcha.async = true;//hacerlo asincrono para renderizar la imagen
    captcha.addDecoy();//añade ruido al fondo
    captcha.drawTrace();//añade una linea al captcha
    captcha.drawCaptcha();// dibujar el texto
    req.session.captchaText = captcha.text;
    // enviar la respuesta
    res
})
router.post('/validar', (req, res)=>{

})
module.exports = router