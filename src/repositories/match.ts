import { MatchFormated } from 'services'
import { IMatch, Match, IMatchResponse } from '../models'
import { emitEvent } from './event'

export type MatchUpdate = {
  books?: string[]
  users?: string[]
  likes?: string[]
  usersConfirmed?: string[]
  isVisualized?: boolean
}

export const createMatch = async (match: IMatch) => {
  try {
    return await Match.create<IMatchResponse>(match)
  } catch {
    return null
  }
}

export const deleteMatchByLikeId = async (likeId: string): Promise<IMatchResponse | null> => {
  try {
    return await Match.findOneAndDelete<IMatchResponse>({ likes: { $in: [likeId] } })
  } catch {
    return null
  }
}

export const verifyAlreadyMatch = async (users: string[], book: string): Promise<IMatchResponse | null> => {
  try {
    return await Match.findOne<IMatchResponse>({ users, books: { $in: [book] } })
  } catch {
    return null
  }
}

export const matchReceivedNotification = (match: MatchFormated) => {
  const { users } = match
  users.forEach(user => emitEvent(`match-received-${user}`, match))
}

export const matchDeletedNotification = (match: MatchFormated) => {
  const { users } = match
  users.forEach(user => emitEvent(`match-deleted-${user}`, match))
}

export const getMatchesByUserId = async (userId: string): Promise<IMatchResponse[]> => {
  try {
    return await Match.find<IMatchResponse>({ users: { $in: [userId] } })
  } catch {
    return []
  }
}

export const updateMatchById = async (id: string, match: MatchUpdate): Promise<IMatchResponse | null> => {
  try {
    return await Match.findOneAndUpdate<IMatchResponse>({ _id: id }, match, {
      new: true
    })
  } catch {
    return null
  }
}
