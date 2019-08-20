// const express= require('express');
import express from 'express';
import ConnectDB from './config/connectDB'
import dotenv from 'dotenv'
import configViewEngine from './config/viewEngine'
import initRoutes from './routes/web'
dotenv.config()
let app = express();
ConnectDB(); // connect to MongoDB
configViewEngine(app)
initRoutes(app);

app.listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
    console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
})
