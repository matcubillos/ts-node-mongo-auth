import express from 'express';
import router from './routes/auth.routes';
import cors from 'cors'
import "dotenv/config"
import connectDB from './db/config';

//express
const app = express()
app.use(express.json())

//db connection
connectDB()

//cors
app.use(cors())

//public
app.use(express.static('public'))

//routes
app.use( '/api/auth', router )





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`sv listen port ${PORT}`)
})