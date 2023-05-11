const Joi = require('joi');

const newProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).required(),
    availableUnits: Joi.number().integer().positive().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().min(2).max(50).required(),
});

const updateProduct = Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    availableUnits: Joi.number().optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional()
}).min(1);

const newUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthday: Joi.date().iso().max('now').min('1900-01-01').required(),
    dni: Joi.number().integer().required(),
    country: Joi.string().required(),
  });
  
  const updateUser = Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    birthday: Joi.date().iso().max('now').min('1900-01-01').optional(),
    dni: Joi.number().integer().optional(),
    country: Joi.string().optional(),
  });

module.exports = { newProductSchema, updateProduct, newUserSchema, updateUser };