import { Request, Response } from 'express'
import {
  getInfoBookByIsbnService,
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  getBooksByUserIdService,
  updateBookByIdService,
  getAllBooksService
} from '../services'
import asyncHandler from 'express-async-handler'

const getInfoBookByIsbnController = asyncHandler(async (request: Request, response: Response) => {
  const { isbn } = request.params
  const book = await getInfoBookByIsbnService(isbn)
  response.status(200).send(book)
})

const getBookByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const book = await getBookByIdService(id)
  response.status(200).send(book)
})

const createBookController = asyncHandler(async (request: Request, response: Response) => {
  const {
    title, authors, publisher,
    publishedDate, description, pageCount,
    categories, imageLinks, language, previewLink
  } = request.body

  const { userId } = request.headers

  const newBook = await createBookService({
    userId: String(userId),
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    imageLinks,
    language,
    previewLink
  })
  response.status(201).send(newBook)
})

const deleteBookByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const { userId } = request.headers
  const book = await deleteBookByIdService(id, String(userId))
  response.status(200).send(book)
})

const getBooksByUserIdController = asyncHandler(async (request: Request, response: Response) => {
  const { userId } = request.headers
  const books = await getBooksByUserIdService(String(userId))
  response.status(200).send(books)
})

const getAllBooksController = asyncHandler(async (_request: Request, response: Response) => {
  const books = await getAllBooksService()
  response.status(200).send(books)
})

const updateBookByIdController = asyncHandler(async (request: Request, response: Response) => {
  const { id } = request.params
  const {
    title, authors, publisher,
    publishedDate, description, pageCount,
    categories, imageLinks, language, previewLink
  } = request.body
  const { userId } = request.headers
  const newBook = await updateBookByIdService(id, {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    imageLinks,
    language,
    previewLink
  }, String(userId))
  response.status(200).send(newBook)
})

export {
  getInfoBookByIsbnController,
  getBookByIdController,
  createBookController,
  deleteBookByIdController,
  getBooksByUserIdController,
  updateBookByIdController,
  getAllBooksController
}
