const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require('../models/user');

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        let decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
        console.log(decoded);
        let theUser = await User.findById(decoded.id);
        console.log(theUser);
        req.foundUser = theUser;
    };
    next();
}

exports.logOut = (req, res, next) => {
    res.cookie('jwt', 'logout', {
        expires: new Date( Date.now() + 2*1000),
        httpOnly: true
    });
    next();
}