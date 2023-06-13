import { Book } from '../models'
import { IBookResponse, INewBook, IUpdateBook } from '../models/books'
import axios from 'axios'
import config from '../config'

export const GOOGLE_API_BASE_URL = 'https://www.googleapis.com/books'
export const GOOGLE_API_BASE_PATH = '/v1/volumes'

const getInfoBookByIsbn = async (isbn: string) => {
  const book = await axios.get(
    `${GOOGLE_API_BASE_URL}${GOOGLE_API_BASE_PATH}?q=isbn:${isbn}&key=${config.applicationKeyGoogleBooksApi}`
  )
  return book
}

const getBookById = async (id: string) => {
  const book = (await Book.findById({ _id: id })) as IBookResponse
  return book
}

const createBook = async (newUser: INewBook) => {
  const book = (await Book.create(newUser)) as unknown as IBookResponse
  return book
}

const deleteBookById = async (id: string) => {
  const book = (await Book.findByIdAndRemove({ _id: id })) as IBookResponse
  return book
}

const getBooksByUserId = async (userId: string) => {
  const book = (await Book.find({ userId }, null, {
    sort: { createdAt: 'desc' }
  })) as IBookResponse[]
  return book
}

const getAllBooks = async () => {
  const books = (await Book.find({}, null, {
    sort: { createdAt: 'desc' }
  })) as IBookResponse[]
  return books
}

const updateBookById = async (id: string, newBook: IUpdateBook) => {
  const book = (await Book.findOneAndUpdate({ _id: id }, newBook, {
    new: true
  })) as IBookResponse
  return book
}

export {
  getInfoBookByIsbn,
  getBookById,
  createBook,
  deleteBookById,
  getBooksByUserId,
  getAllBooks,
  updateBookById
}
