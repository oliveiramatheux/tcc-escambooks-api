import {
  authenticateUserByEmailAndPassword,
  getUserByEmail,
  updateUserById,
  sendEmail
} from '../repositories'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authSecret, defaultEmailFrom } from '../config/auth'
import { handleError } from '../utils/errors'
import { IUserResponse, INewUser } from '../models/users'
import { objectFormatter } from '../utils/objectFormatter'
import randomstring from 'randomstring'
import {
  contentTemplateEmailConfirmation,
  contentTemplateResetPasswordConfirmation,
  contentTemplateResetPasswordFeedback
} from './templates'
import config from '../config'
import Handlebars from 'handlebars'

const templateEmailConfirmartion = Handlebars.compile(
  contentTemplateEmailConfirmation
)
const templateResetPasswordConfirmation = Handlebars.compile(
  contentTemplateResetPasswordConfirmation
)
const templateResetPasswordFeedback = Handlebars.compile(
  contentTemplateResetPasswordFeedback
)

export interface UserAuthenticate {
  email: string
  password: string
}

export interface UserAuthenticateResponse {
  _id?: string
  name: string
  email: string
  password?: string
  active?: boolean
  imageUrl?: string
  admin?: boolean
}

export interface UserSendEmail {
  email: string
}

export interface UserResetPasswordWithToken {
  email: string
  resetToken: string
  newPassword: string
}

export interface UserResetPassword {
  email: string
  password: string
  newPassword: string
}

type AuthResponse = {
  _id: string
  name: string
  email: string
  token: string
  imageUrl: string
  admin?: boolean
}

export interface GenerateTokenParams {
  email: string
  secretToken: string
  id: string
  admin?: boolean
}

const generateToken = (generateTokenParams: Partial<GenerateTokenParams>) =>
  jwt.sign({ ...generateTokenParams }, authSecret.secret, {
    expiresIn: 86400
  })

const verifyTokenAndEmail = (token: string) => {
  try {
    const { email, secretToken } = jwt.verify(
      token,
      authSecret.secret
    ) as Partial<GenerateTokenParams>
    return { email, secretToken }
  } catch {
    throw handleError(401, 'Token invalid')
  }
}

const formatResponse = (
  { _id, name, email, imageUrl, admin }: UserAuthenticateResponse,
  token: string
): AuthResponse => ({
  _id,
  name,
  email,
  token,
  imageUrl,
  admin
})

const formatResponseVerifyEmailUser = (response: IUserResponse) => ({
  _id: response._id,
  name: response.name,
  email: response.email
})

const authenticateUserService = async (user: UserAuthenticate) => {
  const userResponse: UserAuthenticateResponse =
    await authenticateUserByEmailAndPassword(user.email)

  if (!userResponse) {
    throw handleError(404, 'User not found')
  }

  if (!userResponse.active) {
    throw handleError(401, 'This user not verify email')
  }

  if (!(await bcrypt.compare(user.password, userResponse.password))) {
    throw handleError(400, 'Invalid password')
  }

  const token = generateToken({
    id: userResponse._id,
    admin: userResponse.admin
  })

  return formatResponse(userResponse, token)
}

const authVerifyEmailService = async (token: string) => {
  const { email, secretToken } = verifyTokenAndEmail(token)

  const userVerifyEmailAlredyExist: IUserResponse = await getUserByEmail(email)

  if (!userVerifyEmailAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  if (userVerifyEmailAlredyExist.active) {
    throw handleError(401, 'This user alredy verify email')
  }

  if (userVerifyEmailAlredyExist.secretToken !== secretToken) {
    throw handleError(401, 'Invalid secret token for this email')
  }

  const newUserResponse: IUserResponse = await updateUserById(
    userVerifyEmailAlredyExist._id,
    objectFormatter({
      secretToken: '',
      active: true
    }) as INewUser
  )

  if (!newUserResponse) {
    throw handleError(400, 'An error occured when verify this email')
  }

  return formatResponseVerifyEmailUser(newUserResponse)
}

const authSendEmailVerifyService = async (user: UserSendEmail) => {
  const userVerifyEmailAlredyExist: IUserResponse = await getUserByEmail(
    user.email
  )
  if (!userVerifyEmailAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  if (userVerifyEmailAlredyExist.active) {
    throw handleError(401, 'This user alredy verify email')
  }

  const token = generateToken({
    email: userVerifyEmailAlredyExist.email,
    secretToken: userVerifyEmailAlredyExist.secretToken
  })

  const template = {
    from: defaultEmailFrom,
    subject: 'Email de confirmação',
    html: templateEmailConfirmartion({
      url: config.applicationFrontUrl,
      userName: userVerifyEmailAlredyExist.name,
      userToken: token
    })
  }
  sendEmail(userVerifyEmailAlredyExist, template)

  return { email: userVerifyEmailAlredyExist.email }
}

const authSendPasswordResetService = async (user: UserSendEmail) => {
  const userVerifyEmailAlredyExist: IUserResponse =
    await authenticateUserByEmailAndPassword(user.email)
  if (!userVerifyEmailAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  if (
    !userVerifyEmailAlredyExist.password ||
    userVerifyEmailAlredyExist.password === ''
  ) {
    throw handleError(401, 'This user dont have password')
  }

  const template = {
    from: defaultEmailFrom,
    subject: 'Email de Redefinição de senha',
    html: templateResetPasswordConfirmation({
      url: config.applicationFrontUrl,
      userName: userVerifyEmailAlredyExist.name,
      userEmail: userVerifyEmailAlredyExist.email,
      userToken: userVerifyEmailAlredyExist.resetToken
    })
  }
  sendEmail(userVerifyEmailAlredyExist, template)

  return { email: userVerifyEmailAlredyExist.email }
}

const authResetPasswordTokenService = async (
  user: UserResetPasswordWithToken
) => {
  const userVerifyEmailAlredyExist: IUserResponse =
    await authenticateUserByEmailAndPassword(user.email)
  if (!userVerifyEmailAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  if (userVerifyEmailAlredyExist.resetToken !== user.resetToken) {
    throw handleError(401, 'Invalid reset token for this email')
  }

  if (
    !userVerifyEmailAlredyExist.password ||
    userVerifyEmailAlredyExist.password === ''
  ) {
    throw handleError(401, 'This user dont have password')
  }

  const newPasswordHashed = await bcrypt.hash(user.newPassword, 10)
  const newResetToken = randomstring.generate({
    length: 8,
    charset: 'numeric'
  })

  const newUserResponse: IUserResponse = await updateUserById(
    userVerifyEmailAlredyExist._id,
    objectFormatter<INewUser>({
      password: newPasswordHashed,
      resetToken: newResetToken
    })
  )

  if (!newUserResponse) {
    throw handleError(400, 'An error occured when update this password')
  }

  const template = {
    from: defaultEmailFrom,
    subject: 'Senha alterada',
    html: templateResetPasswordFeedback({
      userName: userVerifyEmailAlredyExist.name
    })
  }
  sendEmail(userVerifyEmailAlredyExist, template)

  return { email: userVerifyEmailAlredyExist.email }
}

const authResetPasswordService = async (
  user: UserResetPassword,
  userId: string
) => {
  const userVerifyEmailAlredyExist: IUserResponse =
    await authenticateUserByEmailAndPassword(user.email)
  if (!userVerifyEmailAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  if (String(userVerifyEmailAlredyExist._id) !== userId) {
    throw handleError(401, 'This user not have permission of update password')
  }

  if (
    !userVerifyEmailAlredyExist.password ||
    userVerifyEmailAlredyExist.password === ''
  ) {
    throw handleError(401, 'This user dont have password')
  }

  if (
    !(await bcrypt.compare(user.password, userVerifyEmailAlredyExist.password))
  ) {
    throw handleError(401, 'Invalid password')
  }

  if (user.password === user.newPassword) {
    throw handleError(
      401,
      'The new password cannot be the same as the password'
    )
  }

  const newPasswordHashed = await bcrypt.hash(user.newPassword, 10)

  const newUserResponse: IUserResponse = await updateUserById(
    userVerifyEmailAlredyExist._id,
    objectFormatter<INewUser>({ password: newPasswordHashed })
  )

  if (!newUserResponse) {
    throw handleError(400, 'An error occured when update this password')
  }

  const template = {
    from: defaultEmailFrom,
    subject: 'Senha alterada',
    html: templateResetPasswordFeedback({
      userName: userVerifyEmailAlredyExist.name
    })
  }
  sendEmail(userVerifyEmailAlredyExist, template)

  return { email: userVerifyEmailAlredyExist.email }
}

export {
  authenticateUserService,
  generateToken,
  authVerifyEmailService,
  authSendEmailVerifyService,
  authSendPasswordResetService,
  authResetPasswordTokenService,
  authResetPasswordService
}
