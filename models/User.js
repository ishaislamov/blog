import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        reqiered: true,
    },
    email: {
        type: String,
        reqiered: true,
        unique: true,
    }, 
    passwordHash: {
        type: String,
        required: true,
    }, 
    avatarUrl: String,
}, {
    timeStamps: true,
}); 

export default mongoose.model('User', userSchema)