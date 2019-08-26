import UserModel from '../models/Users';

/**
 * 
 * @param id 
 * @param item 
 */
let updateUser = (id, item)=>{
    return UserModel.updateUser(id, item)
}
module.exports = {
    updateUser: updateUser
}