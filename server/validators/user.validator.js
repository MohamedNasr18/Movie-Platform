const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(6)
    .max(100)
    .required(),

    role: Joi.string()
    .valid("USER","ADMIN")
    .default("USER"),

  poster: Joi.string()
    .uri()
    .optional()
});

module.exports =  createUserSchema;