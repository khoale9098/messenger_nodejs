import { pushSocketIdArray, emitNotifyToArray, removeSocketIdFromArray } from '../../helpers/socketHelper';
/**
 * 
 * @param {socket.io} io 
 */
let addNewContact = (io) => {
    let clients = {};
    //push socket id to Array
    io.on("connection", (socket) => {
        clients = pushSocketIdArray(clients, socket.request.user._id, socket.id);
        //
        socket.on("add-new-contact", (data) => {
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };
            // emit notification
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-add-new-contact", currentUser)
            }
        })
        socket.on("disconnect", () => {
            //Remove SocketId 
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket)
        });
    })
}
module.exports = addNewContact;