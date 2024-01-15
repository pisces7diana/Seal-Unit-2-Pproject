/**
 * DEPENDENCIES
 */

const mongoose = require('mongoose')

/**
 * Create my Expenses Model
 * destructure Schema and model in their own variabes
 */
const {Schema, model} = mongoose;
// const Schema = mongoose.Schema
// const model = mongoose.model

/**
 * Schema - shape
 */

const expenseSchema = new mongoose.Schema ({
    merchant: {type: String, required: true},
    date: {type: String, required: true},
    price: {type: Number, required: true},
    paymentMethod: {type: Number, required: true},
    notes: {type: String, required: true},
    requestedRefund: {type: Boolean, required: true},
})

/**
 * Model - object that interacts with db
 */
const Expense = mongoose.model('Expense', expenseSchema);

/**
 * Export the Model
 */

module.exports = Expense

// import const Expense = require('./models/Expense.js') to server.js