import { getUserById, createNewUser, deleteUserById, updateUserById, getUserByEmail, sendEmail } from '../repositories'
import { INewUser, IUserResponse } from '../models/users'
import { handleError } from '../utils/errors'
import { objectFormatter } from '../utils/objectFormatter'
import { defaultEmailFrom } from '../config/auth'
import { generateToken } from '../services/auth'
import { contentTemplateEmailConfirmation } from './templates'
import config from '../config'
import Handlebars from 'handlebars'

const templateEmailConfirmartion = Handlebars.compile(contentTemplateEmailConfirmation)

const formatResponse = (response: IUserResponse) => {
  return {
    _id: response._id,
    name: response.name,
    email: response.email,
    age: response.age
  }
}

const getUser = async (id: string) => {
  const userResponse: IUserResponse = await getUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }
  return formatResponse(userResponse)
}

const createUser = async (newUser: INewUser) => {
  const verifyEmailAlredyExist: IUserResponse = await getUserByEmail(newUser.email)

  if (verifyEmailAlredyExist) {
    throw handleError(409, 'User email alredy exist')
  }

  const newUserResponse: IUserResponse = await createNewUser(newUser)

  if (!newUserResponse) {
    throw handleError(400, 'An eror occured when create this user')
  }

  const token = generateToken({ email: newUserResponse.email, secretToken: newUserResponse.secretToken })

  const template = {
    from: defaultEmailFrom,
    subject: 'Email de confirmação',
    html: templateEmailConfirmartion({ url: config.applicationFrontUrl, userName: newUserResponse.name, userToken: token })
  }
  sendEmail(newUserResponse, template)

  return formatResponse(newUserResponse)
}

const deleteUser = async (id: string) => {
  const userResponse: IUserResponse = await deleteUserById(id)
  if (!userResponse) {
    throw handleError(404, 'User not found')
  }
  return formatResponse(userResponse)
}

const updateUser = async (id: string, newUser: INewUser) => {
  const verifyUserAlredyExist: IUserResponse = await getUserById(id)
  if (!verifyUserAlredyExist) {
    throw handleError(404, 'User not exist')
  }

  const verifyEmailAlredyExist: IUserResponse = await getUserByEmail(newUser.email)
  if (verifyEmailAlredyExist) {
    throw handleError(409, 'User email alredy exist')
  }

  const newUserResponse: IUserResponse = await updateUserById(id, objectFormatter(newUser) as INewUser)
  if (!newUserResponse) {
    throw handleError(400, 'An error occured when update this user')
  }
  return formatResponse(newUserResponse)
}

export { getUser, createUser, deleteUser, updateUser }
