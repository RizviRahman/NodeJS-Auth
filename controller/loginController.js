const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");

router.get('/',(req, res)=>{
    res.status(200).render("login", { user: null });
});

router.post('/', async(req, res)=>{
    const { uid, password } = req.body;
    const user = await User.findOne({ uid });
    if (!user) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    
    req.session.isAuth = true;
    req.session.user = user;
    console.log("Login successfull");
    res.redirect("/smoothies");
});



module.exports = router;