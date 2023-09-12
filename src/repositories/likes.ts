import { ILikeFormatedResponse } from 'services/likes'
import { Like, ILike, ILikeResponse } from '../models'
import { emitEvent } from './event'

const getLikeById = async (id: string) => {
  return await Like.findById<ILikeResponse>({ _id: id })
}

const createLike = async (like: ILike) => {
  return await Like.create<ILikeResponse>(like)
}

const likeReceivedNotification = (like: ILikeFormatedResponse) => {
  const { bookUserId } = like
  emitEvent(`like-received-${bookUserId}`, like)
}

const deleteLike = async (id: string) => {
  return await Like.findByIdAndRemove<ILikeResponse>({ _id: id })
}

const likeDeletedNotification = (like: ILikeFormatedResponse) => {
  const { bookUserId } = like
  emitEvent(`like-deleted-${bookUserId}`, like)
}

const updateLikeById = async (id: string, like: ILike) => {
  return await Like.findOneAndUpdate<ILikeResponse>({ _id: id }, like, {
    new: true
  })
}

const getLikesByBookUserId = async (bookUserId: string) => {
  return await Like.find<ILikeResponse>({ bookUserId })
}

const getLikesByUserLikedId = async (userLikedId: string) => {
  return await Like.find<ILikeResponse>({ userLikedId })
}

const getLikeByUserLikedIdAndBookId = async (userLikedId: string, bookId: string) => {
  return await Like.findOne<ILikeResponse>({ userLikedId, bookId })
}

const deleteLikesByBookId = async (bookId: string) => {
  return await Like.deleteMany({ bookId })
}

const deleteLikesFromBookUserId = async (bookUserId: string) => {
  try {
    return await Like.deleteMany({ bookUserId })
  } catch {
    return null
  }
}

const deleteLikesFromUserLikedId = async (userLikedId: string) => {
  try {
    return await Like.deleteMany({ userLikedId })
  } catch {
    return null
  }
}

export {
  getLikeById,
  createLike,
  deleteLike,
  updateLikeById,
  getLikesByBookUserId,
  getLikesByUserLikedId,
  getLikeByUserLikedIdAndBookId,
  deleteLikesByBookId,
  deleteLikesFromBookUserId,
  deleteLikesFromUserLikedId,
  likeReceivedNotification,
  likeDeletedNotification
}
