import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";

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
    },
    profilePicture:{
        type:String,
        required:true
    }
},{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified(this.password)) return next();  //if password is not modifies ,return from this method
    this.password=await bcrypt.hash(this.password,10)  //Hash it if modified
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){   //custom method to check if psd is correct
    return await bcrypt.compare(password,this.password)

}

export const User=mongoose.model("User",userSchema)