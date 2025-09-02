import mongoose from "mongoose";
import connectDB from "./db/index.js";
import {app} from "./app.js";
import {} from 'dotenv/config'

connectDB()
.then(()=>{
    app.listen(process.env.PORT|| 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT||8000}`);
    })
})
.catch((error)=>{
    console.log(`MONGODB connection failed !! ${error.message}`);
})