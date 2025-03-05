//integrate express here
import express,{NextFunction, Request, Response} from 'express'
import  createHttpError, { HttpError } from 'http-errors'
import { config } from './config/config'

const app=express()

//Routes :http methods GET,POST,PUT,PATCH,DELETE

app.get("/",(req,res,next)=>{

    const error=createHttpError(400,"Something went wrong")
    throw error
    res.json({message : 'welcome to alib APIs'})
})

//global error handler
app.use((err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    const statusCode= err.statusCode || 500;

     res.status(statusCode).json({
        message: err.message,
        errorStack:config.env === "development" ? err.stack : "",
    });
    
});

export default app