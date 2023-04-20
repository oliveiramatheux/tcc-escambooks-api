import { Router } from 'express'
import { authenticationController } from '../controllers'
import {
  validateParamsAuthentication,
  validateParamsAuthEmailVerify,
  validateParamsAuthSendEmailVerify,
  validateParamsAuthSendPasswordReset,
  verifyToken,
  validateParamsAuthResetPasswordToken,
  validateParamsAuthResetPassword
} from '../middlewares'

const router = Router()

router.post('/', validateParamsAuthentication, authenticationController.authenticateUserController)

router.post('/verify', validateParamsAuthEmailVerify, authenticationController.authVerifyEmailController)

router.post('/send/email-verify', validateParamsAuthSendEmailVerify, authenticationController.authSendEmailVerifyController)

router.post('/send/email-reset-password', validateParamsAuthSendPasswordReset, authenticationController.authSendPasswordResetController)

router.post('/reset-password-token', validateParamsAuthResetPasswordToken, authenticationController.authResetPasswordTokenController)

router.use(verifyToken).post('/reset-password', validateParamsAuthResetPassword, authenticationController.authResetPasswordController)

export default router
