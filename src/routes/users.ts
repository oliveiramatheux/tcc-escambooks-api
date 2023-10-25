import { Router } from 'express'
import { usersController, booksController } from '../controllers'
import {
  validateParamsGetUserById,
  validateParamsCreateUser,
  validateParamsDeleteUserById,
  validateParamsUpdateUser,
  verifyToken,
  validateParamsGetBooksByUserId,
  validateParamsGetUsersByName
} from '../middlewares'

const router = Router()

router.get(
  '/allUsers',
  verifyToken,
  usersController.getAllUsersController
)

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
  validateParamsGetBooksByUserId,
  booksController.getBooksByUserIdController
)

router.get(
  '/username/:name',
  validateParamsGetUsersByName,
  verifyToken,
  usersController.getUsersByNameController
)

export default router
