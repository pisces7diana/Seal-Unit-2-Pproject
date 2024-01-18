/**
 * Import Dependencies
 */

const mongoose = require("./connection"); // web framework
const Expense = require("./Expense");

/**
 * Seed
 */

mongoose.connection.on("open", async () => {
    try {
        // array of dummy Expenses
        const dummyExpenses = [
             {merchant: "Panda Express", date: "January 1, 2024", price: 1, paymentMethod: "cash", category: "Food", notes: "break from work", requestedRefund: false},
             {merchant: "Chick-fil-A", date: "January 2, 2024", price: 3, paymentMethod: "1234", category: "Drinks", notes: "break from school", requestedRefund: false},
             {merchant: "Chilli's", date: "January 3, 2024", price: 5, paymentMethod: "cash", category: "Food", notes: "test", requestedRefund: false},
             {merchant: "Walmart", date: "January 4, 2024", price: 7, paymentMethod: "9010", category: "Clothes", notes: "nothing", requestedRefund: false},
             {merchant: "Rent", date: "January 5, 2024", price: 9, paymentMethod: "0001", category: "Home", notes: "Husband", requestedRefund: false},
        ];
        
        // delete all dummy expenses
        await Expense.deleteMany({});
        
        // seed my dummy Expenses
        const seedExpenses = await Expense.create(dummyExpenses);

        // log the created dummy expenses
        console.log("----- DUMMY EXPENSES CREATED -----");
        console.log(seedExpenses);
        console.log("----- DUMMY EXPENSES CREATED -----");

        // close the DB connection
        mongoose.connection.close();

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Seed Route in the logs");
    }

});