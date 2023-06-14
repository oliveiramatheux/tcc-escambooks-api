import { Router } from 'express'
import { usersController, booksController } from '../controllers'
import {
  validateParamsGetUserById,
  validateParamsCreateUser,
  validateParamsDeleteUserById,
  validateParamsUpdateUser,
  verifyToken
} from '../middlewares'

const router = Router()

router.get(
  '/:id',
  validateParamsGetUserById,
  usersController.getUserByIdController
)

router.post('/', validateParamsCreateUser, usersController.createUserController)

router.delete(
  '/:id',
  validateParamsDeleteUserById,
  usersController.deleteUserByIdController
)

router.patch(
  '/:id',
  verifyToken,
  validateParamsUpdateUser,
  usersController.updateUserByIdController
)

router.get(
  '/:id/books',
  verifyToken,
  booksController.getBooksByUserIdController
)

export default router
