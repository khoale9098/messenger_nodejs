// const express= require('express');
import express from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectFlash from 'connect-flash'
import ConnectDB from './config/connectDB'
import session from './config/session'
import passport from 'passport'
import configViewEngine from './config/viewEngine'
import initRoutes from './routes/web'
import http from 'http'
import socketio from 'socket.io'
import passportSocketIo from 'passport.socketio'
import cookieParser from 'cookie-parser'
import pem from 'pem'
import https from 'https'
import initSockets from './sockets/index'
dotenv.config()
let app = express();
//Init server with Socket.io & Express app
let server = http.createServer(app);
let io = socketio(server);
ConnectDB(); // connect to MongoDB
session.config(app);
configViewEngine(app)
app.use(bodyParser.urlencoded({
    extended: true
}))
// Enable flash messages
app.use(connectFlash());
//
app.use(cookieParser());
// Config passport js
app.use(passport.initialize());
app.use(passport.session());
initRoutes(app);
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: "express.sid",
    secret: "mySecret",
    store: session.sessionStore,
    success: (data, accept) => {
        //Khi người dùng chưa đăng nhập
        if (!data.user.logged_in) {
            return accept("Invalid user.", false);
        }
        return accept(null, true)
    },
    fail: (data, message, error, accept) => {
        if (error)
            console.log('failed connection to socket.io:', message);
        accept(new Error(message), null);
    }
}))
// Init all Sockets 
initSockets(io)
server.listen(process.env.PORT_NAME, process.env.HOST_NAME, () => {
    console.log(`Hi all, Server Runing at ${process.env.HOST_NAME}:${process.env.PORT_NAME}/`);
})
