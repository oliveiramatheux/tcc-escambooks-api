import supertest from 'supertest'
import server from '../../server'
import {
  mockIdRequestGetUserById,
  mockIdRequestDeleteUserById,
  mockRequestCreateUser,
  mockIUserResponse,
  mockResponseCreateUser,
  mockUpdateUserResponse,
  mockUpdateUserRequest,
  mockIdRequestUpdateUserById
}
  from './mock'
import { getUser, createUser, deleteUser, updateUser } from '../../services'
import { generateDefaultToken } from '../../utils/auth'

jest.mock('../../services')

describe('test users controller', () => {
  describe('test getUserByIdController function', () => {
    it('should return 200 when is called with user id send correct', async () => {
      const mockGetUser = getUser as jest.MockedFunction<typeof getUser>
      mockGetUser.mockResolvedValue(mockIUserResponse)
      const { id } = mockIdRequestGetUserById
      const response = await supertest(server)
        .get(`/api/users/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockIUserResponse)
    })
    it('should return 500 when is called with user id send correct but server error', async () => {
      const mockGetUser = getUser as jest.MockedFunction<typeof getUser>
      mockGetUser.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockIdRequestGetUserById
      const response = await supertest(server)
        .get(`/api/users/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test createUserController function', () => {
    it('should return 201 when is called with body send correct', async () => {
      const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>
      mockCreateUser.mockResolvedValue(mockResponseCreateUser)
      const response = await supertest(server)
        .post('/api/users').send(mockRequestCreateUser)

      expect(response.status).toBe(201)
      expect(response.body).toEqual(mockResponseCreateUser)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>
      mockCreateUser.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/users').send(mockRequestCreateUser)

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test deleteUserByIdController function', () => {
    it('should return 200 when is called with user id send correct', async () => {
      const mockDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>
      mockDeleteUser.mockResolvedValue({ ...mockIUserResponse, userBooksImages: [] })
      const { id } = mockIdRequestDeleteUserById
      const response = await supertest(server)
        .delete(`/api/users/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ ...mockIUserResponse, userBooksImages: [] })
    })
    it('should return 500 when is called with user id send correct but server error', async () => {
      const mockDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>
      mockDeleteUser.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockIdRequestDeleteUserById
      const response = await supertest(server)
        .delete(`/api/users/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test updateUserByIdController function', () => {
    it('should return 200 when is called with user id and body send correct', async () => {
      const mockUpdateUser = updateUser as jest.MockedFunction<typeof updateUser>
      mockUpdateUser.mockResolvedValue(mockUpdateUserResponse)
      const { id } = mockIdRequestUpdateUserById
      const response = await supertest(server)
        .patch(`/api/users/${id}`).send(mockUpdateUserRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockUpdateUserResponse)
    })
    it('should return 500 when is called with user id and body send correct but server error', async () => {
      const mockUpdateUser = updateUser as jest.MockedFunction<typeof updateUser>
      mockUpdateUser.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockIdRequestUpdateUserById
      const response = await supertest(server)
        .patch(`/api/users/${id}`).send(mockUpdateUserRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })
})
