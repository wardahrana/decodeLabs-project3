const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        lowercase: true, 
        trim: true,
        // Up-to-date Regex pattern to validate proper email formatting
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    age: { 
        type: Number, 
        min: [18, 'You must be at least 18 years old'],
        max: [120, 'Age cannot be greater than 120'],
        default: null 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);