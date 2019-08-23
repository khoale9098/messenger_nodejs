import mongoose from 'mongoose'
import bluebird from 'bluebird';

//Conect to MongoDB
let connectDB = () => {
    mongoose.Promise = bluebird;
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    return mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
}
module.exports = connectDB;