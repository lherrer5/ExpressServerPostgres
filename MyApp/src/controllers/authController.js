const jwt = require("jsonwebtoken");

exports.login = (req, res) => {

    const { email } = req.body;

    token = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
    )

    res
        .status(200)
        .json({
            success: true,
            data: {
                token,
            },
        });

};

exports.restrictedView = (_, res) => {
    res.status(200)
        .send("Confidential View")
}