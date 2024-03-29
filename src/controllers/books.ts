import { Request, Response } from 'express'
import {
  getInfoBookByIsbnService,
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  getBooksByUserIdService,
  updateBookByIdService,
  getAllBooksService,
  getLikedBooksService,
  getBooksByTitleService
} from '../services'
import asyncHandler from 'express-async-handler'

const getInfoBookByIsbnController = asyncHandler(
  async (request: Request, response: Response) => {
    const { isbn } = request.params
    const book = await getInfoBookByIsbnService(isbn)
    response.status(200).send(book)
  }
)

const getBookByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const book = await getBookByIdService(id)
    response.status(200).send(book)
  }
)

const createBookController = asyncHandler(
  async (request: Request, response: Response) => {
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageUrl,
      imageName,
      language,
      previewLink
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
      imageUrl,
      imageName,
      language,
      previewLink
    })
    response.status(201).send(newBook)
  }
)

const deleteBookByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const { userId, admin } = request.headers
    const book = await deleteBookByIdService(id, String(userId), !!admin)
    response.status(200).send(book)
  }
)

const getBooksByUserIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const { userId } = request.headers
    const books = await getBooksByUserIdService(String(id), String(userId))
    response.status(200).send(books)
  }
)

const getAllBooksController = asyncHandler(
  async (request: Request, response: Response) => {
    const { userId } = request.headers
    const books = await getAllBooksService(String(userId))
    response.status(200).send(books)
  }
)

const getLikedBooksController = asyncHandler(
  async (request: Request, response: Response) => {
    const { userId } = request.headers
    const books = await getLikedBooksService(String(userId))
    response.status(200).send(books)
  }
)

const updateBookByIdController = asyncHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageUrl,
      imageName,
      language,
      previewLink
    } = request.body
    const { userId, admin } = request.headers
    const newBook = await updateBookByIdService(
      id,
      {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        pageCount,
        categories,
        imageUrl,
        imageName,
        language,
        previewLink
      },
      String(userId),
      !!admin
    )
    response.status(200).send(newBook)
  }
)

const getBooksByTitleController = asyncHandler(
  async (request: Request, response: Response) => {
    const { title } = request.params
    const { userId } = request.headers
    const books = await getBooksByTitleService(String(userId), title)
    response.status(200).send(books)
  }
)

export {
  getInfoBookByIsbnController,
  getBookByIdController,
  createBookController,
  deleteBookByIdController,
  getBooksByUserIdController,
  updateBookByIdController,
  getAllBooksController,
  getLikedBooksController,
  getBooksByTitleController
}
