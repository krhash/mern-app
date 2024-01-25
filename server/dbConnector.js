// dbConnector.js
const mongoose = require('mongoose');
const { DB_NAME, DB_PORT } = require('./constants');

let dbConnection;

async function connectToDatabase() {
    try {
        if (!dbConnection) {
            const dbUri = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;

            mongoose.connection.on('connected', () => {
                console.log('Connected to MongoDB');
            });

            mongoose.connection.on('error', (err) => {
                console.error('MongoDB connection error:', err);
            });

            mongoose.connection.on('disconnected', () => {
                console.log('Disconnected from MongoDB');
            });

            dbConnection = await mongoose.connect(dbUri);
            // Check if the connection is successful

            console.log('Connected to the database');

            // Close the Mongoose connection when the Node process is terminated
            process.on('SIGINT', () => {
                mongoose.connection.close(() => {
                    console.log('Mongoose connection closed');
                    process.exit(0);
                });
            });
        }
    } catch (error) {
        console.error('Error connecting to the database: ', error.message);
        throw error; // Propagate the error to the caller if connection fails
    }
}

function closeDatabaseConnection() {
    if (dbConnection) {
        dbConnection.disconnect();
    }
}

module.exports = { connectToDatabase, closeDatabaseConnection };
