const mongoose = require("mongoose");

const dbConnect = mongoose
    .connect("mongodb+srv://Omee:RizviRahman@learnmongodb.0pijh.mongodb.net/jobOffers?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("Database connection successfull"))
    .catch((err)=>console.log(err));


module.exports = dbConnect;