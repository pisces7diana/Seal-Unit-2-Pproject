/**
 * IMPORT DEPENDENCIES, such as libraries and files
 */

require('dotenv').config() // gives our server access to the .env file
const express = require('express') // web framework
const morgan = require('morgan') // logger
const methodOverride = require('method-override') // override form submission, such as for DELETE
const mongoose= require('mongoose') // connect to mongodb

/**
 * get .env variables... our db connection sting
 */

const {DATABASE_URL, SECRET, PORT} = process.env

/**
 * establish db connection
 */

mongoose.connect(DATABASE_URL)

// events for when connection changes

mongoose.connection.on('open', () => console.log ('Connected to Mongoose'))
mongoose.connection.on('close', () => console.log ('Disconnected from Mongoose'))
mongoose.connection.on('error', (error) => console.log ('uh oh, there is an error with Mongoose'))

/**
 * create app object - this is the center of our express universe
 */

const app = express()

/**
 * ROUTES
 */

app.get('/', (req, res) => {
    res.send("Server is working")
})

/**
 * turn on the server (the listener) - tells our app to listen for requests on a certain port
*/

app.listen(PORT, () => { // (PORT, FUNCTION) - the function will run after the server turns on
    console.log(`Listening on port ${PORT}`)
})