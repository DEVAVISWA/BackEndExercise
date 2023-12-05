const notesRouter= require('express').Router() //1
const jwt= require('jsonwebtoken') //7 1
const { JWT_SECRET } = require('../utils/config')
const { User } = require('../models/user')
const Note = require('../models/note')

const getTokenFrom= req => { //6 
    const authorization = req.get('Authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }

} 
notesRouter.post('/', async(req,res)=>{ //3
    const noteObject= req.body //4
    const token= getTokenFrom(req) //5
    const decodedToken= jwt.verify(token, JWT_SECRET) //7 2
    //8 if token is missing or dsnt matches
    if(!token || !decodedToken.id){
        return res.status(401).json({ error : "token is missing or invalid"})
    }
    //9 if token matches, find the document in the user collection that matches the decodedToken id value
    const user= await User.findById(decodedToken.id)
    //10 create a new note object with the user enterd noteObject and the user's id to save in DB
    const note= new Note ({
        content: noteObject.content ,
        user: user._id
    })
    //11 save the note to DB
    const savedNote= await note.save()
    //add noteid to user notes aray
    user.notes= user.notes.concat(savedNote._id)
    //save user to DB
    await user.save()
    res.json({message:"note saved successfuly" , note: savedNote})

})

module.exports= notesRouter //2