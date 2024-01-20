/**
 * Import Dependencies
 * 
 */

const express = require("express") // web framework
const Expense = require("../models/Expense") // remember, you're going up a file (controllers) and down a file (models) to get to Expense.js

/**
 * Routers
 */

const router = express.Router()



/**
 * Middleware
 */
router.use((req, res, next) => {
    console.table(req.session);

    if(req.session.loggedIn) {
        next();
    } else {
        res.redirect("/user/login");
    }
});




/**
 * Routes - replace app with router and take out the expenses only in router.get("/expenses...")
 */

/**
 * Seed Route with dummy data
 */

router.get("/seed", async (req, res) => {
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

        // send dummyExpenses in json to confirm creation
        // res.send(seedExpenses)

         // redirect back to the Index Page
        res.redirect("/expenses")

    } catch (error) {
     console.log(error.message);
     res.status(400).send("error, Morgan has something to say about Seed Route in the logs");
     }
});




/**
 * Index Route - GET /expenses
 */
router.get("/", async (req, res) => {
    try {

        // get username from req.session
        const username = req.session.username

        // get all expenses
        const expenses = await Expense.find({username}); // add in username
        
        // send all expenses in json
        // res.send("expenses")

        // render all expenses to index.ejs
        res.render("index.ejs", {expenses: expenses.reverse() })

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Index Route in the logs");
    }
});




/**
 * New Route = GET METHOD in order to Create a new Expense
 */

router.get("/new", (req, res) => {
    // send New Expense Form to show up on website
    // res.send("new expense form")

    // render the new expense to new.ejs
    res.render("new.ejs")
})




/**
 * Delete Route - DELETE METHOD
 */
router.delete("/:id", async (req, res) => {
    try {
        // get the expense _id
        const id = req.params.id

        // delete the expense from db
        const deletedExpense = await Expense.findByIdAndDelete(id)

        // console.log(deletedExpense)

        // redirect back to the Index Page
        res.redirect("/expenses")

    } catch (error) {
        console.log(error.message);
        res.status(400).send("Sorry, something went wrong with deleting this Expense, please contact support@spendertracker.com for help! Thanks ");
    }
});



/**
 * Update Route - PUT METHOD - from Edit Page, it already has the pre-filled info, so just PUT Update info
 */

router.put("/:id", async (req, res) => {
    try {
        // handle the checkbox
            if(req.body.requestedRefund === 'on') {
                req.body.requestedRefund = true
            } else {
                req.body.requestedRefund = false
            }
        
        // get expense _id from the params
        const id = req.params.id;

        // update expense in the db
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body)
        
        // send updatedExpense in json
        // res.send(req.body)

        // redirect back to Show Page with the update Expense
        res.redirect(`/expenses/${id}`);

    } catch (error) {
        console.log(error.message);
        res.status(400).send("Sorry, something went wrong with updating this Expense, please contact support@spendertracker.com for help! Thanks ");
    }
});




/**
 * Create Route - POST METHOD so the Expense can be POSTED to Expense Index Page
 */
router.post("/", async (req, res) => {
    try {
        if (req.body.requestedRefund === "on") {
            // if checked
            req.body.requestedRefund = true
    } else {
            // if not checked
            req.body.requestedRefund = false
    }

        // add username to req.body from req.session
        req.body.username = req.session.username

        //create Expense in db
        const newExpense = await Expense.create(req.body)

        // send newExpense in json
        // res.send(req.body)

        // redirects back to Expense Index Page
        res.redirect("/expenses")

    } catch (error) {
        console.log(error.message);
        res.status(400).send("Sorry, something went wrong with creating this Expense, please contact support@spendertracker.com for help! Thanks ");
    }
});




/**
 * Edit Route - GET METHOD from db so user can Edit The Expense
 */

router.get("/edit/:id", async (req, res) => {
    try {
        // get an expense _id from params
        const id = req.params.id;

        // get the expense from the db to edit
        const foundExpense = await Expense.findById(id)

        // render template
        res.render("edit.ejs", { expense: foundExpense })

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Edit Route in the logs");
    }
});




/**
 * Show Route - ALWAYS last - GET METHOD to get the Expense to show up
 */

router.get("/:id", async (req, res) => {
    try {

        // get an expense _id from params
        const id = req.params.id
        
        // get the expense by _id from the db
        const foundExpense = await Expense.findById(id)

        // console.log(foundExpense)

        // render show.ejs with the foundExpense
        res.render("show.ejs", { expense : foundExpense })

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Show Route in the logs");
    }
});



/**
 * Export Router
 */

module.exports = router

// comment out const Expense = require("./models/Expense.js") in server.js
// import const expenseController = require("./controllers/expense") to server.js
