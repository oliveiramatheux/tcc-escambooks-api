import { generateDefaultToken } from '../../utils/auth'
import { verifyToken } from '../auth'
import { Request, Response, NextFunction } from 'express'

const sendMock = jest.fn().mockImplementation((text) => text)
const responseMock: Partial<Response> = {
  status: jest.fn().mockReturnValue(({
    send: sendMock
  }))
}
const next = jest.fn()

describe('test auth middleware', () => {
  describe('test verifyToken function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should return ok when is called with token send correct', () => {
      const requestMock: Partial<Request> = {
        headers: {
          authorization: `Bearer ${generateDefaultToken}`,
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      verifyToken(requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).not.toHaveBeenCalled()
      expect(sendMock).not.toHaveBeenCalled()
      expect(next).toBeCalledTimes(1)
    })

    it('should return 401 when is called with token not send', () => {
      const requestMock: Partial<Request> = {
        headers: {
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      verifyToken(requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).toBeCalledWith(401)
      expect(sendMock).toBeCalledWith('Error: No token provided')
      expect(next).toBeCalledTimes(0)
    })

    it('should return 401 when is called with token not send with two parts', () => {
      const requestMock: Partial<Request> = {
        headers: {
          authorization: 'Bearer',
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      verifyToken(requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).toBeCalledWith(401)
      expect(sendMock).toBeCalledWith('Error: Token error')
      expect(next).toBeCalledTimes(0)
    })

    it('should return 401 when is called with token send malformatted', () => {
      const requestMock: Partial<Request> = {
        headers: {
          authorization: `${generateDefaultToken} Bearer`,
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      verifyToken(requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).toBeCalledWith(401)
      expect(sendMock).toBeCalledWith('Error: Token malformatted')
      expect(next).toBeCalledTimes(0)
    })

    it('should return 401 when is called with token invalid', () => {
      const requestMock: Partial<Request> = {
        headers: {
          authorization: 'Bearer tokenInvalidTest',
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      verifyToken(requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).toBeCalledWith(401)
      expect(sendMock).toBeCalledWith('Error: Token invalid')
      expect(next).toBeCalledTimes(0)
    })
  })
})
