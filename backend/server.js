import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";

dotenv.config();
const app = express();

app.use(express.json());
//const newLocal = '';
app.post("/api/products",async (req,res)=>{
    const product=req.body;

    if(!product.name || !product.price || !product.image ){
        return res.status(400).json({error:"All fields are required"});
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }catch(error){
        console.log("error in create product ",error.message);
        res.status(500).json({success:false,message:"Product not created"});
    }
});

app.listen(5000, () => {
    connectDB();
  console.log('Server is running on http://localhost:5000');
})

//SsiOS6Odc6YnBVRd