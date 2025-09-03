import mongoose,{Schema} from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"Password is required"] ////required field is true along with a custom error message (if password absent error shown)
        },
        refreshToken:{
        type:String
    }
},{timestamps:true}
)

export const User=mongoose.model("User",userSchema)