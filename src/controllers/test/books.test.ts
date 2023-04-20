import supertest from 'supertest'
import server from '../../server'
import {
  mockGetInfoBookByIsbnRequest,
  mockGetInfoBookByIsbnResponse,
  mockBookId,
  mockGetBookByIdResponse,
  mockBookRequest,
  mockBookResponse,
  mockDeleteBookByIdResponse,
  mockGetBooksByUserIdResponse
} from './mock'
import {
  getInfoBookByIsbnService,
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  getBooksByUserIdService,
  updateBookByIdService
} from '../../services'
import { generateDefaultToken } from '../../utils/auth'

jest.mock('../../services')

describe('test books controller', () => {
  describe('test getInfoBookByIsbnController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = getInfoBookByIsbnService as jest.MockedFunction<typeof getInfoBookByIsbnService>
      mockedBook.mockResolvedValue(mockGetInfoBookByIsbnResponse)
      const { isbn } = mockGetInfoBookByIsbnRequest
      const response = await supertest(server)
        .get(`/api/books/isbn/${isbn}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockGetInfoBookByIsbnResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = getInfoBookByIsbnService as jest.MockedFunction<typeof getInfoBookByIsbnService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const { isbn } = mockGetInfoBookByIsbnRequest
      const response = await supertest(server)
        .get(`/api/books/isbn/${isbn}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test getBookByIdController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = getBookByIdService as jest.MockedFunction<typeof getBookByIdService>
      mockedBook.mockResolvedValue(mockGetBookByIdResponse)
      const { id } = mockBookId
      const response = await supertest(server)
        .get(`/api/books/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockGetBookByIdResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = getBookByIdService as jest.MockedFunction<typeof getBookByIdService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockBookId
      const response = await supertest(server)
        .get(`/api/books/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test createBookController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = createBookService as jest.MockedFunction<typeof createBookService>
      mockedBook.mockResolvedValue(mockBookResponse)
      const response = await supertest(server)
        .post('/api/books').send(mockBookRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(201)
      expect(response.body).toEqual(mockBookResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = createBookService as jest.MockedFunction<typeof createBookService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .post('/api/books').send(mockBookRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test deleteBookByIdController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = deleteBookByIdService as jest.MockedFunction<typeof deleteBookByIdService>
      mockedBook.mockResolvedValue(mockDeleteBookByIdResponse)
      const { id } = mockBookId
      const response = await supertest(server)
        .delete(`/api/books/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockDeleteBookByIdResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = deleteBookByIdService as jest.MockedFunction<typeof deleteBookByIdService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockBookId
      const response = await supertest(server)
        .delete(`/api/books/${id}`).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test getBooksByUserIdController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = getBooksByUserIdService as jest.MockedFunction<typeof getBooksByUserIdService>
      mockedBook.mockResolvedValue(mockGetBooksByUserIdResponse)
      const response = await supertest(server)
        .get('/api/users/books/list').set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockGetBooksByUserIdResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = getBooksByUserIdService as jest.MockedFunction<typeof getBooksByUserIdService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const response = await supertest(server)
        .get('/api/users/books/list').set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })

  describe('test updateBookByIdController function', () => {
    it('should return 200 when is called with body send correct', async () => {
      const mockedBook = updateBookByIdService as jest.MockedFunction<typeof updateBookByIdService>
      mockedBook.mockResolvedValue(mockBookResponse)
      const { id } = mockBookId
      const response = await supertest(server)
        .patch(`/api/books/${id}`).send(mockBookRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockBookResponse)
    })
    it('should return 500 when is called with body send correct but server error', async () => {
      const mockedBook = updateBookByIdService as jest.MockedFunction<typeof updateBookByIdService>
      mockedBook.mockRejectedValue(new Error('unknown server error'))
      const { id } = mockBookId
      const response = await supertest(server)
        .patch(`/api/books/${id}`).send(mockBookRequest).set({ Authorization: `Bearer ${generateDefaultToken}` })

      expect(response.status).toBe(500)
      expect(response.text).toBe('Error: unknown server error')
    })
  })
})
