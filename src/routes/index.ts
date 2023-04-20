import { Router } from 'express'
import healthCheckRouter from './health-check'
import usersRouter from './users'
import authenticationRouter from './auth'
import booksRouter from './books'

const router = Router()

router.use('/health-check', healthCheckRouter)
router.use('/users', usersRouter)
router.use('/auth', authenticationRouter)
router.use('/books', booksRouter)

export default router
