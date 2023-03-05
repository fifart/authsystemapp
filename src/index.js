require('./models/User')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const requireAuth = require('./middlewares/requireAuth')


const app = express()


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(authRoutes)

const mongoUri = 'mongodb+srv://admin:password@cluster0.yebrx.mongodb.net/authapp?retryWrites=true&w=majority'
mongoose.connect(mongoUri)
mongoose.connection.on('connected', ()=>{
    console.log('Mongo DB connected');
})
mongoose.connection.on('error', (err)=>{
    console.log('Erron connection with error', err );
})



app.get('/', requireAuth, (req,res)=>{
    res.status(200).send('Welcome');
})

app.listen(3001, ()=>{
    console.log('Server is listening on port 3001');
})
