const Joi = require('joi');

const contentSchema = Joi.object({
  type: Joi.string().valid('movie', 'series').default('movie'),
  title: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).required(),
  duration: Joi.number().required(),
  cast: Joi.array().items(Joi.string()).required(),
  hero: Joi.string().required(),
  story: Joi.string().optional(),
  director: Joi.string().optional(),
  rating: Joi.number().min(0).max(10).optional(),
  seasons: Joi.number().when('type', { is: 'series', then: Joi.required() }),
  episodes: Joi.number().when('type', { is: 'series', then: Joi.required() }),
  poster: Joi.string().optional(),
});

module.exports=contentSchema;  