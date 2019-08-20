import express from 'express'
import expressEjsExtend from 'express-ejs-extend'
import path from 'path'
//Config view engine for app
let configViewEngine = (app) => {
    app.use(express.static("./server/public"));
    app.engine('ejs', expressEjsExtend); // add this line
    app.set('view engine', 'ejs');
    app.set('views', './server/views');
}
module.exports = configViewEngine;