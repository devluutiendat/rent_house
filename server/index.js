const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/dbconfig");
require('dotenv').config();
const initRoutes = require('./routers');
const { errorHandler } = require("./middlewares/error");
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
connectDB();

app.use(errorHandler)

app.listen(3000, () => console.log(`Server is running on port 3000`));
