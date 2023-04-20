import { Router } from 'express'
import { healthCheckController } from '../controllers'

const router = Router()

router.get('/', healthCheckController.check)

export default router
