const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
require("dotenv").config({path:"./config/config.env"});

const app = express();

// middelewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/', require('./routes/auth'));

app.get('/',(req,res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running at ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});

