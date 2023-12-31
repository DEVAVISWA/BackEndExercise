const express= require('express') //4
const cors= require('cors')
const userRouter = require('./controllers/users') //14 import the userRouter
const { loginRouter } = require('./controllers/login')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')

const app= express() //5

//middlewares  //8
app.use(cors()) 
app.use(express.json())
app.use(middleware.requestLogger)
//15 use the userRouter and  define the endpoints
app.use('/api/users', userRouter)
app.use('/api/login' , loginRouter)
app.use('/api/notes',notesRouter)

module.exports= {  //6
    app
}