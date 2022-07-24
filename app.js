// module imports
const express = require("express");
const session = require("express-session");
const path = require("path");
const mongoose = require("mongoose");



// internal file imports
// const loginRouter = require("./route/loginRouter");
// const isAuth = require("./middleware/isAuth");
const regController = require("./controller/regController");
const loginController = require("./controller/loginController");
const logoutController = require("./controller/logoutController");
const isAuth = require("./middleware/isAuth");


mongoose
    .connect("mongodb+srv://Omee:RizviRahman@learnmongodb.0pijh.mongodb.net/jobOffers?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("Database connection successfull"))
    .catch((err)=>console.log(err));



const app = express();

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    })
);


// app.use('/login', loginRouter);

app.use("/registration", regController);
app.use("/login", loginController);
app.use("/smoothies", isAuth, (req, res)=>{ res.render("smoothies",{user: req.session.user}); });
app.use("/logout", logoutController);

app.use("/", (req, res)=>{ res.render("home",{user: req.session.user}); });


PORT = 5000;
app.listen(PORT, console.log(`Application is running http://localhost:${PORT}`));