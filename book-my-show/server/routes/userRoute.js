const express = require("express");

// const User = require("./")

const app = express();

app.get("/api/products", (req, res)=>{
    return res.send("Response from api");
})