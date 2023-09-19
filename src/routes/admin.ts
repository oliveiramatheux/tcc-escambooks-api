import { Router } from 'express'
import { usersController } from '../controllers'
import {
  verifyAdminToken,
  verifyToken
} from '../middlewares'

const router = Router()

router.get(
  '/users',
  usersController.getAllUsersController,
  verifyToken,
  verifyAdminToken
)

export default router
