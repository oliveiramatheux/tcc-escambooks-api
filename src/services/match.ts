import { handleError } from '../utils/errors'
import { MatchUpdate, deleteMatchByBookId, getMatchById, getMatchesByUserId, matchDeletedNotification, updateMatchById } from '../repositories'
import { IMatchResponse, MatchUser } from '../models'
import { buildFormattedDate } from '../utils'
import { getUser } from './users'
import { getBookByIdService } from './books'

export type MatchFormated = {
  id: string
  books: string[]
  users: MatchUser[]
  likes: string[]
  usersConfirmed?: string[]
  isVisualized: boolean
  date?: string
}

export const formatMatchResponse = (response: IMatchResponse, userId: string): MatchFormated => {
  const isVisualized = response.users.find(user => user.userId === userId).isVisualized

  return {
    id: response._id,
    books: response.books,
    users: response.users,
    likes: response.likes,
    usersConfirmed: response.usersConfirmed,
    isVisualized,
    date: buildFormattedDate(response.createdAt)
  }
}

const formatMatchesResponse = (matches: IMatchResponse[], userId: string) => {
  const matchesFormated = matches.map(match => formatMatchResponse(match, userId))
  return (
    {
      items: matchesFormated,
      totalItems: matchesFormated.length,
      totalItemsNotVisualized: matchesFormated.filter(match => !match.isVisualized).length
    }
  )
}

export const getMatchesByUserIdService = async (userId: string) => {
  const matches = await getMatchesByUserId(userId)
  if (!matches) {
    throw handleError(404, 'This user not have matches')
  }
  return formatMatchesResponse(matches, userId)
}

export const updateMatchByIdService = async (id: string, match: MatchUpdate, userId: string) => {
  const matchResponse = await updateMatchById(id, match)
  if (!matchResponse) {
    throw handleError(400, 'An error occured when update this match')
  }
  return formatMatchResponse(matchResponse, userId)
}

export const deleteMatchByBookIdService = async (bookId: string, userId: string) => {
  const match = await deleteMatchByBookId(bookId)
  if (match) {
    matchDeletedNotification(formatMatchResponse(match, userId))
  }
}

export const getMatchDetailsByIdService = async (matchId: string, userId: string) => {
  const match = await getMatchById(matchId)

  if (!match) {
    throw handleError(404, 'Match not found')
  }

  const otherUserId = match.users.find(user => user.userId !== userId).userId

  const currentUser = await getUser(userId)
  const otherUser = await getUser(otherUserId)

  const booksMapped = match.books.map(async book => {
    return await getBookByIdService(book)
  })

  const books = await Promise.all(booksMapped)

  const currentUserBook = books.find(book => book.userId === userId)
  const otherUserBook = books.find(book => book.userId !== userId)

  return { match: formatMatchResponse(match, userId), currentUser, otherUser, currentUserBook, otherUserBook }
}
