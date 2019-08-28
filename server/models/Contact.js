import mongoose from 'mongoose'
let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: { type: String, default: false },
    createAt: { type: Number, default: Date.now },
    updateAt: { type: Number, default: null },
    deleteAt: { type: Number, default: null }
})
ContactSchema.statics = {
    createNew(item) {
        //this : ContactSchema = Schemamongoose
        // create: function of Schema
        return this.create(item)
    },
    /**
     * 
     * @param {string} userId 
     */
    findAllByUser(userId) {
        return this.find({
            $or: [
                { "userId": userId },
                { "contactId": userId }
            ]
        }).exec();
    },
    //Kiểm tra tồn tại
    /**
     * 
     * @param {id} userId 
     * @param {id} contactId 
     */
    checkExists(userId, contactId) {
        return this.findOne({
            $or: [
                {
                    $and: [
                        { "userId": userId },
                        { "contactId": contactId }
                    ]
                },
                {
                    $and: [
                        { "userId": contactId },
                        { "contactId": userId }
                    ]
                },
            ]
        }).exec();
    },
    /**
     * 
     * @param {string} userId 
     * @param {string} contactId 
     */
    removeRequestContact(userId, contactId) {
        return this.deleteOne({
            $and: [
                { "userId": userId },
                { "contactId": contactId }
            ]
        }).exec();
    }

}
module.exports = mongoose.model("contact", ContactSchema)