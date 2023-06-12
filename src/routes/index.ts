import { Router } from 'express'
import healthCheckRouter from './health-check'
import usersRouter from './users'
import authenticationRouter from './auth'
import booksRouter from './books'
import likesRouter from './likes'

const router = Router()

router.use('/health-check', healthCheckRouter)
router.use('/users', usersRouter)
router.use('/auth', authenticationRouter)
router.use('/books', booksRouter)
router.use('/likes', likesRouter)

export default router
