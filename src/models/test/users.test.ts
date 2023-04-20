import { userPreSaveHook } from '../users'
import { hash } from 'bcrypt'

jest.mock('bcrypt')

describe('test users models', () => {
  describe('test userPreSaveHook function', () => {
    it('should execute pre save middleware when create or update user should encrypt the password', async () => {
      const next = jest.fn()
      const context = {
        password: '123456'
      }

      const mockedHash = hash as jest.MockedFunction<typeof hash>
      mockedHash.mockResolvedValue('PasswordWithHash' as never)
      await userPreSaveHook.call(context, next)
      expect(next).toBeCalledTimes(1)
      expect(context.password).not.toBe('123456')
      expect(hash).toBeCalledTimes(1)
      expect(hash).toBeCalledWith('123456', 10)
    })
  })
})
