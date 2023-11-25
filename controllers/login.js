// const  config  = require('../utils/config')
const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')

//coming from front end for User Login endpoints defining
const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
    // get the credentials from the request body
    const { userName, password } = req.body
    // check if the user exists in the database
    const user = await User.findOne({ userName })
    // if user dnst exist return error
    if (!user) {
        return res.status(401).json({ message: "user does not exist" })
    }

    //check if pass is correct
    const isAuthenticated = await bcrypt.compare(password, user.passwordHash)
    //if pass incorrect
    if (!isAuthenticated) {
        return res.status(401).json({ message: 'password is incorrect' })
    }
    //if pass is correct generate a token
    //define the payload for jwt
    const payload = {
        id: user._id,
        userName: user.userName
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    //send the token as response
    res.status(200).json({ 
        token, userName: user.userName, name: user.name
    })
})

module.exports = {
    loginRouter
}