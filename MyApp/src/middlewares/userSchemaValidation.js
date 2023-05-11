const { newUserSchema, updateUser } = require("./joiValidatorSchema");

const userSchemaValidation=(req, res, next) => {
    const {error}=newUserSchema.validate(req.body);
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


const userUpdateSchemaValidation=(req, res, next) => {
    const {error}=updateUser.validate(req.body);
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


module.exports={userSchemaValidation,userUpdateSchemaValidation}