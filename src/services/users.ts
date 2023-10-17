import {
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById,
  getUserByEmail,
  getAllUsers,
  getUsersByName,
  sendEmail,
  getBooksByUserId,
  deleteBooksByUserId,
  deleteLikesFromBookUserId,
  deleteLikesFromUserLikedId
} from '../repositories'
import { INewUser, IUserResponse } from '../models/users'
import { handleError } from '../utils/errors'
import { objectFormatter } from '../utils/objectFormatter'
import { defaultEmailFrom } from '../config/auth'
import { generateToken } from '../services/auth'
import { contentTemplateEmailConfirmation } from './templates'
import config from '../config'
import Handlebars from 'handlebars'

interface UserBookImageInfo {
  bookId: string
  bookImageName: string
}

const templateEmailConfirmartion = Handlebars.compile(
  contentTemplateEmailConfirmation
)

const formatResponse = (response: IUserResponse) => {
  return {
    id: response._id,
    name: response.name,
    email: response.email,
    birthDate: response.birthDate,
    imageUrl: response.imageUrl,
    imageName: response.imageName,
    admin: response.admin
  }
}

const formatUsersResponse = (
  users: IUserResponse[]
): IUserResponse[] => {
  return users.map(formatResponse)
}

const getUser = async (id: string) => {
  const userResponse: IUserResponse = await getUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }
  return formatResponse(userResponse)
}

const getAllUsersService = async () => {
  const users = await getAllUsers()

  if (!users.length) {
    throw handleError(404, 'There is no users on platform')
  }

  return formatUsersResponse(users)
}

const createUser = async (newUser: INewUser) => {
  const verifyEmailAlredyExist: IUserResponse = await getUserByEmail(
    newUser.email
  )

  if (verifyEmailAlredyExist) {
    throw handleError(409, 'User email alredy exist')
  }

  const newUserResponse: IUserResponse = await createNewUser(newUser)

  if (!newUserResponse) {
    throw handleError(400, 'An eror occured when create this user')
  }

  const token = generateToken({
    email: newUserResponse.email,
    secretToken: newUserResponse.secretToken
  })

  const template = {
    from: defaultEmailFrom,
    subject: 'Email de confirmação',
    html: templateEmailConfirmartion({
      url: config.applicationFrontUrl,
      userName: newUserResponse.name,
      userToken: token
    })
  }
  sendEmail(newUserResponse, template)

  return formatResponse(newUserResponse)
}

const deleteUser = async (id: string) => {
  const userResponse: IUserResponse = await getUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }

  const userBooks = await getBooksByUserId(userResponse._id)
  const userBooksImagesInfos: UserBookImageInfo[] = userBooks.filter(book => !!book.imageName).map(book => ({ bookId: book._id, bookImageName: book.imageName }))

  await deleteBooksByUserId(userResponse._id)
  await deleteLikesFromBookUserId(userResponse._id)
  await deleteLikesFromUserLikedId(userResponse._id)

  const userDeletedResponse: IUserResponse = await deleteUserById(id)

  return { ...formatResponse(userDeletedResponse), userBooksImages: userBooksImagesInfos }
}

const updateUser = async (id: string, newUser: INewUser) => {
  const verifyUserAlredyExist: IUserResponse = await getUserById(id)
  if (!verifyUserAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  const verifyEmailAlredyExist: IUserResponse = await getUserByEmail(
    newUser.email
  )
  if (verifyEmailAlredyExist) {
    throw handleError(409, 'User email alredy exist')
  }

  const newUserResponse: IUserResponse = await updateUserById(
    id,
    objectFormatter(newUser) as INewUser
  )
  if (!newUserResponse) {
    throw handleError(400, 'An error occured when update this user')
  }
  return formatResponse(newUserResponse)
}

const getUsersByNameService = async (name: string) => {
  const users = await getUsersByName(name)

  if (!users.length) {
    throw handleError(404, 'No user found with this name')
  }

  return await formatUsersResponse(users)
}

export { getUser, getAllUsersService, createUser, deleteUser, updateUser, getUsersByNameService }
