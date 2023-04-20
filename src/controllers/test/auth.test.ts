import supertest from 'supertest'
import server from '../../server'
import {
  mockAuthResponse,
  mockAuthRequest,
  mockAuthVerifyEmailRequest,
  mockAuthVerifyEmailResponse,
  mockAuthSendEmail,
  mockAuthResetPasswordTokenRequest,
  mockAuthResetPasswordResponse,
  mockAuthResetPasswordRequest
}
  from './mock'
import {
  authenticateUserService,
  authVerifyEmailService,
  authSendEmailVerifyService,
  authSendPasswordResetService,
  authResetPasswordTokenService,
  authResetPasswordService
} from '../../services'
import { generateDefaultToken } from '../../utils/auth'

jest.mock('../../services')

describe('test auth controller', () => {
  describe('test authenticateUserController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authenticateUserService as jest.MockedFunction<typeof authenticateUserService>
      mockAuthUser.mockResolvedValue(mockAuthResponse)
      const response = await supertest(server)
        .post('/api/auth').send(mockAuthRequest)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authenticateUserService as jest.MockedFunction<typeof authenticateUserService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth').send(mockAuthRequest)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test authVerifyEmailController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authVerifyEmailService as jest.MockedFunction<typeof authVerifyEmailService>
      mockAuthUser.mockResolvedValue(mockAuthVerifyEmailResponse)
      const response = await supertest(server)
        .post('/api/auth/verify').send(mockAuthVerifyEmailRequest)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthVerifyEmailResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authVerifyEmailService as jest.MockedFunction<typeof authVerifyEmailService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth/verify').send(mockAuthVerifyEmailRequest)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test authSendEmailVerifyController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authSendEmailVerifyService as jest.MockedFunction<typeof authSendEmailVerifyService>
      mockAuthUser.mockResolvedValue(mockAuthSendEmail)
      const response = await supertest(server)
        .post('/api/auth/send/email-verify').send(mockAuthSendEmail)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthSendEmail)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authSendEmailVerifyService as jest.MockedFunction<typeof authSendEmailVerifyService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth/send/email-verify').send(mockAuthSendEmail)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test authSendPasswordResetController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authSendPasswordResetService as jest.MockedFunction<typeof authSendPasswordResetService>
      mockAuthUser.mockResolvedValue(mockAuthSendEmail)
      const response = await supertest(server)
        .post('/api/auth/send/email-reset-password').send(mockAuthSendEmail)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthSendEmail)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authSendPasswordResetService as jest.MockedFunction<typeof authSendPasswordResetService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth/send/email-reset-password').send(mockAuthSendEmail)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test authResetPasswordTokenController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authResetPasswordTokenService as jest.MockedFunction<typeof authResetPasswordTokenService>
      mockAuthUser.mockResolvedValue(mockAuthResetPasswordResponse)
      const response = await supertest(server)
        .post('/api/auth/reset-password-token').send(mockAuthResetPasswordTokenRequest)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthResetPasswordResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authResetPasswordTokenService as jest.MockedFunction<typeof authResetPasswordTokenService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth/reset-password-token').send(mockAuthResetPasswordTokenRequest)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test authResetPasswordController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockAuthUser = authResetPasswordService as jest.MockedFunction<typeof authResetPasswordService>
      mockAuthUser.mockResolvedValue(mockAuthResetPasswordResponse)
      const response = await supertest(server)
        .post('/api/auth/reset-password').send(mockAuthResetPasswordRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAuthResetPasswordResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockAuthUser = authResetPasswordService as jest.MockedFunction<typeof authResetPasswordService>
      mockAuthUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/auth/reset-password').send(mockAuthResetPasswordRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })
})
