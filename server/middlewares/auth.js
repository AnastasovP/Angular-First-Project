const { SECRET } = require('../config');
const jwt = require('jsonwebtoken')
const  {authCookieName} = require('../config');

module.exports = () => (req, res, next) => {
    const token = req.cookies[authCookieName] || '';
    try {
        const userData = jwt.verify(token, SECRET);
        req.user = userData;
    } catch (err) {
        console.log(err.message)
        //res.status(401).json({message: 'Invalid access token! Please sign in....'})
    }
    next();
}