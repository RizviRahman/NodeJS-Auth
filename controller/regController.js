const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");


router.get('/',(req, res)=>{
    res.status(200).render("signup");
});


// Add a user
router.post("/", async(req, res) => {

    const hasdPsw = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      username: req.body.username,
      uid: req.body.uid,
      password: hasdPsw,
    });


    newUser.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
            console.log(err);
        } else {
              res.status(200).json({
              message: "User successfully inserted!",
              });
              console.log(req.body);
        }
    });
});

module.exports = router;