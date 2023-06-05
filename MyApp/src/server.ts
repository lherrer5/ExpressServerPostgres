import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { Server } from "socket.io";
//import express from "express";
import mongoose from "mongoose";
import { errorHandler, notFoundHandler } from "./middlewares";
import routes from "./routes";
import sequelize from "./utils/postgresql";
import { io as handler } from "./controllers";

const express= require("express"), PORT= process.env.PORT||3080;//n
const app=express();//n
const server=http.createServer(app);//n
const io= new Server(server,{cors:{origin:"*"}});//n
io.on("connection", handler);
//const PORT = process.env.PORT || 3080, app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use(notFoundHandler);
app.use(errorHandler);


//if(process.env.MONGO_CONNECTION){}

//create mongo connection
const start = async () => {
    try {
        if(process.env.MONGO_CONNECTION){
        console.log("Connecting to", process.env.MONGO_CONNECTION);

        await mongoose.connect(process.env.MONGO_CONNECTION, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
       // await sequelize.authenticate();
        await sequelize.sync(); 

server.listen(PORT, () => {//n
            console.log(`Server started on port ${PORT}...`);
        });

        // app.listen(PORT, () => {
        //     console.log(`Server started on port ${PORT}...`);
        // });
    }   
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();