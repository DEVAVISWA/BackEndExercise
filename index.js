const { default: mongoose } = require("mongoose");
const { info, err } = require("./utils/logger");
const { MONGODB_URI, PORT } = require("./utils/config");
const { app } = require("./app");

// console.log('hello!!!')
// info('hello')

mongoose.set('strictQuery', false)
info('connecting to MongoBD',MONGODB_URI)

mongoose.connect(MONGODB_URI) //3 backend created
        .then(()=> {
            info('conected to mongoDB')
            app.listen(PORT, ()=> { //7 server started
                info (`server running on http://127.0.0.1:${PORT}`)
            })
        })
        .catch((error)=> {
            err('error connecting to mongoDB', error.message)
        })  