import { Router } from 'express'
import { validateParamsUpdateMatch, verifyToken } from '../middlewares'
import { getMatchesByUserIdController, updateMatchByIdController } from '../controllers'

const router = Router()

router.get('/', verifyToken, getMatchesByUserIdController)

router.patch('/:id', verifyToken, validateParamsUpdateMatch, updateMatchByIdController)

export default router
