import { Router } from 'express'
import { likesController } from '../controllers'
import {
  verifyToken,
  validateParamsGetLikeById,
  validateParamsCreateLike,
  validateParamsDeleteLikeById,
  validateParamsUpdateLike,
  validateParamsGetLikesByBookUserId,
  validateParamsGetLikesByUserLikedId,
  validateParamsDeleteLikesByBookId
} from '../middlewares'

const router = Router()

router.get('/bookUserId/:bookUserId', verifyToken, validateParamsGetLikesByBookUserId, likesController.getLikesByBookUserIdController)

router.get('/userLikedId/:userLikedId', verifyToken, validateParamsGetLikesByUserLikedId, likesController.getLikesByUserLikedIdController)

router.get('/:id', verifyToken, validateParamsGetLikeById, likesController.getLikeByIdController)

router.post('/', verifyToken, validateParamsCreateLike, likesController.createLikeController)

router.delete('/:id', verifyToken, validateParamsDeleteLikeById, likesController.deleteLikeController)

router.delete('/bookId/:bookId', verifyToken, validateParamsDeleteLikesByBookId, likesController.deleteLikesByBookIdController)

router.patch('/:id', verifyToken, validateParamsUpdateLike, likesController.updateLikeByIdController)

export default router
