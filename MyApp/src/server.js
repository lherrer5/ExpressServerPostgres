require('dotenv').config();

const express = require("express");
const mongoose = require('mongoose');
const { errorHandler, notFoundHandler} = require("./middlewares");
const routes = require("./routes");
const sequelize= require("./utils/postgresql");
const PORT = process.env.PORT || 3080,
    app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use(notFoundHandler);
app.use(errorHandler);

//create mongo connection
const start = async () => {
    try {
        console.log("Connecting to", process.env.MONGO_CONNECTION);
        await mongoose.connect(process.env.MONGO_CONNECTION, {
//to procces the query on my URL
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await sequelize.authenticate();
        await sequelize.sync(); 

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();