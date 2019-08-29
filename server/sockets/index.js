import addNewContact from './contact/addNewContact'
import removeRequestContact from './contact/removeRequestContadt'
/**
 * 
 * @param {socket} io 
 */
let initSockets = (io) => {
    addNewContact(io);
    removeRequestContact(io)
    //
}
module.exports = initSockets;