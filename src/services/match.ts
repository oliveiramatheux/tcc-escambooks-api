import { handleError } from '../utils/errors'
import { MatchUpdate, getMatchesByUserId, updateMatchById } from '../repositories'
import { IMatchResponse, MatchUser } from '../models'

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
    date: response.createdAt
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
