import { celebrate, Joi, Segments } from 'celebrate'
import JoiObjectId from 'joi-objectid'

const myJoiObjectId = JoiObjectId(Joi)

const validateParamsId = {
  [Segments.PARAMS]: Joi.object().keys({
    id: myJoiObjectId().required()
  })
}

export const validateParamsUpdateMatch = celebrate({
  ...validateParamsId,
  [Segments.BODY]: Joi.object().keys({
    books: Joi.array().items(Joi.string().required()),
    users: Joi.array().items(Joi.object().required()),
    likes: Joi.array().items(Joi.string().required()),
    usersConfirmed: Joi.array().items(Joi.string().required())
  })
})
