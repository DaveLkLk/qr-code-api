const { Router } = require('express')
const path = require('path');
const router = Router()
const { ValidarCertificadoPDF, DataCertificado } = require('../controllers/validar.controller.js');

router.post('/validar', async(req, res)=> await ValidarCertificadoPDF(req, res))
router.post('/validar-data', async(req, res) => await DataCertificado(req, res))

module.exports = router