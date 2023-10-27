import { Router } from 'express'
import { usersController } from '../controllers'
import {
  verifyAdminToken,
  verifyToken
} from '../middlewares'

const router = Router()

router.get(
  '/users',
  verifyToken,
  verifyAdminToken,
  usersController.getAllUsersController
)

export default router
