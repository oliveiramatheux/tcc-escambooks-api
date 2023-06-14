import {
  mockIBookResponse,
  mockIdRequestGetBookById,
  mockRequestCreateBook,
  mockIdRequestBookById,
  mockRequestUpdateBook,
  mockGetBooksByUserId,
  mockIBooksResponse,
  mockGetBookByIsbn
} from './mock'

import {
  getInfoBookByIsbn,
  getBookById,
  createBook,
  deleteBookById,
  getBooksByUserId,
  updateBookById
} from '../index'
import { GOOGLE_API_BASE_URL, GOOGLE_API_BASE_PATH } from '../books'
import { Book } from '../../models'
import config from '../../config'
import axios, { AxiosResponse } from 'axios'

jest.mock('../../models')
jest.mock('axios')

describe('test books repositories', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  describe('test getInfoBookByIsbn function', () => {
    it('should return ok when is called with isbn send correct', async () => {
      const mockAxios = axios.get as jest.MockedFunction<typeof axios.get>
      mockAxios.mockResolvedValue({ data: { ...mockIBookResponse } } as AxiosResponse<any>)
      const { isbn } = mockGetBookByIsbn
      const result = await getInfoBookByIsbn(isbn)
      expect(mockAxios).toBeCalledTimes(1)
      expect(mockAxios).toBeCalledWith(`${GOOGLE_API_BASE_URL}${GOOGLE_API_BASE_PATH}?q=isbn:${isbn}&key=${config.applicationKeyGoogleBooksApi}`)
      expect(result).toEqual({ data: { ...mockIBookResponse } })
    })
  })

  describe('test getBookById function', () => {
    it('should return ok when is called with user id send correct', async () => {
      const BookModel = Book.findById as jest.Mock
      BookModel.mockResolvedValue(mockIBookResponse)
      const { id } = mockIdRequestGetBookById
      const result = await getBookById(id)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(mockIBookResponse)
    })
    it('should return null when is called with user id send incorrect', async () => {
      const BookModel = Book.findById as jest.Mock
      BookModel.mockResolvedValue(null)
      const { id } = mockIdRequestGetBookById
      const result = await getBookById(id)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(null)
    })
  })

  describe('test createBook function', () => {
    it('should return ok when is called with body send correct', async () => {
      const BookModel = Book.create as jest.MockedFunction<typeof Book.create>
      BookModel.mockResolvedValue(mockIBookResponse as never)
      const result = await createBook(mockRequestCreateBook)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith(mockRequestCreateBook)
      expect(result).toEqual(mockIBookResponse)
    })
    it('should return null when is called with body send incorrect', async () => {
      const BookModel = Book.create as jest.MockedFunction<typeof Book.create>
      BookModel.mockResolvedValue(null as never)
      const result = await createBook(mockRequestCreateBook)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith(mockRequestCreateBook)
      expect(result).toEqual(null)
    })
  })

  describe('test deleteBookById function', () => {
    it('should return ok when is called with user id send correct', async () => {
      const BookModel = Book.findByIdAndRemove as jest.Mock
      BookModel.mockResolvedValue(mockIBookResponse)
      const { id } = mockIdRequestBookById
      const result = await deleteBookById(id)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(mockIBookResponse)
    })
    it('should return null when is called with user id send incorrect', async () => {
      const BookModel = Book.findByIdAndRemove as jest.Mock
      BookModel.mockResolvedValue(null)
      const { id } = mockIdRequestBookById
      const result = await deleteBookById(id)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(null)
    })
  })

  describe('test updateBookById function', () => {
    it('should return ok when is called with body and id send correct', async () => {
      const BookModel = Book.findOneAndUpdate as jest.Mock
      BookModel.mockResolvedValue(mockIBookResponse)
      const { id } = mockIdRequestBookById
      const result = await updateBookById(id, mockRequestUpdateBook)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id }, mockRequestUpdateBook, {
        new: true
      })
      expect(result).toEqual(mockIBookResponse)
    })
    it('should return null when is called with body or id send incorrect', async () => {
      const BookModel = Book.findOneAndUpdate as jest.Mock
      BookModel.mockResolvedValue(null)
      const { id } = mockIdRequestBookById
      const result = await updateBookById(id, mockRequestUpdateBook)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ _id: id }, mockRequestUpdateBook, {
        new: true
      })
      expect(result).toEqual(null)
    })
  })

  describe('test getBooksByUserId function', () => {
    it('should return ok when is called with userId send correct', async () => {
      const BookModel = Book.find as jest.Mock
      BookModel.mockResolvedValue(mockIBooksResponse)
      const { userId } = mockGetBooksByUserId
      const result = await getBooksByUserId(userId)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ userId }, null,
        { sort: { createdAt: 'desc' } })
      expect(result).toEqual(mockIBooksResponse)
    })
    it('should return null when is called with email send incorrect', async () => {
      const BookModel = Book.find as jest.Mock
      BookModel.mockResolvedValue(null)
      const { userId } = mockGetBooksByUserId
      const result = await getBooksByUserId(userId)
      expect(BookModel).toBeCalledTimes(1)
      expect(BookModel).toBeCalledWith({ userId }, null,
        { sort: { createdAt: 'desc' } })
      expect(result).toEqual(null)
    })
  })
})
