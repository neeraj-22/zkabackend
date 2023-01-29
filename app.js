//Importing Server & DB Files
const express = require("express");
const app = express()
const connectDatabase = require("./config/databaseConnect.js")

//Importing dotenv to read .env files
const dotenv = require("dotenv")

//Importing Error Handler - middleware
const errorMiddleware = require("./middlewares/error.js");

//Importing Cookie Parser 
// const cookieParser = require("cookie-parser")

//Importing Routes
const userRoutes = require("./routes/userRoutes.js")


app.use(express.json());
// app.use(cookieParser());

//Function run to read .env properties
dotenv.config();

//Connecting to DB
connectDatabase();

//Accessing User Routes
app.use('/api', userRoutes);

//Using Error MiddleWare
app.use(errorMiddleware)

//Initialising Server
const initServer = app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})

//Shutting server when UnHandled Promise 
process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting server bc of unhandled rejection`);

    initServer.close(() => {
        process.exit(1);
    })
})

process.on("uncaughtException", err => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting server bc of uncaught exception`);
        process.exit(1);
})