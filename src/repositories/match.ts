import { MatchFormated } from 'services'
import { IMatch, Match, IMatchResponse, MatchUser } from '../models'
import { emitEvent } from './event'

export type MatchUpdate = {
  books?: string[]
  users?: MatchUser[]
  likes?: string[]
  usersConfirmed?: string[]
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
  users.forEach(user => emitEvent(`match-received-${user.userId}`, match))
}

export const matchDeletedNotification = (match: MatchFormated) => {
  const { users } = match
  users.forEach(user => emitEvent(`match-deleted-${user.userId}`, match))
}

export const getMatchesByUserId = async (userId: string): Promise<IMatchResponse[]> => {
  try {
    return await Match.find<IMatchResponse>({ users: { $elemMatch: { userId } } })
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

export const deleteMatchByBookId = async (bookId: string): Promise<IMatchResponse | null> => {
  try {
    return await Match.findOneAndDelete<IMatchResponse>({ books: { $in: [bookId] } })
  } catch {
    return null
  }
}

export const deleteMatchesByUserId = async (userId: string) => {
  try {
    return await Match.deleteMany({ users: { $elemMatch: { userId } } })
  } catch {
    return null
  }
}

export const getMatchById = async (matchId: string): Promise<IMatchResponse | null> => {
  try {
    return await Match.findById<IMatchResponse>({ _id: matchId })
  } catch {
    return null
  }
}
