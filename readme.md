# Seal Project 2

- ** Your Name: ** Diana Hudson
- ** App Name: ** Expense Tracker
- ** Description: ** Expense tracking app that utilizes CRUD, MVC Build and/or with Session Based Auth
- ** GitHub URL: ** https://github.com/pisces7diana/Seal-Unit-2-Pproject
- ** Deployed Website: ** https://dh-seal-unit-2-project.onrender.com/
- ** Trello Board: ** https://trello.com/invite/b/MFgf5XZs/ATTI101ba705b218db9c7f072b63adfa02a38F4AC722/ga-unit-2-project

## List of Dependencies

#### Node Dependencies (that's inside package.json)

- "bcrypt": "^5.1.1",
- "connect-mongo": "^5.1.0",
- "dotenv": "^16.3.1",
- "ejs": "^3.1.9",
- "express": "^4.18.2",
- "express-session": "^1.17.3",
- "method-override": "^3.0.0",
- "mongoose": "^8.0.4",
- "morgan": "^1.10.0"

#### Frontend (if used, e.g. jQuery, alpine, bootstrap, htmx, etc.) - link tag or script tag to use in the front end

- HTML
- CSS
- Javascript
- Alpine

for now


## Route Map

Below should be a table listing the different routes in my app and their purposes

| Route Name | Endpoint         | Method | Description |
| ---------- | ---------------- | ------ | ----------- |
| Index      | /expense           | GET    | Renders all of the Expenses on the Index page
| New        | /expense/new       | GET    | user will be directed to a "New" Page that allows them to "Create" the Expense
| Delete     | /expense/:id       | DELETE | user can delete an Expense from the Index page
| Update     | /expense/:id       | PUT    | user can update a Expense from the Edit Page
| Create     | /expense           | POST   | user can create a new Expense from the "New" Page route
| Edit       | /expense/edit/:id  | GET    | user will be directed to an "Edit Page" that allows them to "Update" the Expense.
| Show       | /expense/:id       | GET    | shows a particular Expense recorded


## Design Mockups (Desktop + Mobile)

#### Mobile Design + Desktop Design

![Mobile Design Mockup](https://i.imgur.com/Qj8PWYt.png)

#### Desktop Design

![Desktop Design Mockup](https://i.imgur.com/0Uep4xv.png)

## ERD (Entity Relationship Program)

This should be a diagram showing my models and any relationships between them

![Entity Relationship Program](https://i.imgur.com/2pXno58.png)

