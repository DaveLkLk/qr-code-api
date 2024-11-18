import { Router} from 'express'
import { generateQR, generateQRWithExpiry } from '../controllers/qrController.js'

const router = Router()

router.get('/qr/generate', generateQR)
router.get('/qr/generate-with-limit', generateQRWithExpiry)

export default router;