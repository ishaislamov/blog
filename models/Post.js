import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        reqiered: true,
    },
    text: {
        type: String,
        reqiered: true,
        unique: true,
    }, 
    tags: {
        type: Array,
        default: [],
    }, 
    viewsCount: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqiered: true,
    },
    imageUrl: String,
}, {
    timeStamps: true,
}); 

export default mongoose.model('Post', PostSchema)