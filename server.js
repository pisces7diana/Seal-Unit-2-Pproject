/**
 * Import Dependencies, such as libraries and files
 */

require("dotenv").config() // gives our server access to the .env file
const express = require("express") // web framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override") // override form submission, such as for DELETE - for DELETE PUT HTTP verbs
const mongoose= require("mongoose") // connect to mongodb

// const Expense = require("./models/Expense.js")... uncomment for now




// /**
//  * get .env variables... our db connection string
//  */

const {DATABASE_URL, SECRET, PORT} = process.env




/**
 * establish db connection
 */

mongoose.connect(DATABASE_URL)




// events for when connection changes

mongoose.connection.on("open", () => console.log ("Connected to Mongoose"))
mongoose.connection.on("close", () => console.log ("Disconnected from Mongoose"))
mongoose.connection.on("error", (error) => console.log ("uh oh, there is an error with Mongoose"))



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
    paymentMethod: {type: String, required: true},
    category: {type: String, required: true},
    notes: {type: String, required: true},
    requestedRefund: {type: Boolean, required: true},
})

/**
 * Model - object that interacts with db
 */
const Expense = mongoose.model("Expense", expenseSchema);




/**
 * create app object - this is the center of our express universe
 */

const app = express()




/**
 * Middleware
 */

app.use(morgan("dev")) //logger
app.use(methodOverride("_method")) // override form submission, such as for DELETE - for DELETE PUT HTTP verbs
app.use(express.urlencoded({extended: true})) // body parser ("breaking down data/interprete it in order to extract meaningful info") this is how we get access to req.body
app.use(express.static("public")) // serve up our public directory with the url prefix of /public/styles.css, such as localhost:number/public/styles.css so I can see my css




/**
 * ROUTES
 */

app.get("/", (req, res) => {
    res.send("Server is working")
})

/**
 * Seed Route with dummy data
 */

app.get("/expenses/seed", async (req, res) => {
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
     console.log(error.mssage);
     res.status(400).send("error, Morgan has something to say about Seed Route in the logs");
     }
});




/**
 * Index Route - GET /expenses
 */
app.get("/expenses", async (req, res) => {
    try {
        // get all expenses
        const expenses = await Expense.find({});
        
        // send all expenses in json
        // res.send("expenses")

        // render all expenses to index.ejs
        res.render("index.ejs", {expenses: expenses.reverse() })

    } catch (error) {
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Index Route in the logs");
    }
});




/**
 * New Route = GET METHOD in order to Create a new Expense
 */

app.get("/expenses/new", (req, res) => {
    // send New Expense Form in json
    // res.send("new expense form")

    // render the new expense to new.ejs
    res.render("new.ejs")
})




/**
 * Delete Route - DELETE METHOD
 */
app.delete("/expenses/:id", async (req, res) => {
    try {
        // get the expense _id
        const id = req.params.id

        // delete the expense from db
        const deletedExpense = await Expense.findByIdAndDelete(id)

        // console.log(deletedExpense)

        // redirect back to the Index Page
        res.redirect("/expenses")

    } catch (error) {
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Delete Route in the logs");
    }
});



/**
 * Update Route - PUT METHOD - from Edit Page, it already has the pre-filled info, so just PUT Update info
 */

app.put("/expenses/:id", async (req, res) => {
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
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Update Route in the logs");
    }
});




/**
 * Create Route - POST METHOD so the Expense can be POSTED to Expense Index Page
 */
app.post("/expenses", async (req, res) => {
    try {
        if (req.body.requestedRefund === "on") {
            // if checked
            req.body.requestedRefund = true
    } else {
            // if not checked
            req.body.requestedRefund = false
    }
        //create Expense in db
        const newExpense = await Expense.create(req.body)

        // send newExpense in json
        // res.send(req.body)

        // redirects back to Expense Index Page
        res.redirect("/expenses")

    } catch (error) {
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Create Route in the logs");
    }
});




/**
 * Edit Route - GET METHOD from db so user can Edit The Expense
 */

app.get("/expenses/edit/:id", async (req, res) => {
    try {
        // get an expense _id from params
        const id = req.params.id;

        // get the expense from the db to edit
        const foundExpense = await Expense.findById(id)

        // render template
        res.render("edit.ejs", { expense: foundExpense })

    } catch (error) {
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Edit Route in the logs");
    }
});




/**
 * Seed Route
 */



/**
 * Show Route - ALWAYS last - GET METHOD to get the Expense to show up
 */

app.get("/expenses/:id", async (req, res) => {
    try {

        // get an expense _id from params
        const id = req.params.id
        
        // get the expense by _id from the db
        const foundExpense = await Expense.findById(id)

        // console.log(foundExpense)

        // render show.ejs with the foundExpense
        res.render("show.ejs", { expense : foundExpense })

    } catch (error) {
        console.log(error.mssage);
        res.status(400).send("error, Morgan has something to say about Show Route in the logs");
    }
});




/**
 * turn on the server (the listener) - tells our app to listen for requests on a certain port
*/

app.listen(PORT, () => { // (PORT, FUNCTION) - the function will run after the server turns on
    console.log(`Listening on port ${PORT}`)
})