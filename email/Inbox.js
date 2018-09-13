let express = require('express');
let router = express.Router();
let mysql = require("mysql");
let session = require('express-session');
let cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));
let connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "email"
});

router.get("/",function(req,res){
    if(req.session.email){
        let email = req.session.email;
        let insertQuery=`SELECT * from emailtable where (recipient="${email}")`
        connection.query(insertQuery, (err, result) =>{
            if(err) throw err;
            res.render("Inbox",{email, result});
        })
    }
    else{
        res.redirect("/");
    }
})
router.get("/sent",function(req,res){
    if(req.session.email){
        let email = req.session.email;
        let insertQuery=`SELECT * from emailtable where (sender="${email}")`
        connection.query(insertQuery, (err, result) =>{
            if(err) throw err;
            res.render("sent",{email, result});
        })
    }
    else{
        res.redirect("/");
    }
})

router.get("/logout",function(req,res){
    req.session.destroy();
    res.redirect("/");
})



module.exports = router;