import mongoose, { Schema } from 'mongoose'

export interface INewBook {
  userId: string,
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

export interface IUpdateBook {
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

export interface IBookResponse {
  _id?: string,
  userId: string,
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

export interface IBookExternalApiResponse {
  title?: string,
  authors?: string[],
  publisher?: string,
  publishedDate?: string,
  description?: string,
  pageCount?: number,
  categories?: string[],
  imageLinks?: {
    thumbnail?: string
  },
  language?: string,
  previewLink?: string,
}

export interface IBook {
  userId: string
  title: string,
  authors: string[],
  publisher: string,
  publishedDate: string,
  description: string,
  pageCount: number,
  categories: string[],
  imageLinks?: {
    thumbnail: string
  },
  language: string,
  previewLink?: string,
}

const BookSchema: Schema<IBook> = new Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  authors: {
    type: [],
    require: true
  },
  publisher: {
    type: String,
    required: true
  },
  publishedDate: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  pageCount: {
    type: Number,
    require: true
  },
  categories: {
    type: [],
    require: true
  },
  imageLinks: {
    thumbnail: {
      type: String
    }
  },
  language: {
    type: String,
    require: true
  },
  previewLink: {
    type: String
  }
},
{
  timestamps: true,
  versionKey: false
})

BookSchema.index({ user: 1 })

const Book = mongoose.model<IBook>('Book', BookSchema)

export { Book }
