const { Router } = require('express')
const path = require('path');
const router = Router()
const { ValidarCertificadoPDF } = require('../controllers/validar.controller.js');

router.post('/validar', async(req, res)=> await ValidarCertificadoPDF(req, res))

module.exports = router