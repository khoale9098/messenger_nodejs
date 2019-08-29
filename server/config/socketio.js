let configSocketIo = (io) => {
    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: "express.sid",
        secret: "mySecret",
        store: session.sessionStore,
        success: (data, accept) => {
            //Khi người dùng chưa đăng nhập
            if (!data.user.logged_in) {
                return accept("Invalid user.", false);
            }
            return accept(null, true)
        },
        fail: (data, message, error, accept) => {
            if (error)
                console.log('failed connection to socket.io:', message);
            accept(new Error(message), null);
        }
    }))
}
module.exports = configSocketIo;