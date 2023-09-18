import { User } from '../models'
import { INewUser, IUserResponse } from '../models/users'

const getUserById = async (id: string) => {
  const user = await User.findById({ _id: id }) as IUserResponse
  return user
}

const createNewUser = async (newUser: INewUser) => {
  const user = await User.create(newUser) as unknown as IUserResponse
  return user
}

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndRemove({ _id: id }) as IUserResponse
  return user
}

const updateUserById = async (id: string, newUser: INewUser) => {
  const user = await User.findOneAndUpdate({ _id: id }, newUser, {
    new: true
  }) as IUserResponse
  return user
}

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email }) as IUserResponse
  return user
}

const getAllUsers = async (): Promise<IUserResponse[]> => {
  try {
    return await User.find<IUserResponse>({}, null, {
      sort: { name: 'asc' }
    })
  } catch {
    return []
  }
}

export { getUserById, getAllUsers, createNewUser, deleteUserById, updateUserById, getUserByEmail }
