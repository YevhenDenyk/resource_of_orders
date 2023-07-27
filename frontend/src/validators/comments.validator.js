import Joi from 'joi'


const commentsValidator = Joi.object({
    text: Joi.string().required().min(3).max(300),
})

export {commentsValidator}