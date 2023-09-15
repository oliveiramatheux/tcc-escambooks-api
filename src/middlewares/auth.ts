import { celebrate, Joi, Segments } from 'celebrate'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authSecret } from '../config/auth'

const validateParamsAuthentication = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

const validateParamsAuthEmailVerify = celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().required()
  })
})

const validateParamsAuthSendEmailVerify = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required()
  })
})

const validateParamsAuthSendPasswordReset = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required()
  })
})

const validateParamsAuthResetPasswordToken = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    resetToken: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
  })
})

const validateParamsAuthResetPassword = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required()
  })
})

const verifyToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).send('Error: No token provided')
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return response.status(401).send('Error: Token error')
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send('Error: Token malformatted')
  }

  jwt.verify(
    token,
    authSecret.secret,
    (err: Error, decoded: jwt.JwtPayload) => {
      if (err) {
        return response.status(401).send('Error: Token invalid')
      }
      request.headers.userId = decoded.id
      request.headers.admin = decoded.admin
      return next()
    }
  )
}

const verifyAdminToken = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const isAdmin = request.headers.admin

  if (!isAdmin) {
    return response.status(401).send('Error: Invalid admin token')
  }

  return next()
}

export {
  validateParamsAuthentication,
  verifyToken,
  verifyAdminToken,
  validateParamsAuthEmailVerify,
  validateParamsAuthSendEmailVerify,
  validateParamsAuthSendPasswordReset,
  validateParamsAuthResetPassword,
  validateParamsAuthResetPasswordToken
}
