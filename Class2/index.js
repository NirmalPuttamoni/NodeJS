// import the express module
const express = require('express');

// create an express application
const app = express();
app.use(express.json());
// app.use(express.static("public"));


const loggerMiddleware = (req, res, next) => {
    console.log(`Date: ${new Date().toISOString()} \nMethod: ${req.method} \nURL: ${req.url}`);
    next();
}

// app.use(loggerMiddleware)

//define a route
app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.get("/about", (req, res) => {
    res.send("this is the about page");
})

app.post("/data", (req, res) => {
    console.log(req);
    res.send("received a post request");
})

const users = [
    { id: 1, name: "User 1" },
    { id: 1, name: "User 2" }
];

// Post endpoint to create a new user
app.post("/users", (req, res) => {
    const newUser = req.body;
    const userId = users.length + 1;
    newUser.id = userId;
    users.push(newUser);
    res.status(201).json({ message: "User Created Successfully", user: newUser })
})

app.get("/users", (req, res) => {
    res.status(200).json({ data: users });
})


/**
 * Route parameters : /users/3 => /users/:id
 * delete a user with id 3  => /users/3 => /users/:id
 */


//delete endpoint to delete a user by id
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    console.log("user Id ", userId);

    const userIndex = users.find(user => user.id == userId);
    if (userId == -1) {
        return res.status(404).json({ message: "user not found" });
    }
    //remove user from users data
    users.splice(userIndex, 1);

    res.json({ message: "User deleted" })
})




app.get("/special", loggerMiddleware, (req, res) => {
    res.send("special page");
})


/**
 * query parameters /users?name=John
 */

app.get("/search", (req, res) => {
    // access query parameters
    const params = req.query;
    console.log(params)
    return res.send(`Hello, ${params.name}`)
})

// Shows Page Not Found for all the routes which are not matched with above endpoints
app.use((req, res) => {
    res.status(404).send("Page Not Found")
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})