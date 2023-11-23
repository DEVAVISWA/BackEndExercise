const { default: mongoose } = require("mongoose");

//9 define schema
const userSchema= new mongoose.Schema({
    userName : String,
    name : String,
    passwordHash : String,
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : Date
})

//10 create a model for user
const User= mongoose.model('User', userSchema, 'users')

module.exports = {
    User
}