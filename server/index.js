const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const postController = require('./controllers/postController');
const userController = require('./controllers/usersController');
const auth = require('./middlewares/auth');
const cookieParser = require('cookie-parser');
const cookieSecret = 'SoftUni';

start();

async function start() {
    await new Promise((resolve, reject) => {
        mongoose.connect('mongodb://127.0.0.1:27017/gym', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.once('open', () => {
            console.log('DB connected');
            resolve();
        })
        db.on('error', (err) => {
            console.log(err);
            reject(err);
        })
    });
    const app = express();
    app.use(cookieParser(cookieSecret));

    app.use(cors({
        origin: 'http://localhost:4200',
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        credentials: true
    }));
   
    app.use(auth())
    app.use(express.json());


    app.use('/api/post', postController);
    app.use('/api/users', userController);

    app.get('/', (req, res) => {
        res.send('REST Service Operational. Send requiest to /api');
    })

    app.listen(3000, () => console.log('Server listen on port 3000'));
}


