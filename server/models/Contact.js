import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let ContactSchema  = new Schema({
    userId: String,
    contactId: String,
    status: {type: String, default: false},
    createAt: {type: Number, default: Date.now},
    updateAt: {type: Number, default: null},
    deleteAt: {type: Number, default: null}
})
ContactSchema.statics = {
    createNew(item){
        //this : ContactSchema = Schemamongoose
        // create: function of Schema
        return this.create(item)
    }
}
module.exports = mongoose.model("contact", ContactSchema)