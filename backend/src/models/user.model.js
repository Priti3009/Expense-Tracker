import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
            index:true,
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
    if(!this.isModified("password")) return next();  //if password is not modifies ,return from this method
    this.password=await bcrypt.hash(this.password,10)  //Hash it if modified
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){   //custom method to check if psd is correct
    console.log(this.password)
    return await bcrypt.compare(password,this.password)

}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(                                   //directly return the refresh token 
        {
            _id:this._id              //we keep less info here because it gets refreshed regularly
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema)