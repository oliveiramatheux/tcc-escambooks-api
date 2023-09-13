import { getLikeById, createLike, deleteLike, updateLikeById, getLikesByBookUserId, getLikesByUserLikedId, deleteLikesByBookId, likeReceivedNotification, likeDeletedNotification } from '../repositories'
import { ILike, ILikeResponse } from '../models'
import { handleError } from '../utils/errors'
import { objectFormatter } from '../utils/objectFormatter'

export interface ILikeFormatedResponse {
  id: string
  bookId: string
  bookTitle: string
  bookUserId: string
  userLikedId: string
  userLikedName: string
  isVisualized: boolean
  date: string
}

const formatResponse = (response: ILikeResponse): ILikeFormatedResponse => {
  return {
    id: response._id,
    bookId: response.bookId,
    bookTitle: response.bookTitle,
    bookUserId: response.bookUserId,
    userLikedId: response.userLikedId,
    userLikedName: response.userLikedName,
    isVisualized: response.isVisualized,
    date: response.createdAt
  }
}

const formatLikesResponse = (likes: ILikeResponse[]) => {
  return (
    {
      items:
        likes.map(like => {
          return ({
            id: like._id,
            bookId: like.bookId,
            bookTitle: like.bookTitle,
            bookUserId: like.bookUserId,
            userLikedId: like.userLikedId,
            userLikedName: like.userLikedName,
            isVisualized: like.isVisualized,
            date: like.createdAt
          })
        }),
      totalItems: likes.length,
      totalItemsNotVisualized: likes.filter(like => !like.isVisualized).length
    }
  )
}

const getLikeByIdService = async (id: string) => {
  const like = await getLikeById(id)
  if (!like) {
    throw handleError(404, 'Like not found')
  }
  return formatResponse(like)
}

const createLikeService = async (like: ILike) => {
  const likeResponse = await createLike(like)

  if (!likeResponse) {
    throw handleError(400, 'An eror occured when create this like')
  }

  likeReceivedNotification(formatResponse(likeResponse as unknown as ILikeResponse))

  return formatResponse(likeResponse as unknown as ILikeResponse)
}

const deleteLikeService = async (id: string) => {
  const like = await deleteLike(id)
  if (!like) {
    throw handleError(404, 'Like not found')
  }

  likeDeletedNotification(formatResponse(like))

  return formatResponse(like)
}

const deleteLikesByBookIdService = async (bookId: string) => {
  const likes = await deleteLikesByBookId(bookId)

  return { totalItemsDeleted: likes.deletedCount }
}

const updateLikeByIdService = async (id: string, like: ILike) => {
  const likeResponse = await updateLikeById(id, objectFormatter(like) as ILike)
  if (!likeResponse) {
    throw handleError(400, 'An error occured when update this like')
  }
  return formatResponse(likeResponse)
}

const getLikesByBookUserIdService = async (bookUserId: string) => {
  const likes = await getLikesByBookUserId(bookUserId)
  if (!likes) {
    throw handleError(404, 'This user not have books liked')
  }
  return formatLikesResponse(likes)
}

const getLikesByUserLikedIdService = async (userLikedId: string) => {
  const likes = await getLikesByUserLikedId(userLikedId)
  if (!likes) {
    throw handleError(404, 'This user not liked any book')
  }
  return formatLikesResponse(likes)
}

export { getLikeByIdService, createLikeService, deleteLikeService, updateLikeByIdService, getLikesByBookUserIdService, getLikesByUserLikedIdService, deleteLikesByBookIdService }
