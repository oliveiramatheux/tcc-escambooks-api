import { generateDefaultToken } from '../../utils/auth'
import { asyncHandlerError } from '../asyncHandlerError'
import { Request, Response, NextFunction } from 'express'
import { ResponseError } from '../../utils/errors'

const sendMock = jest.fn().mockImplementation((text) => text)
const responseMock: Partial<Response> = {
  status: jest.fn().mockReturnValue(({
    send: sendMock
  }))
}
const next = jest.fn()

describe('test asyncHandlerError middleware', () => {
  describe('test asyncHandlerError function', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    it('should return message and status error ok when is called', () => {
      const requestMock: Partial<Request> = {
        headers: {
          authorization: `Bearer ${generateDefaultToken}`,
          userId: '60c365be4168d05c46a6c7be'
        }
      }

      const errorMock: ResponseError = {
        status: 400,
        message: 'Teste error',
        name: 'Teste error'
      }

      asyncHandlerError(errorMock, requestMock as Request, responseMock as Response, next as NextFunction)
      expect(responseMock.status).toBeCalledWith(400)
      expect(sendMock).toBeCalledWith('Error: Teste error')
    })
  })
})
