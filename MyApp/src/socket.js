const io= require("socket.io")(3001, {
    cors:{ origins: "*"}
});

const {io}=require("./controllers")
io.on("connection", io);
