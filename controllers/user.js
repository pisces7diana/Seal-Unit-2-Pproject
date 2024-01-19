/**
 * Import Dependencies
 */

const express = require("express") // web framework
const User = require("../models/user")
const bcrypt = require("bcrypt")

/**
 * Router
 */

const router = express.Router()

/**
 * Routes
 */

// Signup Page Route (GET -> /user/signup -> form)
router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

// Signup Submit Route (POST -> /user/signup -> create the user)
router.post("/signup", async (req, res) => {
    try {
        // encrypt pw
        req.body.password = await bcrypt.hash(
            req.body.password,
            await bcrypt.genSalt(10))

        // send signup to show up on webite
        // res.send("signup")

        console.log("Hashed Password:", req.body.password);

        // create user
        await User.create(req.body);
        
        //redirect user to login
        res.redirect("/user/login");

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Signup Submit Route in the logs");
        res.status(500).send("Sorry, username isn't available for grabs, please try another one");
    }
})

// Login Page Route (GET -> /user/login -> form)
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

// Login Submit Route (POST -> /user/login -> login the user)
router.post("/login", async (req, res) => {
    try {
        
        // get the username and pw from req.body
        const {username, password} = req.body // used destructuring
        
        // search the db for the user
        const user = await User.findOne({username}) // {username: username} - find a user with the matching username

        // check if user exists
        if(!user) {
            throw new Error("User Error: User Not Found");
        }
        // check if the pw matches between what user entered in the form vs. db
        const result = await bcrypt.compare(password, user.password)

        // check if the pw matches
        if(!result) {
            throw new Error("User Error: Incorrect password, try again")
        }

        // b/c of app.use(session), now user's logged in, save that the user has logged in in req.session
        req.session.username = username,
        req.session.loggedIn = true

        // redirect to Expense Index Page
        res.redirect("/expenses")

    } catch (error) {
        console.log(error.message);
        res.status(400).send("error, Morgan has something to say about Login Submit Route in the logs");
        res.status(500).send("Sorry, that's an inncorrect password, please try again");
    }
});

// Logout Submit Route (GET -> destroy the cookie sesh)
router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        // send logout to show up on website
        // res.send("logout")
        res.redirect("/user/login")
    })
});


/**
 * Export Router
 */

module.exports = router

// import const userController = require("./controllers/user") to server.js