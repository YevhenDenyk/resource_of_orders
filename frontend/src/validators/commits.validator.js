import Joi from 'joi'


const createCommitValidator = Joi.object({
    text: Joi.string().required().min(3).max(300),
})

export {createCommitValidator}