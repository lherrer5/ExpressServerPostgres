const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


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
    }catch (error) {
        next(error);
    }
};


    exports.createUser = async (req, res, next) => {
        try {
        console.log("Correct createUser");
        const user = await User.create(req.body);
        res.json(user);
    }catch (error) {
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
    }catch (error) {
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
    }catch (error) {
        next(error);
    }
};

exports.login = async (req, res) => {
    const { id, password } = req.body;

    try {
        // Search for user in data base
        const user = await User.findOne({ where: { id } });

        // Verify user
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Compare password 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            data: {
                token,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};