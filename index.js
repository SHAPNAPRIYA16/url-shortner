const express=require('express')
const mongoose=require('mongoose')
const url="mongodb://127.0.0.1:27017"

const app=express()
mongoose.connect(url)
const con = mongoose.connection 
app.use(express.json())

//routing 
app.use('/',require('./routes/indexx'));
app.use('/api/url',require('./routes/url'));

//port 
app.listen(9000,()=>console.log("Server running...."));




