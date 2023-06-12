import { Like, ILike, ILikeResponse } from '../models'

const getLikeById = async (id: string) => {
  return await Like.findById<ILikeResponse>({ _id: id })
}

const createLike = async (like: ILike) => {
  return await Like.create<ILikeResponse>(like)
}

const deleteLike = async (id: string) => {
  return await Like.findByIdAndRemove<ILikeResponse>({ _id: id })
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

export { getLikeById, createLike, deleteLike, updateLikeById, getLikesByBookUserId, getLikesByUserLikedId }
