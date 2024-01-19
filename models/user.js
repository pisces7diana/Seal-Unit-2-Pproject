/**
 * Import Dependencies
 */

const mongoose = require("./connection"); // web framework

/**
 * Define User Model
 */

/**
 * Create my User Model
 * destructure Schema and model in their own variabes
 */
const {Schema, model} = mongoose;
// const Schema = mongoose.Schema
// const model = mongoose.model

/**
 * Schema - shape
 */

const userSchema = new mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

/**
 * Model - object that interacts with db
 */
const User = mongoose.model("User", userSchema);

/**
 * Export the Model
 */

module.exports = User