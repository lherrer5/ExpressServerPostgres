const { User } = require("../models");

exports.getAllUsers = async (_, res, next) => {
    try {
        console.log("Correct getAllUsers");
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        console.log("Correct getUserById");
        const Users = await User.findByPk(id);
        res.json(Users);
    } catch (error) {
        next(error);
    }
};



exports.createUser = async (req, res, next) => {
    try {
        console.log("Correct createUser");
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        console.log("Correct deleteUser");
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.json({ message: `User ${user.firstName} ${user.lastName} has been deleted` });
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        console.log("Correct updateUser");
        const user = await User.update(req.body, {
            returning: true,
            where: {
                id
            }
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

