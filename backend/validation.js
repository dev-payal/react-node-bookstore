const Joi = require('joi');

//Register validation
const registerValidation = userData => {
    const schema = Joi.object({
        userName: Joi.string().min(6).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(userData);
};

//Login validation
const loginValidation = userData => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(userData);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


