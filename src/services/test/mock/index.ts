const mockIdRequestGetUserById = {
  id: '60c365be4168d05c46a6c7be'
}

const mockIdRequestGetUserByIdNotFound = {
  id: '60c365be4168d05c46a6c7b4'
}

const mockIdRequestDeleteUserById = {
  id: '60c365be4168d05c46a6c7be'
}

const mockIdRequestUpdateUserById = {
  id: '60c365be4168d05c46a6c7be'
}

const mockIUserResponse = {
  id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  birthDate: '12/12/2000'
}

const mockRequestCreateUser = {
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste123',
  token: '12345678'
}

const mockResponseCreateUser = {
  id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  birthDate: null
}

const mockUpdateUserRequest = {
  name: 'teste2',
  email: 'teste2@teste.com',
  birthDate: '12/12/2000'
}

const mockUpdateUserResponse = {
  id: '60c365be4168d05c46a6c7be',
  name: 'teste2',
  email: 'teste2@teste.com',
  birthDate: '12/12/2000'
}

const UserAuthenticateResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste2',
  email: 'teste2@teste.com',
  password: '123456',
  active: true
}

const UserAuthenticateServiceResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste2',
  email: 'teste2@teste.com',
  token: undefined
}

const UserAuthenticateRequest = {
  email: 'teste2@teste.com',
  password: '123456'
}

const authVerifyEmailServiceRequest = {
  email: 'teste@teste.com',
  secretToken: '12345678'
}

const tokenAuthVerifyEmail = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hdGhldXMub2xpdmVpcmEwNzMwQGdtYWlsLmNvbSIsInNlY3JldFRva2VuIjoiIiwiaWF0IjoxNjQyNzgzNzkyLCJleHAiOjE2NDI4NzAxOTJ9.-1fOjMyQalq0nr8_KqxN0MDC8O8m07njNQPNwlzQEFQ'

const authVerifyEmailServiceResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com'
}

const mockedIUserResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  birthDate: '12/12/2000',
  secretToken: '12345678',
  resetToken: '12345678',
  active: false
}

const mockedIUserUpdateUserByIdResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  birthDate: '12/12/2000',
  secretToken: '',
  resetToken: '12345678',
  active: true
}

const authSendPasswordResetServiceRequest = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com'
}

const mockedIUserResponseWithPassword = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste@123',
  birthDate: '12/12/2000',
  secretToken: '12345678',
  resetToken: '12345678',
  active: false
}

const authResetPasswordTokenServiceRequest = {
  email: 'teste@teste.com',
  resetToken: '12345678',
  newPassword: '12345678'
}

const authResetPasswordServiceRequest = {
  email: 'teste@teste.com',
  password: 'teste@123',
  newPassword: 'teste@1234'
}

export {
  mockIdRequestGetUserById,
  mockIdRequestDeleteUserById,
  mockIUserResponse,
  mockRequestCreateUser,
  mockUpdateUserRequest,
  mockUpdateUserResponse,
  mockIdRequestUpdateUserById,
  mockResponseCreateUser,
  mockIdRequestGetUserByIdNotFound,
  UserAuthenticateResponse,
  UserAuthenticateRequest,
  UserAuthenticateServiceResponse,
  authVerifyEmailServiceRequest,
  authVerifyEmailServiceResponse,
  mockedIUserResponse,
  mockedIUserUpdateUserByIdResponse,
  authSendPasswordResetServiceRequest,
  mockedIUserResponseWithPassword,
  authResetPasswordTokenServiceRequest,
  authResetPasswordServiceRequest,
  tokenAuthVerifyEmail
}
