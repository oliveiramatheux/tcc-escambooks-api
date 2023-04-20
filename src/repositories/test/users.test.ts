import {
  mockIdRequestGetUserById,
  mockIUserResponse,
  mockIdRequestGetUserByIdNotFound,
  mockRequestCreateUser,
  mockResponseCreateUser,
  mockIdRequestDeleteUserById,
  mockUpdateUserResponse,
  mockUpdateUserRequest,
  mockIdRequestUpdateUserById,
  mockGetUserByEmail
} from './mock'

import {
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById,
  getUserByEmail
} from '../index'

import { User } from '../../models'

import {
  IUser
} from '../../models/users'
import { Document } from 'mongoose'

jest.mock('../../models')

describe('test users repositories', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  describe('test getUserById function', () => {
    it('should return ok when is called with user id send correct', async () => {
      const UserModel = User.findById as jest.MockedFunction<typeof User.findById>
      UserModel.mockResolvedValue(mockIUserResponse as Document<any, any, IUser> & IUser & { _id: string })
      const { id } = mockIdRequestGetUserById
      const result = await getUserById(id)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(mockIUserResponse)
    })
    it('should return null when is called with user id send incorrect', async () => {
      const UserModel = User.findById as jest.Mock
      UserModel.mockResolvedValue(null)
      const { id } = mockIdRequestGetUserByIdNotFound
      const result = await getUserById(id)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(null)
    })
  })

  describe('test createNewUser function', () => {
    it('should return ok when is called with body send correct', async () => {
      const UserModel = User.create as jest.Mock
      UserModel.mockResolvedValue(mockResponseCreateUser)
      const result = await createNewUser(mockRequestCreateUser)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith(mockRequestCreateUser)
      expect(result).toEqual(mockResponseCreateUser)
    })
    it('should return null when is called with body send incorrect', async () => {
      const UserModel = User.create as jest.Mock
      UserModel.mockResolvedValue(null)
      const result = await createNewUser(mockRequestCreateUser)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith(mockRequestCreateUser)
      expect(result).toEqual(null)
    })
  })

  describe('test deleteUserById function', () => {
    it('should return ok when is called with user id send correct', async () => {
      const UserModel = User.findByIdAndRemove as jest.Mock
      UserModel.mockResolvedValue(mockIUserResponse)
      const { id } = mockIdRequestDeleteUserById
      const result = await deleteUserById(id)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(mockIUserResponse)
    })
    it('should return null when is called with user id send incorrect', async () => {
      const UserModel = User.findByIdAndRemove as jest.Mock
      UserModel.mockResolvedValue(null)
      const { id } = mockIdRequestDeleteUserById
      const result = await deleteUserById(id)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id })
      expect(result).toEqual(null)
    })
  })

  describe('test updateUserById function', () => {
    it('should return ok when is called with body and id send correct', async () => {
      const UserModel = User.findOneAndUpdate as jest.Mock
      UserModel.mockResolvedValue(mockUpdateUserResponse)
      const { id } = mockIdRequestUpdateUserById
      const result = await updateUserById(id, mockUpdateUserRequest)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id }, mockUpdateUserRequest, {
        new: true
      })
      expect(result).toEqual(mockUpdateUserResponse)
    })
    it('should return null when is called with body or id send incorrect', async () => {
      const UserModel = User.findOneAndUpdate as jest.Mock
      UserModel.mockResolvedValue(null)
      const { id } = mockIdRequestUpdateUserById
      const result = await updateUserById(id, mockUpdateUserRequest)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ _id: id }, mockUpdateUserRequest, {
        new: true
      })
      expect(result).toEqual(null)
    })
  })

  describe('test getUserByEmail function', () => {
    it('should return ok when is called with email send correct', async () => {
      const UserModel = User.findOne as jest.Mock
      UserModel.mockResolvedValue(mockIUserResponse)
      const { email } = mockGetUserByEmail
      const result = await getUserByEmail(email)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ email })
      expect(result).toEqual(mockIUserResponse)
    })
    it('should return null when is called with email send incorrect', async () => {
      const UserModel = User.findOne as jest.Mock
      UserModel.mockResolvedValue(null)
      const { email } = mockGetUserByEmail
      const result = await getUserByEmail(email)
      expect(UserModel).toBeCalledTimes(1)
      expect(UserModel).toBeCalledWith({ email })
      expect(result).toEqual(null)
    })
  })
})
