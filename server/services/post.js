const Post = require('../models/Post');
const User = require('../models/User');

async function getAllPost() {
    return await Post.find({}).populate('owner').lean();
}

async function getPostById(id) {
    const result = await Post.findById(id).populate('owner')
    console.log(result);
    // console.log(req.data);
    return result;
    // .populate({
    //     path: 'comments',
    //     populate: { path: 'author' },
    // });
}

async function createPost(data) {
    const result = new Post(data);
    await result.save();
    return result;
}

async function updatePost(id, updated) {
    const original = await Post.findById(id);
    Object.assign(original, updated);
    return original.save();
}

async function deletePost(id) {
    const post = await Post.findById(id);
    if (!post) {
        throw new Error('Invalid Program Post');
    }
    return post.delete();
}

async function getPostsByUserId(id) {
    const post = await Post.find({ owner: id })
    return post
}

async function like(userId, postId) {
    const user = await User.findById(userId) //.populate('programs'); 
    const post = await Post.findById(postId) //.populate('user'); 

    if (!user) {
        throw new Error('Invalid user')
    }
    if (!post) {
        throw new Error('Invalid post');
    }
    const userAlreadyLiked = user.programs.indexOf(postId) //user.programs.find(p => p._id == postId);

    if (userAlreadyLiked != -1) {
        throw new Error('You already liked this program');
    }

    if (userId == post.owner._id) {
        throw new Error('You are owner, cannot like this post ')
    }

    user.programs.push(post);
    post.likes.push(user);

    // return Promise.all([(
    //     user.save(),
    //     post.save())
    // ]);
    user.save();
    post.save();
    return post;
};




module.exports = {
    getAllPost,
    getPostById,
    updatePost,
    createPost,
    like,
    deletePost,
    getPostsByUserId
}