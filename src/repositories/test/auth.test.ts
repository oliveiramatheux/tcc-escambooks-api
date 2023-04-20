import {
  mockIUserResponseWithPassword,
  mockedIUserResponse
} from './mock'

import {
  authenticateUserByEmailAndPassword,
  sendEmail
} from '../index'

import { defaultEmailFrom } from '../../config/auth'

import { User } from '../../models'
import { clientEmail } from '../../client'

jest.mock('../../models')
jest.mock('../../client')

describe('test auth repositories', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  describe('test authenticateUserByEmailAndPassword function', () => {
    it('should return ok when is called with emailsend correct', async () => {
      const UserModel = User.findOne as jest.Mock

      UserModel.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(mockIUserResponseWithPassword)
      }))

      const { email } = mockIUserResponseWithPassword
      const result = await authenticateUserByEmailAndPassword(email)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ email })
      expect(result).toEqual(mockIUserResponseWithPassword)
    })
    it('should return null when is called with user id send incorrect', async () => {
      const UserModel = User.findOne as jest.Mock

      UserModel.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(null)
      }))

      const { email } = mockIUserResponseWithPassword
      const result = await authenticateUserByEmailAndPassword(email)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ email })
      expect(result).toEqual(null)
    })
  })

  describe('test sendEmail function', () => {
    it('should return ok when is called with email send correct', async () => {
      const clientSendEmail = clientEmail.sendMail as jest.MockedFunction<typeof clientEmail.sendMail>
      clientSendEmail.mockResolvedValue('email send')

      await sendEmail(mockedIUserResponse, {
        from: defaultEmailFrom,
        html: `<h2>Olá ${mockedIUserResponse.name}</h2><br>Para confirmar seu email clique no link abaixo.<br><a href="https://www.escambooks.com/verify-email?email=${mockedIUserResponse.email}&token=${mockedIUserResponse.secretToken}">Página de verificação</a>`,
        subject: 'Email de confirmação'
      })

      expect(clientSendEmail).toBeCalledTimes(1)
      expect(clientSendEmail).toBeCalledWith({
        from: defaultEmailFrom,
        to: mockedIUserResponse.email,
        html: `<h2>Olá ${mockedIUserResponse.name}</h2><br>Para confirmar seu email clique no link abaixo.<br><a href="https://www.escambooks.com/verify-email?email=${mockedIUserResponse.email}&token=${mockedIUserResponse.secretToken}">Página de verificação</a>`,
        subject: 'Email de confirmação'
      })
    })
  })
})
