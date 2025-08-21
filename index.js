
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const UrlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/userRoute");

const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly,checkAuth} = require("./middleware/auth");
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/short-url")
        .then(()=> console.log("Mongo DB connected"))
        .catch((err)=>console.log("Error :",err));

app.set("view engine","ejs");
app.set("views",path.resolve('./views'));
app.use(cookieParser());

app.use('/',checkAuth,staticRoute);
app.use('/url',restrictToLoggedinUserOnly,UrlRoute);
app.use('/user',userRoute);


app.listen(PORT,()=> console.log(`Server running on PORT : ${PORT}`));