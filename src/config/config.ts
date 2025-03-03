import {config as confi} from 'dotenv'
confi()
//by this two lines port which is given into .env file will automatic assigned in procedd.env.PORT
//node in typescrit not able to recognise .env file automatic so we install helper lib dotenv and uses their

const _config={
    port:process.env.PORT,
    databaseURL:process.env.MONGO_CONNECTION_STRING
}

export const config=Object.freeze(_config)

//freeze is the js method used to freeze any obj so that no one can change anything in this 
//inshort obj will be in  read only state