import { Router } from 'express'
import { booksController } from '../controllers'
import {
  validateParamsGetInfoBookByIsbn,
  validateParamsGetBookById,
  validateParamsCreateBook,
  validateParamsDeleteBookById,
  verifyToken,
  validateParamsUpdateBookById,
  validateParamsGetBooksByTitle
} from '../middlewares'

const router = Router()
router.use(verifyToken)

router.get(
  '/isbn/:isbn',
  validateParamsGetInfoBookByIsbn,
  booksController.getInfoBookByIsbnController
)

router.get('/list', verifyToken, booksController.getAllBooksController)

router.get('/liked', verifyToken, booksController.getLikedBooksController)

router.get(
  '/title/:title',
  validateParamsGetBooksByTitle,
  verifyToken,
  booksController.getBooksByTitleController
)

router.get(
  '/:id',
  validateParamsGetBookById,
  booksController.getBookByIdController
)

router.post('/', validateParamsCreateBook, booksController.createBookController)

router.delete(
  '/:id',
  validateParamsDeleteBookById,
  booksController.deleteBookByIdController
)

router.patch(
  '/:id',
  validateParamsUpdateBookById,
  booksController.updateBookByIdController
)

export default router
