// const express= require('express');
import express from 'express';
import ConnectDB from './config/connectDB'
import ContactModal from './models/Contact'
import dotenv from 'dotenv'
dotenv.config()
let app = express();
ConnectDB(); // connect to MongoDB

let hostname = "localhost";
let port = 8000;

app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
});
app.get('/testdatabase', async (req, res) => {
    try {
        let item = {
            userId: 123123123,
            contactId: 3123123213123,
        };
        let contact = await ContactModal.createNew(item)
        res.send(contact)
    } catch (error) {
        console.log(error)
    }
})
app.listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
    console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
})