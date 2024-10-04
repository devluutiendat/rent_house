require("dotenv").config()
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, // Database username
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST,  
        dialect:  process.env.DB_DIALECT,
        logging:false,
        timezone:"+07:00"
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {connectDB };
