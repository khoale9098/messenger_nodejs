/**
 * 
 * @param {socket.io} io 
 */
let addNewContact = (io) => {
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
        socket.on("add-new-contact", (data) => {
            let currentUser = {
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar,
            };
            // emit notification
            if (clients[data.contactId]) {
                clients[data.contactId].forEach(socketId => {
                    io.sockets.connected[socketId].emit("response-add-new-contact", currentUser);
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
module.exports = addNewContact;