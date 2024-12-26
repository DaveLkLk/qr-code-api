const { generateQR, generateQRWithExpiry } = require('../controllers/qrController.js')
const { CargarDataBD } = require('../controllers/excel.controller.js')
const { Router } = require('express')
const { ValidarCertificadoPDF } = require('../controllers/validar.controller.js')
const { renamePDFTable } = require('../controllers/renamePDF.controller.js')
const { generarPlantilla } = require('../controllers/generarPlantilla.controller.js')
const router = Router()


router.get('/qr/generate', generateQR)
router.get('/qr/generate-with-limit', generateQRWithExpiry)
// router.get('/xlsx/read', READ_EXCEL)
router.get('/xlsx/read', async(req, res)=> CargarDataBD(req, res))
router.get('/xlsx/generar', async(req, res)=> generarPlantilla(req, res))
router.post('/validar', async(req, res)=> await ValidarCertificadoPDF(req, res))
router.post('/rename', async(req, res)=> renamePDFTable(req, res))


module.exports = router;