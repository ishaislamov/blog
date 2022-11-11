import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';


import {registerValidation, loginValidation, postCreateValidation} from './validations.js';
import checkAuth from './utils/checkAuth.js'; 


import {login, register, getMe} from './controllers/UserController.js'
import {create, getAll, getOne, remove, update, getLastTags} from './controllers/PostController.js'
import handleValidationErrors from './utils/handleValidationErrors.js';

// mongodb+srv://admin:admin@cluster0.g2nvhg0.mongodb.net/blog?retryWrites=true&w=majority

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {console.log('DB ok')})
.catch((error) => {console.log('DB error', error)})

const app = express();

// save images
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer( { storage })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) =>{
    res.send('Hello world dasd');
});

app.post('/login', loginValidation, handleValidationErrors, login )
app.post('/register', registerValidation, handleValidationErrors, register )
app.get('/me', checkAuth, getMe)
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
        message: 'Изображение загрузилось'
    })
})
app.get('/posts', getAll )
app.get('/tags', getLastTags )
app.get('/posts/:id', getOne )
app.delete('/posts/:id', remove )
app.post('/posts',checkAuth, postCreateValidation, handleValidationErrors, create )
app.patch('/posts/:id',checkAuth,postCreateValidation, handleValidationErrors, update )



app.listen(4444, (err) => {
    if(err) {
        return console.log(err, 'erros is here');
    }
        console.log('Server is fine')
});
