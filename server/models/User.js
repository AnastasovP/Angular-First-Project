const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    programs: [{ type: [ObjectId], ref: 'Post', default: [] }]
})


module.exports = mongoose.model('User', userSchema);