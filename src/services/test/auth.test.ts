import {
  UserAuthenticateResponse,
  UserAuthenticateRequest,
  UserAuthenticateServiceResponse,
  authVerifyEmailServiceRequest,
  authVerifyEmailServiceResponse,
  mockedIUserResponse,
  mockedIUserUpdateUserByIdResponse,
  authSendPasswordResetServiceRequest,
  mockedIUserResponseWithPassword,
  authResetPasswordTokenServiceRequest,
  authResetPasswordServiceRequest,
  tokenAuthVerifyEmail
} from './mock'
import {
  authenticateUserService,
  generateToken,
  authVerifyEmailService,
  authSendEmailVerifyService,
  authSendPasswordResetService,
  authResetPasswordTokenService,
  authResetPasswordService
} from '../index'
import {
  authenticateUserByEmailAndPassword,
  getUserByEmail,
  updateUserById,
  sendEmail
} from '../../repositories'
import { sign, verify } from 'jsonwebtoken'
import { compare } from 'bcrypt'

jest.mock('jsonwebtoken')
jest.mock('../../repositories')
jest.mock('bcrypt')

describe('test auth services', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  describe('test generateToken function', () => {
    it('should return ok when id send correct', async () => {
      const params = {
        id: '60c365be4168d05c46a6c7be',
        email: 'teste@teste.com',
        secretToken: '12345678'
      }
      const object = '[object Object]'
      const expiresIn = { expiresIn: 86400 }
      const mockedSign = sign as jest.MockedFunction<typeof sign>
      mockedSign.mockReturnValue({ token: '1234' } as never)

      generateToken(params)
      expect(sign).toBeCalledTimes(1)
      expect(sign).toBeCalledWith(params, object, expiresIn)
      expect(sign).toReturnWith({ token: '1234' })
    })
  })

  describe('test authenticateUserService function', () => {
    it('should return ok when is called with email and password send correct', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(UserAuthenticateResponse)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(true as never)

      const result = await authenticateUserService(UserAuthenticateRequest)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(UserAuthenticateRequest.email)
      expect(result).toEqual(UserAuthenticateServiceResponse)
    })

    it('should return error when is called with email send incorrect and user not found', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(null)

      expect(async () => await authenticateUserService(UserAuthenticateRequest)).rejects.toThrowError('User not found')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(UserAuthenticateRequest.email)
    })

    it('should return error when is called with email send correct but user not verify email', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue({ ...UserAuthenticateResponse, active: false })

      expect(async () => await authenticateUserService(UserAuthenticateRequest)).rejects.toThrowError('This user not verify email')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(UserAuthenticateRequest.email)
    })

    it('should return error when is called with email send correct but password incorrect', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(UserAuthenticateResponse)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(false as never)

      expect(async () => await authenticateUserService(UserAuthenticateRequest)).rejects.toThrowError('Invalid password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(UserAuthenticateRequest.email)
    })
  })

  describe('test authVerifyEmailService function', () => {
    it('should return ok when is called with email send correct', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockReturnValue({ email: 'teste@teste.com', secretToken: '12345678' })

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue(mockedIUserResponse)

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(mockedIUserUpdateUserByIdResponse)

      const result = await authVerifyEmailService(tokenAuthVerifyEmail)

      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(mockedIUserResponse.email)

      expect(mockedUpdateUserById).toBeCalledTimes(1)
      expect(mockedUpdateUserById).toBeCalledWith(mockedIUserResponse._id, { secretToken: '', active: true })

      expect(result).toEqual(authVerifyEmailServiceResponse)
    })

    it('should return error when is called with token invalid', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockImplementation(() => { throw new Error('Token invalid') })

      expect(async () => await authVerifyEmailService(tokenAuthVerifyEmail)).rejects.toThrowError('Token invalid')
    })

    it('should return error when is called with email send incorrect and user not exist', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockReturnValue({ email: 'teste@teste.com', secretToken: '12345678' })

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue(null)

      expect(async () => await authVerifyEmailService(tokenAuthVerifyEmail)).rejects.toThrowError('User not exist')
      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith('teste@teste.com')
    })

    it('should return error when is called with email send correct but user already verify email', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockReturnValue({ email: 'teste@teste.com', secretToken: '12345678' })

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue({ ...mockedIUserResponse, active: true })

      expect(async () => await authVerifyEmailService(tokenAuthVerifyEmail)).rejects.toThrowError('This user alredy verify email')
      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(mockedIUserResponse.email)
    })

    it('should return error when is called with email send correct and user not verify email but secretToken send is invalid', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockReturnValue({ email: 'teste@teste.com', secretToken: '12345678' })

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue({ ...mockedIUserResponse, secretToken: '87654321' })

      expect(async () => await authVerifyEmailService(tokenAuthVerifyEmail)).rejects.toThrowError('Invalid secret token for this email')
      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(mockedIUserResponse.email)
    })

    it('should return error when is called with email send correct and user not verify email and secretToken send correct but occured error when update user infos', async () => {
      const mockedVerify = verify as jest.Mock
      mockedVerify.mockReturnValue({ email: 'teste@teste.com', secretToken: '12345678' })

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue(mockedIUserResponse)

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(null)

      expect(async () => await authVerifyEmailService(tokenAuthVerifyEmail)).rejects.toThrowError('An error occured when verify this email')
    })
  })

  describe('test authSendEmailVerifyService function', () => {
    it('should return ok when is called with email send correct', async () => {
      const mockedSign = sign as jest.Mock
      mockedSign.mockReturnValue('tokenTest123')

      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue(mockedIUserResponse)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      const result = await authSendEmailVerifyService(authVerifyEmailServiceRequest)

      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(authVerifyEmailServiceRequest.email)

      expect(mockSendEmailConfirmService).toBeCalledTimes(1)

      expect(result).toEqual({ email: mockedIUserResponse.email })
    })

    it('should return error when is called with email send incorrect and user not exist', async () => {
      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue(null)

      expect(async () => await authSendEmailVerifyService(authVerifyEmailServiceRequest)).rejects.toThrowError('User not exist')
      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(authVerifyEmailServiceRequest.email)
    })

    it('should return error when is called with email send correct but user already verify email', async () => {
      const mockedGetUserByEmail = getUserByEmail as jest.Mock
      mockedGetUserByEmail.mockResolvedValue({ ...mockedIUserResponse, active: true })

      expect(async () => await authSendEmailVerifyService(authVerifyEmailServiceRequest)).rejects.toThrowError('This user alredy verify email')
      expect(mockedGetUserByEmail).toBeCalledTimes(1)
      expect(mockedGetUserByEmail).toBeCalledWith(authVerifyEmailServiceRequest.email)
    })
  })

  describe('test authSendPasswordResetService function', () => {
    it('should return ok when is called with email send correct', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      const result = await authSendPasswordResetService(authSendPasswordResetServiceRequest)

      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)

      expect(mockSendEmailConfirmService).toBeCalledTimes(1)

      expect(result).toEqual({ email: mockedIUserResponseWithPassword.email })
    })

    it('should return error when is called with email send incorrect and user not exist', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(null)

      expect(async () => await authSendPasswordResetService(authSendPasswordResetServiceRequest)).rejects.toThrowError('User not exist')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but user password is incorrect', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue({ ...mockedIUserResponseWithPassword, password: '' })

      expect(async () => await authSendPasswordResetService(authSendPasswordResetServiceRequest)).rejects.toThrowError('This user dont have password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })
  })

  describe('test authResetPasswordTokenService function', () => {
    it('should return ok when is called with email, reset token and new password send correct', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(mockedIUserResponseWithPassword)

      const result = await authResetPasswordTokenService(authResetPasswordTokenServiceRequest)

      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authResetPasswordTokenServiceRequest.email)

      expect(mockSendEmailConfirmService).toBeCalledTimes(1)

      expect(result).toEqual({ email: mockedIUserResponseWithPassword.email })
    })

    it('should return error when is called with email send incorrect and user not exist', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(null)

      expect(async () => await authResetPasswordTokenService(authResetPasswordTokenServiceRequest)).rejects.toThrowError('User not exist')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but resetToken is invalid', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue({ ...mockedIUserResponseWithPassword, resetToken: '87654321' })

      expect(async () => await authResetPasswordTokenService(authResetPasswordTokenServiceRequest)).rejects.toThrowError('Invalid reset token for this email')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but this user not have password', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue({ ...mockedIUserResponseWithPassword, password: '' })

      expect(async () => await authResetPasswordTokenService(authResetPasswordTokenServiceRequest)).rejects.toThrowError('This user dont have password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return ok when is called with email, reset token and new password send correct but an error occured when update password', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(null)

      expect(async () => await authResetPasswordTokenService(authResetPasswordTokenServiceRequest)).rejects.toThrowError('An error occured when update this password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })
  })

  describe('test authResetPasswordService function', () => {
    it('should return ok when is called with email, password, new password and user id send correct', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(true as never)

      const result = await authResetPasswordService(authResetPasswordServiceRequest, mockedIUserResponseWithPassword._id)

      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authResetPasswordTokenServiceRequest.email)

      expect(mockSendEmailConfirmService).toBeCalledTimes(1)

      expect(result).toEqual({ email: mockedIUserResponseWithPassword.email })
    })

    it('should return error when is called with email send incorrect and user not exist', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(null)

      expect(async () => await authResetPasswordService(authResetPasswordServiceRequest, mockedIUserResponseWithPassword._id)).rejects.toThrowError('User not exist')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with userId send incorrect', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      expect(async () => await authResetPasswordService(authResetPasswordServiceRequest, '12345678teste')).rejects.toThrowError('This user not have permission of update password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but user not have password', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue({ ...mockedIUserResponseWithPassword, password: '' })

      expect(async () => await authResetPasswordService(authResetPasswordServiceRequest, mockedIUserResponseWithPassword._id)).rejects.toThrowError('This user dont have password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but password send incorrect', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(false as never)

      expect(async () => await authResetPasswordService(authResetPasswordServiceRequest, mockedIUserResponseWithPassword._id)).rejects.toThrowError('Invalid password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email send correct but new password is equal at the current password', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(true as never)

      expect(async () => await authResetPasswordService({ ...authResetPasswordServiceRequest, newPassword: 'teste@123' }, mockedIUserResponseWithPassword._id)).rejects.toThrowError('The new password cannot be the same as the password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })

    it('should return error when is called with email, password, new password and user id send correct but an error occured when update password', async () => {
      const mockAuthenticateUserByEmailAndPassword = authenticateUserByEmailAndPassword as jest.Mock
      mockAuthenticateUserByEmailAndPassword.mockResolvedValue(mockedIUserResponseWithPassword)

      const mockedCompare = compare as jest.MockedFunction<typeof compare>
      mockedCompare.mockResolvedValue(true as never)

      const mockedUpdateUserById = updateUserById as jest.Mock
      mockedUpdateUserById.mockResolvedValue(null)

      expect(async () => await authResetPasswordService(authResetPasswordServiceRequest, mockedIUserResponseWithPassword._id)).rejects.toThrowError('An error occured when update this password')
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledTimes(1)
      expect(mockAuthenticateUserByEmailAndPassword).toBeCalledWith(authSendPasswordResetServiceRequest.email)
    })
  })
})
