const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Search for user in database
        const user = await User.findOne({ where: { username } });

        // Verify user
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare password 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
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
        res.status(500).json({ error: "Server error" });
    }
};

exports.restrictedView = (_, res) => {
    res.status(200)
        .send("Confidential View")
}