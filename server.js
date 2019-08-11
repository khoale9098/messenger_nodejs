// const express= require('express');
import express from 'express'
let app = express();

let hostname= "localhost";
let port = 8000;

app.get('/', (req, res)=>{
    res.send("<h1>Hello World</h1>")
});
app.listen(port,hostname, ()=>{
    console.log(` Runing at ${hostname}:${port}/`);
})

