import express from 'express';
import dotenv from 'dotenv'; //.env file to keep sensitive information as db connection info
import mongoose from 'mongoose';
import cors from  'cors';  // cors -> cross site resource sharing (csrf) forgery protection
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
dotenv.config()
const app = express()
const port = process.env.PORT || 4000;
// //for testing

// app.get('/',(req , res)=>{
//     res.send("api is working");
// })

//database connection
mongoose.set("strictQuery", false);
const connect =  async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology : true
        })
        console.log("MongoDB database connected..")
    }
    catch(err){
        console.log("MongoDB database connection failed..")
    }
}

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth', authRoute )
app.use('/tours', tourRoute )
app.use('/users', userRoute )
app.use('/review',reviewRoute)
app.use('/booking',bookingRoute)

app.listen(port , () =>{
    connect();
    console.log("server listening on port", port);
}); 