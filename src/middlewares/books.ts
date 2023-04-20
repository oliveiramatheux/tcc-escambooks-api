import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsGetInfoBookByIsbn = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    isbn: Joi.string().length(13).required()
  })
})

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetBookById = celebrate({
  ...validateParamsId
})

const validateParamsCreateBook = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    authors: Joi.array().items(Joi.string().required()),
    publisher: Joi.string().required(),
    publishedDate: Joi.string().required(),
    description: Joi.string().required(),
    pageCount: Joi.number().required(),
    categories: Joi.array().items(Joi.string().required()),
    imageLinks: Joi.object({
      thumbnail: Joi.string().required()
    }),
    language: Joi.string().required(),
    previewLink: Joi.string()
  })
})

const validateParamsDeleteBookById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateBookById = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    authors: Joi.array().items(Joi.string()),
    publisher: Joi.string(),
    publishedDate: Joi.string(),
    description: Joi.string(),
    pageCount: Joi.number(),
    categories: Joi.array().items(Joi.string()),
    imageLinks: Joi.object({
      thumbnail: Joi.string()
    }),
    language: Joi.string(),
    previewLink: Joi.string()
  })
})

export {
  validateParamsGetInfoBookByIsbn,
  validateParamsGetBookById,
  validateParamsCreateBook,
  validateParamsDeleteBookById,
  validateParamsUpdateBookById
}
