import mongoose, { Schema } from 'mongoose'

export interface ILike {
  bookId: string
  bookTitle: string
  bookUserId: string
  userLikedId: string
  userLikedName: string
  isVisualized: boolean
}

export type ILikeResponse = ILike & {
  _id: string
  createdAt: string
}

const LikeSchema: Schema<ILike> = new Schema({
  bookId: {
    type: String,
    required: true
  },
  bookTitle: {
    type: String,
    required: true
  },
  bookUserId: {
    type: String,
    required: true
  },
  userLikedId: {
    type: String,
    required: true
  },
  userLikedName: {
    type: String,
    required: true
  },
  isVisualized: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true,
  versionKey: false
})

const Like = mongoose.model<ILike>('Like', LikeSchema)

export { Like }
