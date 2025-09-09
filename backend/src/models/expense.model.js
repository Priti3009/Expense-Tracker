import mongoose, { Schema } from "mongoose";

const expenseSchema= new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        
        title:{
                type:String,
                required:[true,"Please provide a title"]
        },
        category:{
            type:String,
            default:"General"
        },
        date:{
            type:Date,
            default:Date.now,
        },
        amount:{
            type:Number,
            required: [true, "Please provide an amount"],
            min: [0, "Amount must be positive"],
        }       

    },
    {timestamps:true}

)

export const Expense=mongoose.model("Expense",expenseSchema)