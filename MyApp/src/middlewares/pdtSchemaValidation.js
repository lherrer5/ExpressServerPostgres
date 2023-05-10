const newProductSchema=require("./joiValidatorSchema");
const updateProduct=require("./joiValidatorSchema");


const pdtoSchemaValidation=(req, res, next) => {
    const {error}=newProductSchema.validate(req.body, {abortEarly: false});
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


const updateSchemaValidation=(req, res, next) => {
    const {error}=updateProduct.validate(req.body, {abortEarly: false});
    if (error) {
        res.json(error.message);
        next(error);
    }
    next();
};


module.exports=pdtoSchemaValidation
module.exports=updateSchemaValidation
