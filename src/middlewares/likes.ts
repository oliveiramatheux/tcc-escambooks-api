import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetLikeById = celebrate({
  ...validateParamsId
})

const validateParamsCreateLike = celebrate({
  [Segments.BODY]: Joi.object().keys({
    bookId: Joi.string().required(),
    bookTitle: Joi.string().required(),
    bookUserId: Joi.string().required(),
    userLikedId: Joi.string().required(),
    userLikedName: Joi.string().required(),
    isVisualized: Joi.boolean().required()
  })
})

const validateParamsDeleteLikeById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateLike = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    bookId: Joi.string(),
    bookTitle: Joi.string(),
    bookUserId: Joi.string(),
    userLikedId: Joi.string(),
    userLikedName: Joi.string(),
    isVisualized: Joi.boolean()
  })
})

const validateParamsGetLikesByBookUserId = celebrate({
  [Segments.BODY]: Joi.object().keys({
    bookUserId: Joi.string().required()
  })
})

const validateParamsGetLikesByUserLikedId = celebrate({
  [Segments.BODY]: Joi.object().keys({
    userLikedId: Joi.string().required()
  })
})

export {
  validateParamsGetLikeById,
  validateParamsCreateLike,
  validateParamsDeleteLikeById,
  validateParamsUpdateLike,
  validateParamsGetLikesByBookUserId,
  validateParamsGetLikesByUserLikedId
}
