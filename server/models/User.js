const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, "email is required"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    confirmPassword:{
        type:String,
        required:[true, "password is required"]
    }
});

const User = new mongoose.model('User',UserSchema);
module.exports = User;