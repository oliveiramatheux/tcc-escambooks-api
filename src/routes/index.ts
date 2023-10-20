import { Router } from 'express'
import healthCheckRouter from './health-check'
import usersRouter from './users'
import authenticationRouter from './auth'
import booksRouter from './books'
import likesRouter from './likes'
import adminRouter from './admin'
import matchesRouter from './match'

const router = Router()

router.use('/health-check', healthCheckRouter)
router.use('/users', usersRouter)
router.use('/admin', adminRouter)
router.use('/auth', authenticationRouter)
router.use('/books', booksRouter)
router.use('/likes', likesRouter)
router.use('/match', matchesRouter)

export default router
