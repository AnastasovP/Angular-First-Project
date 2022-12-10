const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    name: { type: String, minlength: [6, 'Name should be at least 6 characters long'] },
    description: { type: String },
    imageUrl: {type: String},
    ingredients: { type: String, maxlength: [200, 'Ingredients should be at max 200 characters long'] },
    category: { type: String },
    owner: { type: ObjectId, ref: 'User' },
    likes: { type: [ObjectId], ref: 'User', default: []}
});

module.exports = mongoose.model('Post', postSchema)