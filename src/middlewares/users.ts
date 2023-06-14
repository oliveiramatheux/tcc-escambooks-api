import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

const validateParamsGetUserById = celebrate({
  ...validateParamsId
})

const validateParamsCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    birthDate: Joi.string(),
    imageUrl: Joi.string(),
    imageName: Joi.string()
  })
})

const validateParamsDeleteUserById = celebrate({
  ...validateParamsId
})

const validateParamsUpdateUser = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    birthDate: Joi.string(),
    imageUrl: Joi.string(),
    imageName: Joi.string()
  })
})

const validateParamsGetBooksByUserId = celebrate({
  ...validateParamsId
})

export {
  validateParamsGetUserById,
  validateParamsCreateUser,
  validateParamsDeleteUserById,
  validateParamsUpdateUser,
  validateParamsGetBooksByUserId
}
