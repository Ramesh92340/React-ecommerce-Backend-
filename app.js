const express = require("express");
const app = express()
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

app.use (bodyParser.json());

app.use ('/',userRoutes);
app.use ('/',productRoute);

const PORT = process.env.PORT || 3016;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});