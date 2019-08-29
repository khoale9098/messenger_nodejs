/**
 * 
 * @param {socket.io} io 
 */
let removeRequestContact = (io) => {
    let clients = {};
    //push socket id to Array
    io.on("connection", (socket) => {
        let currentUserId = socket.request.user._id;

        if (clients[currentUserId]) {
            clients[currentUserId].push(socket.id);
        }
        else {
            clients[currentUserId] = [socket.id];
        }
        socket.on("remove-request-contact", (data) => {
            let currentUser = {
                id: socket.request.user._id
            };
            // emit notification
            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit("response-remove-request-contact", currentUser);
                })
            }
        })
        socket.on("disconnect", () => {
            //Remove SocketId 
            clients[currentUserId] = clients[currentUserId].filter(socketId => socketId !== socket.id);
            if (clients[currentUserId].length) {
                delete clients[currentUserId];
            }
        });
        console.log(clients);
    })
}
module.exports = removeRequestContact;