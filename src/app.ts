//integrate express here
import express from 'express'

const app=express()

//Routes :http methods GET,POST,PUT,PATCH,DELETE

app.get("/",(req,res,next)=>{
res.json({message : 'welcome to alib APIs'})
})

export default app