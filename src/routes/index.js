import { Router } from "express";
import pageRoutes from './pageRoute.js';
import qrRoutes from './qrRoutes.js';

const router = Router()

router.use('/', pageRoutes)
router.use('/api', qrRoutes)

export default router;