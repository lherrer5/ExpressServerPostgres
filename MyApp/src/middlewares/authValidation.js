const jwt = require("jsonwebtoken");


// const isAuthenticated = (req, res, next) => {

//     const token = req.headers.authorization;

//     let decodedToken;

//     try {
//         decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     } catch(err) {
//         console.log(err);
//         res.status(401);
//         res.send(err.message || 'Access forbidden');
//         return;
//     }

//     if (decodedToken) {
//         next();
//     } else {
//         res.status(401);
//         res.send('Access forbidden');
//         return;
//     }

// };

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]; 
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            console.log(err);
            res.status(401);
            res.send(err.message || 'Access forbidden');
            return;
        }
        if (decodedToken) {
            next();
        } else {
            res.status(401);
            res.send('Access forbidden');
            return;
        }
    } else {
        res.status(401);
        res.send('Access forbidden');
        return;
    }
};

module.exports = isAuthenticated