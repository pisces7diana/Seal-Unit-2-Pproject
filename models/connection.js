/**
 * Import Dependencies
 * 
 */

require("dotenv").config() // gives our server access to the .env file
const mongoose= require("mongoose") // connect to mongodb

/**
 * Establish Connection
 */

// get my URL from my env.
const {DATABASE_URL, SECRET, PORT} = process.env

// establish connection
mongoose.connect(DATABASE_URL)

// events for when connection changes

mongoose.connection.on("open", () => console.log ("Connected to Mongoose"))
mongoose.connection.on("close", () => console.log ("Disconnected from Mongoose"))
mongoose.connection.on("error", (error) => console.log ("uh oh, there is an error with Mongoose"))

/**
 * Export Connection
 */
module.exports = mongoose