const express = require ('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const apiRoutes = require('./route/route')

app.use(express.json(),cors())
port = 8080;

app.use('/app/user', apiRoutes)

dotenv.config();


mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true})
.then(() => {console.log('Database is Connected')})
.catch(err => console.log(err))

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})