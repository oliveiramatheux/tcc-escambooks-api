import {
  IBookResponse,
  INewBook,
  IUpdateBook,
  IBookExternalApiResponse,
  BooksReponse,
  BookWithUserAndLike
} from '../models/books'
import {
  getInfoBookByIsbn,
  getBookById,
  createBook,
  deleteBookById,
  getBooksByUserId,
  updateBookById,
  getAllBooks,
  getLikeByUserLikedIdAndBookId,
  getLikesByUserLikedId,
  getBooksByIds
} from '../repositories'
import { handleError } from '../utils/errors'
import { objectFormatter } from '../utils/objectFormatter'
import { deleteLikesByBookIdService } from './likes'
import { getUser } from './users'

const formatBookResponse = ({
  _id,
  userId,
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
  previewLink,
  createdAt
}: IBookResponse) => ({
  id: _id,
  userId,
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
  previewLink,
  date: createdAt
})

const formatBooksResponse = async (
  userId: string,
  books: IBookResponse[]
): Promise<BooksReponse> => {
  const formatedBooks = books.map(formatBookResponse)

  const booksWithUser = formatedBooks.map(async (book) => {
    const user = await getUser(book.userId)
    return {
      ...book,
      userName: user.name,
      userEmail: user.email,
      userImageUrl: user.imageUrl
    }
  })

  const responseBooksWithUser = await Promise.all(booksWithUser)

  const booksWithUserAndLike = responseBooksWithUser.map(async (book) => {
    const like = await getLikeByUserLikedIdAndBookId(userId, book.id)
    if (like && like.bookId === String(book.id)) {
      return { ...book, alreadyLike: { likeId: like._id } }
    }
    return book
  })

  const reponseBooksWithUserAndLike: BookWithUserAndLike[] = await Promise.all(
    booksWithUserAndLike
  )

  return {
    items: reponseBooksWithUserAndLike,
    totalItems: books.length
  }
}

const formatExternalBookResponse = (book: IBookExternalApiResponse) => {
  return {
    title: book.title,
    authors: book.authors,
    publisher: book.publisher,
    publishedDate: book.publishedDate,
    description: book.description,
    pageCount: book.pageCount,
    categories: book.categories,
    imageUrl: book.imageUrl,
    imageName: book.imageName,
    language: book.language,
    previewLink: book.previewLink
  }
}

const getInfoBookByIsbnService = async (isbn: string) => {
  const bookResponse = await getInfoBookByIsbn(isbn)

  if (!bookResponse.data) {
    throw handleError(400, 'An error ocurred when search this book')
  }

  if (bookResponse.data.totalItems === 0) {
    throw handleError(404, 'The book with this isbn was not found')
  }

  return formatExternalBookResponse(bookResponse.data.items[0].volumeInfo)
}

const getBookByIdService = async (id: string) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not found')
  }

  return formatBookResponse(bookResponse)
}

const getBooksByUserIdService = async (
  userId: string,
  likesFromUserId: string
) => {
  const bookResponse = await getBooksByUserId(userId)

  if (!bookResponse.length) {
    throw handleError(404, 'This user not have books')
  }

  return await formatBooksResponse(likesFromUserId, bookResponse)
}

const getLikedBooksService = async (userId: string) => {
  const likesResponse = await getLikesByUserLikedId(userId)
  const booksIds = likesResponse.map((like) => like.bookId)
  const bookResponse = await getBooksByIds(booksIds)

  if (!bookResponse.length) {
    throw handleError(404, 'This user not have books')
  }

  return await formatBooksResponse(userId, bookResponse)
}

const getAllBooksService = async (userId: string) => {
  const books = await getAllBooks()

  if (!books.length) {
    throw handleError(404, 'Not have any books')
  }

  return await formatBooksResponse(userId, books)
}

const createBookService = async (newBook: INewBook) => {
  const newBookResponse = await createBook(newBook)

  if (!newBookResponse) {
    throw handleError(400, 'An error ocurred when create a book')
  }

  return formatBookResponse(newBookResponse)
}

const deleteBookByIdService = async (id: string, userId: string) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not found')
  }

  if (String(bookResponse.userId) !== userId) {
    throw handleError(401, 'This user not have permission of delete this book')
  }

  const bookDeleteResponse = await deleteBookById(id)
  await deleteLikesByBookIdService(id)

  return formatBookResponse(bookDeleteResponse)
}

const updateBookByIdService = async (
  id: string,
  newBook: IUpdateBook,
  userId: string
) => {
  const bookResponse = await getBookById(id)

  if (!bookResponse) {
    throw handleError(404, 'Book not exist')
  }

  if (String(bookResponse.userId) !== userId) {
    throw handleError(401, 'This user not have permission of update this book')
  }

  const bookUpdateResponse = await updateBookById(
    id,
    objectFormatter(newBook) as IUpdateBook
  )
  return formatBookResponse(bookUpdateResponse)
}

export {
  getInfoBookByIsbnService,
  getBookByIdService,
  createBookService,
  deleteBookByIdService,
  getBooksByUserIdService,
  updateBookByIdService,
  getAllBooksService,
  getLikedBooksService
}
