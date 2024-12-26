const { Router } = require('express')
const viewsRoutes = require('./pageRoute.js')
const captchaRoutes = require('./captchaRoute.js')
const certificadoRoutes = require('./certificadoRoute.js')
const qrRoutes = require('./qrRoutes.js');

const router = Router()

router.use('/', viewsRoutes)
router.use('/captcha', captchaRoutes)
router.use('/certificado', certificadoRoutes)
router.use('/api', qrRoutes)

module.exports = router;