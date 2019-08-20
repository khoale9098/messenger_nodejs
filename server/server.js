// const express= require('express');
import express from 'express';
import ConnectDB from './config/connectDB'
import dotenv from 'dotenv'
import configViewEngine from './config/viewEngine'
dotenv.config()
let app = express();
ConnectDB(); // connect to MongoDB
configViewEngine(app)
app.get('/', (req, res) => {
    res.render("main/master")
});
app.get('/login',(req,res)=>{
    res.render("auth/login")
})
app.listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
    console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
})
