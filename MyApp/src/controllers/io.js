module.exports=(socket)=>{
    socket.on("offer", (payload)=>{
        console.log("Offer received", payload);
        socket.emit("update", payload);
    });

    socket.on("message", (payload)=>{
        socket.emit("chat", payload);
    });

    socket.on("disconnect", ()=>{
        console.log("Close connection");
    });

    socket.emit("status", "successfully connected to the socket");
}