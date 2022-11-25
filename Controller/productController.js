const mssql = require('mssql')
const {v4} = require('uuid')
const sqlConfig= require('../Config/index')

const getProducts = async(req,res)=>{
   try {
   const pool = await mssql.connect(sqlConfig)
   const response  =await pool.request().execute('getProducts')
   const products = await response.recordset
   if(products.length){
       return res.status(200).json (products)
   }else{
       res.status(404).json({message:'no products found'})
   }
   } catch (error) {
       res.status(404).json({error:error.message})
   }
}

const getProduct = async(req,res)=>{
   try {
       const{id}=req.params
       const pool = await mssql.connect(sqlConfig)
       const product= await(await pool.request()
       .input('id',mssql.VarChar , id)
       .execute('getProduct')).recordset
       
       if(product.length){
           res.status(200).json(product)
       }else{
          res.status(404).json({message: `product id ${id} not found!`}) 
       }

   } catch (error) {
        res.status(404).json({error:error.message})
   }
}

const addProduct = async(req,res)=>{
   try {
       const id=v4()
       const {name,description, price, discount,imageurl} =req.body
       const pool = await mssql.connect(sqlConfig)
       await pool.request()
       .input('id',mssql.VarChar , id)
       .input('name',mssql.VarChar , name)
       .input('description',mssql.VarChar , description)
       .input('price',mssql.Int , price)
       .input('imageurl',mssql.VarChar, imageurl)
       .input('discount',mssql.Int, discount)
       .execute('addProduct')

       res.status(201).json({message:'Product Added'})
   } catch (error) {
        res.status(404).json({error:error.message})
   }
}


const updateProduct = async(req,res)=>{
   try {
       const {id}=req.params
       const {name,description,price} =req.body

       const pool = await mssql.connect(sqlConfig)
       const product= await(await pool.request()
       .input('id',mssql.VarChar , id)
       .execute('getProduct')).recordset
       if(product.length){
         await pool.request()
       .input('id',mssql.VarChar , id)
       .input('name',mssql.VarChar , name)
       .input('description',mssql.VarChar , description)
       .input('price',mssql.VarChar , price)
       .execute('updateProduct')
       res.status(200).json({message:'product updated'})
       }else{
           res.status(404).json({message: `product id ${id} not found`}) 
       }
       
   } catch (error) {
       res.status(404).json({error:error.message})
   }
}

const deleteProduct = async(req,res)=>{
   try {
       const {id}=req.params
       const pool = await mssql.connect(sqlConfig)
       const product= await(await pool.request()
       .input('id',mssql.VarChar , id)
       .execute('getProduct')).recordset

       if(product.length){
           await pool.request()
           .query(`DELETE FROM ProductsTable WHERE id ='${id}'`)
           res.status(200).json({message:'product deleted'})
       }else{
            res.status(404).json({message: `product id ${id} not found`}) 
       }
   } catch (error) {
       res.status(404).json({error:error.message})
   }
}

module.exports={
   getProduct,
   getProducts,
   addProduct,
   updateProduct,
   deleteProduct
}