const { Product } = require("../models").Product;
//const { Product } = require("../models/productModel");

//GET
const getAllProducts = async (_, res, next) => {
    try {
    console.log("Correct getAllProducts");

    const allProducts = await Product.find();
    res.json(allProducts);
} catch (error) {
    next(error);
}
};

//GET by ID
const getProductById = async (req, res, next) => {
    try {
    console.log("Correct getProductById");
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
}
};

//POST
// const createProduct = async (req, res, next) => {
//         const newProduct = new Product(req.body);
//         await newProduct.save();
//         console.log("Correct createProduct");
//         res.status(201).json(newProduct);
// };

const createProduct = async (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        console.log("Correct createProduct");
        res.status(201).json(newProduct);
        //connection to be closed
        //mongoose.connection.close();
    } catch (error) {
        res.status(500).json({ error: error.message });
        next(error);
    }
};

//DELETE by ID
const deleteProduct = async (req, res) => {
    try {
    console.log("Correct deleteProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id);
    res.json({ message: `Product ${product.name} has been deleted` });
} catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
}
};

//PATCH by ID
const updateProduct = async (req, res) => {
    try {
    console.log("Correct updateProduct");
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json(product);
} catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
}
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};

