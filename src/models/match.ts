import mongoose, { Schema } from 'mongoose'

export type MatchUser = {
  userId: string
  isVisualized: boolean
}

export interface IMatch {
  books: string[]
  users: MatchUser[]
  likes: string[]
  usersConfirmed?: string[]
}

export type IMatchResponse = IMatch & {
  _id: string
  createdAt: string
}

const MatchSchema: Schema<IMatch> = new Schema({
  books: {
    type: [],
    required: true
  },
  users: {
    type: [],
    required: true
  },
  likes: {
    type: [],
    required: true
  },
  usersConfirmed: {
    type: [],
    default: []
  }
},
{
  timestamps: true,
  versionKey: false
})

const Match = mongoose.model<IMatch>('Match', MatchSchema)

export { Match }
