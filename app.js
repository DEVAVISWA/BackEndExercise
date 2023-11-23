const express= require('express') //4
const cors= require('cors')
const userRouter = require('./controllers/users') //14 import the userRouter

const app= express() //5

//middlewares  //8
app.use(cors()) 
app.use(express.json())

//15 use the userRouter and  define the endpoints
app.use('/api/users', userRouter)

module.exports= {  //6
    app
}