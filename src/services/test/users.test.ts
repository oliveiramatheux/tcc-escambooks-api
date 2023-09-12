import {
  mockIdRequestGetUserById,
  mockIUserResponse,
  mockIdRequestGetUserByIdNotFound,
  mockRequestCreateUser,
  mockResponseCreateUser,
  mockIdRequestDeleteUserById,
  mockUpdateUserResponse,
  mockUpdateUserRequest,
  mockIdRequestUpdateUserById
} from './mock'
import {
  getUser,
  createUser,
  deleteUser,
  updateUser
} from '../index'
import {
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById,
  getUserByEmail,
  sendEmail,
  getBooksByUserId
} from '../../repositories'

jest.mock('../../repositories')
jest.mock('../auth')

describe('test users services', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })
  describe('test getUser function', () => {
    it('should return 200 when is called with user id send correct', async () => {
      const mockGetUserById = getUserById as jest.Mock
      mockGetUserById.mockResolvedValue({ ...mockIUserResponse, _id: mockIUserResponse.id })
      const { id } = mockIdRequestGetUserById
      const result = await getUser(id)
      expect(mockGetUserById).toBeCalledTimes(1)
      expect(mockGetUserById).toBeCalledWith(id)
      expect(result).toEqual(mockIUserResponse)
    })
    it('should return error when is called with user id send correct but not found', async () => {
      const mockGetUserById = getUserById as jest.Mock
      mockGetUserById.mockResolvedValue(null)
      const { id } = mockIdRequestGetUserByIdNotFound

      expect(async () => await getUser(id)).rejects.toThrowError('User not found')
      expect(mockGetUserById).toBeCalledTimes(1)
      expect(mockGetUserById).toBeCalledWith(id)
    })
  })

  describe('test createUser function', () => {
    it('should return 201 when is called with body send correct', async () => {
      const mockCreateNewUser = createNewUser as jest.Mock
      mockCreateNewUser.mockResolvedValue({ ...mockResponseCreateUser, _id: mockResponseCreateUser.id })

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      const result = await createUser(mockRequestCreateUser)

      expect(mockSendEmailConfirmService).toBeCalledTimes(1)
      expect(mockCreateNewUser).toBeCalledTimes(1)
      expect(mockCreateNewUser).toBeCalledWith(mockRequestCreateUser)
      expect(result).toEqual(mockResponseCreateUser)
    })
    it('should return empty body when is called with body send incorrect', async () => {
      const mockVerifyEmailAlredyExist = getUserByEmail as jest.Mock
      mockVerifyEmailAlredyExist.mockResolvedValue(null)

      const mockCreateNewUser = createNewUser as jest.Mock
      mockCreateNewUser.mockResolvedValue(null)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      await expect(async () => await createUser(mockRequestCreateUser)).rejects.toThrowError('An eror occured when create this user')

      expect(mockSendEmailConfirmService).not.toHaveBeenCalled()

      expect(mockCreateNewUser).toBeCalledTimes(1)
      expect(mockCreateNewUser).toBeCalledWith(mockRequestCreateUser)
    })
    it('should return error when is called with body send correct but email alredy exist', async () => {
      const mockVerifyEmailAlredyExist = getUserByEmail as jest.Mock
      mockVerifyEmailAlredyExist.mockResolvedValue(mockIUserResponse)

      const mockSendEmailConfirmService = sendEmail as jest.MockedFunction<typeof sendEmail>
      mockSendEmailConfirmService.mockResolvedValue()

      expect(async () => await createUser(mockRequestCreateUser)).rejects.toThrowError('User email alredy exist')
      expect(mockSendEmailConfirmService).not.toHaveBeenCalled()
      expect(mockVerifyEmailAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyEmailAlredyExist).toBeCalledWith(mockRequestCreateUser.email)
    })
  })

  describe('test deleteUser function', () => {
    it('should return 200 when is called with user id send correct', async () => {
      const mockGetUserById = getUserById as jest.Mock
      mockGetUserById.mockResolvedValue({ ...mockIUserResponse, _id: mockIUserResponse.id })
      const mockDeleteUserById = deleteUserById as jest.Mock
      mockDeleteUserById.mockResolvedValue({ ...mockIUserResponse, _id: mockIUserResponse.id })
      const mockGetBooksByUserId = getBooksByUserId as jest.Mock
      mockGetBooksByUserId.mockResolvedValue([])
      const { id } = mockIdRequestDeleteUserById
      const result = await deleteUser(id)
      expect(mockDeleteUserById).toBeCalledTimes(1)
      expect(mockDeleteUserById).toBeCalledWith(id)
      expect(result).toEqual({ ...mockIUserResponse, userBooksImages: [] })
    })
    it('should return empty body when is called with user id send correct but not found', async () => {
      const mockGetUserById = getUserById as jest.Mock
      mockGetUserById.mockResolvedValue(null)
      const { id } = mockIdRequestDeleteUserById

      expect(async () => await deleteUser(id)).rejects.toThrowError('User not found')
      expect(mockGetUserById).toBeCalledTimes(1)
      expect(mockGetUserById).toBeCalledWith(id)
    })
  })

  describe('test updateUser function', () => {
    it('should return ok when is called with user id send correct and found user and not exist this email user', async () => {
      const mockVerifyUserAlredyExist = getUserById as jest.Mock
      mockVerifyUserAlredyExist.mockResolvedValue(mockIUserResponse)

      const mockVerifyEmailAlredyExist = getUserByEmail as jest.Mock
      mockVerifyEmailAlredyExist.mockResolvedValue(null)

      const mockUpdateUser = updateUserById as jest.Mock
      mockUpdateUser.mockResolvedValue({ ...mockUpdateUserResponse, _id: mockUpdateUserResponse.id })

      const { id } = mockIdRequestUpdateUserById
      const result = await updateUser(id, mockUpdateUserRequest)

      expect(mockVerifyUserAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyUserAlredyExist).toBeCalledWith(id)

      expect(mockVerifyEmailAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyEmailAlredyExist).toBeCalledWith(mockUpdateUserRequest.email)

      expect(mockUpdateUser).toBeCalledTimes(1)
      expect(mockUpdateUser).toBeCalledWith(id, mockUpdateUserRequest)
      expect(result).toEqual(mockUpdateUserResponse)
    })

    it('should return empty body when is called with body send incorrect', async () => {
      const mockVerifyUserAlredyExist = getUserById as jest.Mock
      mockVerifyUserAlredyExist.mockResolvedValue(mockIUserResponse)

      const mockVerifyEmailAlredyExist = getUserByEmail as jest.Mock
      mockVerifyEmailAlredyExist.mockResolvedValue(null)

      const mockUpdateUser = updateUserById as jest.Mock
      mockUpdateUser.mockResolvedValue(null)

      const { id } = mockIdRequestUpdateUserById

      await expect(async () => await updateUser(id, mockUpdateUserRequest)).rejects.toThrowError('An error occured when update this user')

      expect(mockVerifyUserAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyUserAlredyExist).toBeCalledWith(id)

      expect(mockVerifyEmailAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyEmailAlredyExist).toBeCalledWith(mockUpdateUserRequest.email)

      expect(mockUpdateUser).toBeCalledTimes(1)
      expect(mockUpdateUser).toBeCalledWith(id, mockUpdateUserRequest)
    })

    it('should return error when is called with id send incorrect and user not found', async () => {
      const mockVerifyUserAlredyExist = getUserById as jest.Mock
      mockVerifyUserAlredyExist.mockResolvedValue(null)

      const { id } = mockIdRequestUpdateUserById
      expect(async () => await updateUser(id, mockUpdateUserRequest)).rejects.toThrowError('User not exist')
      expect(mockVerifyUserAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyUserAlredyExist).toBeCalledWith(id)
    })

    it('should return error when is called with email send correct but alredy exist', async () => {
      const mockVerifyUserAlredyExist = getUserById as jest.Mock
      mockVerifyUserAlredyExist.mockResolvedValue(mockIUserResponse)

      const mockVerifyEmailAlredyExist = getUserByEmail as jest.Mock
      mockVerifyEmailAlredyExist.mockResolvedValue(mockIUserResponse)

      const { id } = mockIdRequestUpdateUserById
      const result = updateUser(id, mockUpdateUserRequest)

      expect(mockVerifyUserAlredyExist).toBeCalledTimes(1)
      expect(mockVerifyUserAlredyExist).toBeCalledWith(id)
      expect(result).rejects.toThrowError('User email alredy exist')
    })
  })
})
