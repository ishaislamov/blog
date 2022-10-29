import express from 'express';
import mongoose from 'mongoose';

import {registerValidation, loginValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js';


import {login, register, getMe} from './controllers/UserController.js'
import {create} from './controllers/PostController.js'


mongoose
.connect('mongodb+srv://admin:admin@cluster0.g2nvhg0.mongodb.net/blog?retryWrites=true&w=majority',)
.then(() => {console.log('DB ok')})
.catch((error) => {console.log('DB error', error)})

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello world dasd');
});

app.post('/login', loginValidation, login )

app.post('/register', registerValidation, register )

app.get('/me', checkAuth, getMe)

// app.get('/posts', getAll )
// app.get('/posts/:id', getOne )
// app.delete('/posts', remove )
app.post('/posts', create )
// app.patch('/posts', update )



app.listen(4444, (err) => {
    if(err) {
        return console.log(err, 'erros is here');
    }
        console.log('Server is fine')
});
