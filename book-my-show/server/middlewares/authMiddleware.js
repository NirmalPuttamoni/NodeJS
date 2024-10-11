const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // console.log("req headers ", req.headers);
        const token = req?.headers?.authorization?.split(" ")?.[1];
        // console.log("token ", token);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Token is verified ", verifiedToken);
        req.body.userId = verifiedToken.userId;
        next();
    } catch (error) {
        // console.log(error)
        if (error.name === "TokenExpiredError") {
            res.status(401).send({ success:false, message: "Token expired" });
        } else {
            res.status(401).send({ success:false, message: "Token is invalid" });
        }
    }
}

module.exports = auth;