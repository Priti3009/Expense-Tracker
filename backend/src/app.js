import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

const app=express(); 

app.use(cors({
    origin:process.env.CORS_ORIGIN,  //  only allow request from this origin
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import incomeRouter from './routes/income.routes.js'
import expenseRouter from './routes/expense.routes.js'

app.use("/api/v1/users",userRouter); //Mounts the userRouter at /api/v1/users.Control goes to user.routes.js ( eg- http://localhost:8000/api/v1/users/register )

app.use("/api/v1/income",incomeRouter);

app.use("/api/v1/expense",expenseRouter)

export {app};





