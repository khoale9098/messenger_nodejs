import ContactModel from '../models/Contact';
import UserModel from '../models/Users'
import _ from "lodash"
let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [currentUserId];
        let contactsByUser = await ContactModel.findAllByUser(currentUserId);
        contactsByUser.forEach(contact => {
            deprecatedUserIds.push(contact.userId);
            deprecatedUserIds.push(contact.contactId);
        })
        deprecatedUserIds = _.uniqBy(deprecatedUserIds);
        // console.log(deprecatedUserIds)
        let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword)
        resolve(users);
    });
}
let addNew = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let contactExist = await ContactModel.checkExists(currentUserId, contactId);
        if (contactExist) {
            return reject(false);
        }
        let newContactItem = {
            userId: currentUserId,
            contactId: contactId
        };
        let newContact = await ContactModel.createNew(newContactItem);
        resolve(newContact);
    })
}
let removeRequestContact = (currentUserId, contactId) => {
    return new Promise(async (resolve, reject) => {
        let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
        console.log(removeReq);
        if (removeReq.n === 0) {
            return reject(false)
        }
        resolve(true)
    })
}

module.exports = {
    findUsersContact: findUsersContact,
    addNew: addNew,
    removeRequestContact: removeRequestContact
}