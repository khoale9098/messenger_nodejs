import { pushSocketIdArray, emitNotifyToArray, removeSocketIdFromArray } from '../../helpers/socketHelper';

/**
 * 
 * @param {socket.io} io 
 */
let removeRequestContact = (io) => {
    let clients = {};
    //push socket id to Array
    io.on("connection", (socket) => {
        clients = pushSocketIdArray(clients, socket.request.user._id, socket.id);
        socket.on("remove-request-contact", (data) => {
            let currentUser = {
                id: socket.request.user._id
            };
            // emit notification
            if (clients[data.contactId]) {
                emitNotifyToArray(clients, data.contactId, io, "response-remove-request-contact", currentUser)
            }
        })
        socket.on("disconnect", () => {
            //Remove SocketId 
            clients = removeSocketIdFromArray(clients, socket.request.user._id, socket)
          
        });
        console.log(clients);
    })
}
module.exports = removeRequestContact;