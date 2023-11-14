import { Router } from 'express'
import { validateParamsGetMatchDetailsById, validateParamsUpdateMatch, verifyToken } from '../middlewares'
import { getMatchDetailsByIdController, getMatchesByUserIdController, updateMatchByIdController } from '../controllers'

const router = Router()

router.get('/', verifyToken, getMatchesByUserIdController)

router.patch('/:id', verifyToken, validateParamsUpdateMatch, updateMatchByIdController)

router.get('/:id', verifyToken, validateParamsGetMatchDetailsById, getMatchDetailsByIdController)

export default router
