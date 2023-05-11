const Joi = require('joi');

const joiValidId = Joi.string().pattern(new RegExp
    ("^[a-zA-Z0-9]{24}$")).required();

const joiValidationId = async (req, res, next) => {
    const { id } = req.params;
    const { error } = await joiValidId.validate(id);
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


module.exports = joiValidationId

