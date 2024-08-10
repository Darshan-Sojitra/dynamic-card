// Importing mongoose
import mongoose from 'mongoose';

// Mongoose connection string with options for better connection management
mongoose.connect("mongodb+srv://darshan:darshan123@cluster0.gttsu44.mongodb.net/bcard", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

// Card schema definition
const cardSchema = new mongoose.Schema({
    imgSrc: String,
    imgAlt: String,
    title: String,
    description: String,
    buttonText: String,
    link: String
});

// User schema definition
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Admin schema definition
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Model exports
export const Admin = mongoose.model('Admin', adminSchema);
export const User = mongoose.model('User', userSchema);
export const Card = mongoose.model('Card', cardSchema);
