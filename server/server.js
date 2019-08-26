// const express= require('express');
import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectFlash from 'connect-flash'
import ConnectDB from './config/connectDB'
import configSession from './config/session'
import passport from 'passport'
import configViewEngine from './config/viewEngine'
import initRoutes from './routes/web'
import pem from 'pem'
import https from 'https'
dotenv.config()
//
// pem.config({
//     pathOpenSSL: '../openssl/
//   })
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//         throw err
//     }
//     let app = express();
//     ConnectDB(); // connect to MongoDB
//     configSession(app);
//     configViewEngine(app)
//     app.use(bodyParser.urlencoded({
//         extended: true
//     }))
//     // Enable flash messages
//     app.use(connectFlash());
//     // Config passport js
//     app.use(passport.initialize());
//     app.use(passport.session());
//     initRoutes(app);
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
//         console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
//     })
// })


let app = express();
ConnectDB(); // connect to MongoDB
configSession(app);
configViewEngine(app)
app.use(bodyParser.urlencoded({
    extended: true
}))
// Enable flash messages
app.use(connectFlash());
// Config passport js
app.use(passport.initialize());
app.use(passport.session());
initRoutes(app);
app.listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
    console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
})
