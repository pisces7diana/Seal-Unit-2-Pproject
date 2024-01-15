// /**
//  * Index Route - GET /expenses
//  */
// app.get('/expenses', async (req, res) => {
//     try {
//         // get all expenses
//         const expenses = await Expense.find({});
    
//         // render all expenses to index.ejs
//         res.render('index.ejs', {expenses: expenses.reverse() })
//     })
//     } catch (error) {
//         console.log(error.mssage);
//         res.status(400).send("error, Morgan has something to say in the logs");
//         };
