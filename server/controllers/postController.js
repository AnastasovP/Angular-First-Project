const router = require('express').Router();
const { isAuth, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { getAllPost, createPost, getPostById, updatePost, deletePost, like, getPostsByUserId } = require('../services/post');
const parserError = require('../utils/errorParser');


router.get('/', async (req, res) => {
    const data = await getAllPost();
    res.status(200).json(data)
});

router.get('/:id', preload(), async (req, res) => { //api/:id' or '/:id'
    const item = req.data.toObject();
    item._ownerId = item.owner.toString(); //with .toString() doesn't work 
    res.json(item)
});


router.post('/create', isAuth(), async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        category: req.body.category,
        owner: req.user._id,
    };
    try {
        const result = await createPost(data);
        res.status(201).json(result);

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message })
    }
});

router.put('/:id', isAuth(), preload(), isOwner(), async (req, res) => {
    const updated = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        category: req.body.category
    };
    try {
        const result = await updatePost(req.data._id, updated);
        res.status(200).json(result);

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message })
    }
});

router.get('/delete/:id', isAuth(), preload(), isOwner(), async (req, res) => {

    try {
        await deletePost(req.params.id);
        res.status(200).json({ message: "Succesfully delete record" })

    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.post('/like', isAuth(), async (req, res) => {
    const userId = req.user._id;
    const postId = req.body.data.postId;
    try {
        const result = await like(userId, postId); 
        res.status(200).json(result)
    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
})


router.get('/profile/:id', isAuth(), async (req, res) => {
    const ownerId = req.params.id;
    try {
        const result = await getPostsByUserId(ownerId)
        res.status(200).json(result)
    } catch (err) {
        const message = parserError(err);
        res.status(err.status || 400).json({ message });
    }
})


module.exports = router;