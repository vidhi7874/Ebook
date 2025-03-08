//integrate express here
import express from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import userRouter from './users/userRouter'

const app=express()

//Routes :http methods GET,POST,PUT,PATCH,DELETE
app.use(express.json())

app.get("/",(req,res,next)=>{
    res.json({message : 'welcome to alib APIs'})
})
app.use('/api/users',userRouter)

//global error handler
app.use(globalErrorHandler);

export default app