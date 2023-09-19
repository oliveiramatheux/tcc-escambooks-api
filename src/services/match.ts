import { handleError } from '../utils/errors'
import { MatchUpdate, getMatchesByUserId, updateMatchById } from '../repositories'
import { IMatchResponse } from '../models'

export type MatchFormated = {
  id: string
  books: string[]
  users: string[]
  likes: string[]
  usersConfirmed?: string[]
  isVisualized?: boolean
  date?: string
}

export const formatMatchResponse = (response: IMatchResponse): MatchFormated => {
  return {
    id: response._id,
    books: response.books,
    users: response.users,
    likes: response.likes,
    usersConfirmed: response.usersConfirmed,
    isVisualized: response.isVisualized,
    date: response.createdAt
  }
}

const formatMatchesResponse = (matches: IMatchResponse[]) => {
  return (
    {
      items: matches.map(formatMatchResponse),
      totalItems: matches.length,
      totalItemsNotVisualized: matches.filter(match => !match.isVisualized).length
    }
  )
}

export const getMatchesByUserIdService = async (userId: string) => {
  const matches = await getMatchesByUserId(userId)
  if (!matches) {
    throw handleError(404, 'This user not have matches')
  }
  return formatMatchesResponse(matches)
}

export const updateMatchByIdService = async (id: string, match: MatchUpdate) => {
  const matchResponse = await updateMatchById(id, match)
  if (!matchResponse) {
    throw handleError(400, 'An error occured when update this match')
  }
  return formatMatchResponse(matchResponse)
}
