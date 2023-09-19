import mongoose, { Schema } from 'mongoose'

export interface IMatch {
  books: string[]
  users: string[]
  likes: string[]
  usersConfirmed?: string[]
  isVisualized?: boolean
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
  },
  isVisualized: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

const Match = mongoose.model<IMatch>('Match', MatchSchema)

export { Match }
