const dotenv = require('dotenv')
const express = require('express')
const {router} =require('./Routes/productRoutes')


const app =express()
dotenv.config()
app.use(express.json())
app.use('/products', router)



app.listen(process.env.PORT|| 4000,()=>{
    console.log(`Server is Running on Port : ${process.env.PORT}`);
})