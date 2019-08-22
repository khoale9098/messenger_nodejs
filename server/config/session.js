import session from 'express-session'
import connectMongo from 'connect-mongo';
let MongoStore = connectMongo(session);
// Đây là nơi để lưu trữ session : MongoDB
let sessionStore = new MongoStore({
    //Bug chỗ biến môi trường chưa fix được =))))
    // url = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, 
    url: 'mongodb://localhost:27017/messenger',
    autoReconnect: true,
    // autoRemove: "native"
})
/**
 * 
 * @param app 
 */
let configSession = (app)=>{
    app.use(session({
        key: "express.sid",
        secret: "mySecret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        }
    }))
}
module.exports  = configSession;