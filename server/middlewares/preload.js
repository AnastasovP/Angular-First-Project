const { getPostById } = require('../services/post');

module.exports = (paramName = 'id') => async (req, res, next) => {
    const id = req.params[paramName];
    try {
        const data = await getPostById(id);
        if (!data) {
            throw new Error('Not found')
        }
        req.data = data;
        next();
    } catch (err) {
        res.status(404).json({ message: 'No such record' });
    }
}