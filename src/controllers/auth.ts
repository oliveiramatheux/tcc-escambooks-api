import { Request, Response } from 'express'
import {
  authenticateUserService, authVerifyEmailService,
  authSendEmailVerifyService, authSendPasswordResetService,
  authResetPasswordService, authResetPasswordTokenService
} from '../services'
import asyncHandler from 'express-async-handler'

const authenticateUserController = asyncHandler(async (request: Request, response: Response) => {
  const { email, password } = request.body
  const user = await authenticateUserService({ email, password })
  response.status(200).send(user)
})

const authVerifyEmailController = asyncHandler(async (request: Request, response: Response) => {
  const { token } = request.body
  const user = await authVerifyEmailService(token)
  response.status(200).send(user)
})

const authSendEmailVerifyController = asyncHandler(async (request: Request, response: Response) => {
  const { email } = request.body
  const user = await authSendEmailVerifyService({ email })
  response.status(200).send(user)
})

const authSendPasswordResetController = asyncHandler(async (request: Request, response: Response) => {
  const { email } = request.body
  const user = await authSendPasswordResetService({ email })
  response.status(200).send(user)
})

const authResetPasswordTokenController = asyncHandler(async (request: Request, response: Response) => {
  const { email, resetToken, newPassword } = request.body
  const user = await authResetPasswordTokenService({ email, resetToken, newPassword })
  response.status(200).send(user)
})

const authResetPasswordController = asyncHandler(async (request: Request, response: Response) => {
  const { email, password, newPassword } = request.body
  const { userId } = request.headers
  const user = await authResetPasswordService({ email, password, newPassword }, String(userId))
  response.status(200).send(user)
})

export {
  authenticateUserController,
  authVerifyEmailController,
  authSendEmailVerifyController,
  authSendPasswordResetController,
  authResetPasswordTokenController,
  authResetPasswordController
}
