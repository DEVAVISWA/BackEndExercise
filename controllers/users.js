const bcrypt= require('bcrypt')
const { User } = require('../models/user')
//11 create a router
const userRouter= require('express').Router()


//13 define the endpoints or user routes
// endpoint to create a new user :-
userRouter.post('/', async (req,res)=> {
    //get user details destructured from req body
    const {userName, name, password}= req.body
    // hash adn save the pass in a variable
    const passwordHash= await bcrypt.hash(password,10)
    //save the details of user to be stored in the db to a new variable
    const user= new User({
        userName,
        name,
        passwordHash
    })
    // .save the user details in a varaible 
    const savedUser= await user.save()
    res.json(savedUser)
})
 

//12 export the router
module.exports = userRouter