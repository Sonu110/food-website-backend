require('dotenv').config()
const express = require("express");
const Router = require('./Router/Router');
const app = express()
const Moongoes = require('mongoose')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(Router)

Moongoes.connect(process.env.MongodbUrl ).then(()=>{
    console.log("DB suceess connected");
}).catch(()=>
{
console.log("not succes mongodb");
})



app.listen(process.env.PORT,()=>{
console.log("the sever start",process.env.PORT );
})