import ContactModel from '../models/Contact';
import UserModel from '../models/Users'
import _ from "lodash"
let findUsersContact = (currentUserId, keyword) => {
    return new Promise(async (resolve, reject) => {
        let deprecatedUserIds = [];
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
module.exports = { 
    findUsersContact: findUsersContact,
}