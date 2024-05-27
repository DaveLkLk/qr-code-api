import { Router} from 'express'
import { generateQR, generateQRWithExpiry } from '../controllers/qrController.js'

const router = Router()

router.get('/generate', generateQR)
router.get('/generate-with-limit', generateQRWithExpiry)

export default router;