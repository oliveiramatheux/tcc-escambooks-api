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
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste123',
  birthDate: '12/12/2000',
  imageName: '',
  imageUrl: ''
}

const mockRequestCreateUser = {
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste123'
}

const mockResponseCreateUser = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  password: 'teste123',
  birthDate: null,
  imageName: '',
  imageUrl: ''
}

const mockUpdateUserRequest = {
  name: 'teste2',
  email: 'teste2@teste.com',
  birthDate: '12/12/2000'
}
const mockUpdateUserResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste2',
  email: 'teste2@teste.com',
  password: 'teste123',
  birthDate: '12/12/2000',
  imageName: '',
  imageUrl: ''
}

const mockAuthRequest = {
  email: 'teste@teste.com',
  password: '123456'
}

const mockAuthResponse = {
  _id: '610970b1b3000dc0e505ee70',
  name: 'testeeee',
  email: 'teste@teste.com',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDk3MGIxYjMwMDBkYzBlNTA1ZWU3MCIsImlhdCI6MTYyOTIwOTY5NywiZXhwIjoxNjI5Mjk2MDk3fQ.o2yGbgJD1J4Hl_Agnjk5BkSpJmcL6BZOxlUinE4IAPg'
}

const mockAuthVerifyEmailRequest = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDk3MGIxYjMwMDBkYzBlNTA1ZWU3MCIsImlhdCI6MTYyOTIwOTY5NywiZXhwIjoxNjI5Mjk2MDk3fQ.o2yGbgJD1J4Hl_Agnjk5BkSpJmcL6BZOxlUinE4IAPg'
}

const mockAuthVerifyEmailResponse = {
  _id: '610970b1b3000dc0e505ee70',
  name: 'teste',
  email: 'teste@teste.com'
}

const mockAuthSendEmail = {
  email: 'teste@teste.com'
}

const mockAuthResetPasswordTokenRequest = {
  email: 'teste@teste.com',
  resetToken: '12345678',
  newPassword: 'Teste@1234'
}

const mockAuthResetPasswordResponse = {
  email: 'teste@teste.com'
}

const mockAuthResetPasswordRequest = {
  email: 'teste@teste.com',
  password: 'Teste1@1234',
  newPassword: 'Teste2@1234'
}

const mockGetInfoBookByIsbnRequest = {
  isbn: '1234567891011'
}

const mockGetInfoBookByIsbnResponse = {
  title: 'teste',
  authors: ['teste'],
  publisher: 'teste',
  publishedDate: 'teste',
  description: 'teste',
  pageCount: 200,
  categories: ['teste'],
  imageUrl: 'teste',
  imageName: 'teste',
  createdAt: 'teste',
  language: 'teste',
  previewLink: 'teste'
}

const mockBookId = {
  id: '610970b1b3000dc0e505ee70'
}

const mockGetBookByIdResponse = {
  id: '610970b1b3000dc0e505ee70',
  userId: '610970b1b3000dc0e505ee70',
  title: 'teste',
  authors: ['teste'],
  publisher: 'teste',
  publishedDate: 'teste',
  description: 'teste',
  pageCount: 200,
  categories: ['teste'],
  imageUrl: 'teste',
  imageName: 'teste',
  language: 'teste',
  previewLink: 'teste',
  createdAt: 'teste'
}

const mockBookRequest = {
  title: 'teste',
  authors: ['teste'],
  publisher: 'teste',
  publishedDate: 'teste',
  description: 'teste',
  pageCount: 200,
  categories: ['teste'],
  imageUrl: 'teste',
  imageName: 'teste',
  language: 'teste',
  previewLink: 'teste'
}

const mockBookResponse = {
  id: '610970b1b3000dc0e505ee70',
  userId: '610970b1b3000dc0e505ee70',
  title: 'teste',
  authors: ['teste'],
  publisher: 'teste',
  publishedDate: 'teste',
  description: 'teste',
  pageCount: 200,
  categories: ['teste'],
  imageUrl: 'teste',
  imageName: 'teste',
  createdAt: 'teste',
  language: 'teste',
  previewLink: 'teste'
}

const mockDeleteBookByIdResponse = {
  id: '610970b1b3000dc0e505ee70',
  userId: '610970b1b3000dc0e505ee70',
  title: 'teste',
  authors: ['teste'],
  publisher: 'teste',
  publishedDate: 'teste',
  description: 'teste',
  pageCount: 200,
  categories: ['teste'],
  imageUrl: 'teste',
  imageName: 'teste',
  createdAt: 'teste',
  language: 'teste',
  previewLink: 'teste'
}

const mockGetBooksByUserIdResponse = {
  items: [
    {
      id: '610970b1b3000dc0e505ee70',
      userId: '610970b1b3000dc0e505ee70',
      title: 'teste',
      authors: ['teste'],
      publisher: 'teste',
      publishedDate: 'teste',
      description: 'teste',
      pageCount: 200,
      categories: ['teste'],
      imageUrl: 'teste',
      imageName: 'teste',
      date: 'teste',
      language: 'teste',
      previewLink: 'teste'
    }
  ],
  totalItems: 1
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
  mockAuthRequest,
  mockAuthResponse,
  mockAuthVerifyEmailRequest,
  mockAuthVerifyEmailResponse,
  mockAuthSendEmail,
  mockAuthResetPasswordTokenRequest,
  mockAuthResetPasswordResponse,
  mockAuthResetPasswordRequest,
  mockGetInfoBookByIsbnRequest,
  mockGetInfoBookByIsbnResponse,
  mockBookId,
  mockGetBookByIdResponse,
  mockBookRequest,
  mockBookResponse,
  mockDeleteBookByIdResponse,
  mockGetBooksByUserIdResponse
}
