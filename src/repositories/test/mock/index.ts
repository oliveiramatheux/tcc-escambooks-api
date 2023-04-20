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
  age: '12'
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
  age: null
}

const mockUpdateUserRequest = {
  name: 'teste2',
  email: 'teste2@teste.com',
  age: '13'
}
const mockUpdateUserResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste2',
  email: 'teste2@teste.com',
  age: '13'
}

const mockGetUserByEmail = {
  email: 'teste@teste.com'
}

const mockIUserResponseWithPassword = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  age: '12',
  password: '123456'
}

const mockIBookResponse = {
  _id: '61202a62b9ba932d143ae30f',
  userId: '60c365be4168d05c46a6c7be',
  title: 'Harry Potter e a Ordem da Fênix',
  authors: ['teste'],
  publisher: 'Pottermore Publishing',
  publishedDate: '2015-12-08',
  description: "Você está compartilhando os pensamentos e emoções do Lorde das Trevas. O diretor acha que é desaconselhável que isto continue a acontecer. E quer que eu lhe ensine como fechar a mente ao Lorde das Trevas.' Tempos sombrios se abateram sobre Hogwarts. Depois do ataque dos Dementadores ao seu primo Dudley, Harry Potter sabe que Voldemort fará tudo para encontrá-lo. Muitos negam o retorno do Lorde das Trevas, mas Harry não está sozinho: uma ordem secreta se reúne no Largo Grimmauld para fazer frente às forças sombrias. Harry precisa permitir que o professor Snape o ensine a se proteger dos vorazes ataques de Voldemort à sua mente. Mas eles estão ficando cada vez mais fortes, e o tempo de Harry está acabando...",
  pageCount: 123,
  categories: ['teste'],
  imageLinks: {
    thumbnail: 'http://books.google.com/books/content?id=9TcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  language: 'pt-BR',
  previewLink: 'http://books.google.com.br/books?id=9TcQCwAAQBAJ&printsec=frontcover&dq=isbn:9781781104040&hl=&cd=1&source=gbs_api'
}

const mockIdRequestGetBookById = {
  id: '61202a62b9ba932d143ae30f'
}

const mockRequestCreateBook = {
  userId: '60c365be4168d05c46a6c7be',
  title: 'Harry Potter e a Ordem da Fênix',
  authors: ['teste'],
  publisher: 'Pottermore Publishing',
  publishedDate: '2015-12-08',
  description: "Você está compartilhando os pensamentos e emoções do Lorde das Trevas. O diretor acha que é desaconselhável que isto continue a acontecer. E quer que eu lhe ensine como fechar a mente ao Lorde das Trevas.' Tempos sombrios se abateram sobre Hogwarts. Depois do ataque dos Dementadores ao seu primo Dudley, Harry Potter sabe que Voldemort fará tudo para encontrá-lo. Muitos negam o retorno do Lorde das Trevas, mas Harry não está sozinho: uma ordem secreta se reúne no Largo Grimmauld para fazer frente às forças sombrias. Harry precisa permitir que o professor Snape o ensine a se proteger dos vorazes ataques de Voldemort à sua mente. Mas eles estão ficando cada vez mais fortes, e o tempo de Harry está acabando...",
  pageCount: 123,
  categories: ['teste'],
  imageLinks: {
    thumbnail: 'http://books.google.com/books/content?id=9TcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  language: 'pt-BR',
  previewLink: 'http://books.google.com.br/books?id=9TcQCwAAQBAJ&printsec=frontcover&dq=isbn:9781781104040&hl=&cd=1&source=gbs_api'
}

const mockRequestUpdateBook = {
  title: 'Harry Potter e a Ordem da Fênix 2',
  authors: ['teste'],
  publisher: 'Pottermore Publishing',
  publishedDate: '2015-12-08',
  description: "Você está compartilhando os pensamentos e emoções do Lorde das Trevas. O diretor acha que é desaconselhável que isto continue a acontecer. E quer que eu lhe ensine como fechar a mente ao Lorde das Trevas.' Tempos sombrios se abateram sobre Hogwarts. Depois do ataque dos Dementadores ao seu primo Dudley, Harry Potter sabe que Voldemort fará tudo para encontrá-lo. Muitos negam o retorno do Lorde das Trevas, mas Harry não está sozinho: uma ordem secreta se reúne no Largo Grimmauld para fazer frente às forças sombrias. Harry precisa permitir que o professor Snape o ensine a se proteger dos vorazes ataques de Voldemort à sua mente. Mas eles estão ficando cada vez mais fortes, e o tempo de Harry está acabando...",
  pageCount: 123,
  categories: ['teste'],
  imageLinks: {
    thumbnail: 'http://books.google.com/books/content?id=9TcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
  },
  language: 'pt-BR',
  previewLink: 'http://books.google.com.br/books?id=9TcQCwAAQBAJ&printsec=frontcover&dq=isbn:9781781104040&hl=&cd=1&source=gbs_api'
}

const mockIdRequestBookById = {
  id: '61202a62b9ba932d143ae30f'
}

const mockGetBooksByUserId = {
  userId: '60c365be4168d05c46a6c7be'
}

const mockIBooksResponse = [
  {
    _id: '61202a62b9ba932d143ae30f',
    userId: '60c365be4168d05c46a6c7be',
    title: 'Harry Potter e a Ordem da Fênix',
    authors: ['teste'],
    publisher: 'Pottermore Publishing',
    publishedDate: '2015-12-08',
    description: "Você está compartilhando os pensamentos e emoções do Lorde das Trevas. O diretor acha que é desaconselhável que isto continue a acontecer. E quer que eu lhe ensine como fechar a mente ao Lorde das Trevas.' Tempos sombrios se abateram sobre Hogwarts. Depois do ataque dos Dementadores ao seu primo Dudley, Harry Potter sabe que Voldemort fará tudo para encontrá-lo. Muitos negam o retorno do Lorde das Trevas, mas Harry não está sozinho: uma ordem secreta se reúne no Largo Grimmauld para fazer frente às forças sombrias. Harry precisa permitir que o professor Snape o ensine a se proteger dos vorazes ataques de Voldemort à sua mente. Mas eles estão ficando cada vez mais fortes, e o tempo de Harry está acabando...",
    pageCount: 123,
    categories: ['teste'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=9TcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    language: 'pt-BR',
    previewLink: 'http://books.google.com.br/books?id=9TcQCwAAQBAJ&printsec=frontcover&dq=isbn:9781781104040&hl=&cd=1&source=gbs_api'
  },
  {
    _id: '61202a62b9ba932d143ae30h',
    userId: '60c365be4168d05c46a6c7be',
    title: 'Harry Potter e a Ordem da Fênix 2',
    authors: ['teste'],
    publisher: 'Pottermore Publishing',
    publishedDate: '2015-12-08',
    description: "Você está compartilhando os pensamentos e emoções do Lorde das Trevas. O diretor acha que é desaconselhável que isto continue a acontecer. E quer que eu lhe ensine como fechar a mente ao Lorde das Trevas.' Tempos sombrios se abateram sobre Hogwarts. Depois do ataque dos Dementadores ao seu primo Dudley, Harry Potter sabe que Voldemort fará tudo para encontrá-lo. Muitos negam o retorno do Lorde das Trevas, mas Harry não está sozinho: uma ordem secreta se reúne no Largo Grimmauld para fazer frente às forças sombrias. Harry precisa permitir que o professor Snape o ensine a se proteger dos vorazes ataques de Voldemort à sua mente. Mas eles estão ficando cada vez mais fortes, e o tempo de Harry está acabando...",
    pageCount: 123,
    categories: ['teste'],
    imageLinks: {
      thumbnail: 'http://books.google.com/books/content?id=9TcQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    language: 'pt-BR',
    previewLink: 'http://books.google.com.br/books?id=9TcQCwAAQBAJ&printsec=frontcover&dq=isbn:9781781104040&hl=&cd=1&source=gbs_api'
  }
]

const mockGetBookByIsbn = {
  isbn: '1234567891011'
}

const mockedIUserResponse = {
  _id: '60c365be4168d05c46a6c7be',
  name: 'teste',
  email: 'teste@teste.com',
  age: '12',
  secretToken: '12345678',
  resetToken: '12345678',
  active: false
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
  mockGetUserByEmail,
  mockIUserResponseWithPassword,
  mockIBookResponse,
  mockIdRequestGetBookById,
  mockRequestCreateBook,
  mockIdRequestBookById,
  mockRequestUpdateBook,
  mockGetBooksByUserId,
  mockIBooksResponse,
  mockGetBookByIsbn,
  mockedIUserResponse
}
