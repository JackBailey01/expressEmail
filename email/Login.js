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
router.get('/', function(req, res) {
    res.render('Login',{message:""});
});

router.post("/login", (req,res)=>{
    let email = req.body.email;
    let password = req.body.Password;
    let insertQuery=`SELECT * from login where email="${email}" AND password ="${password}"`
    connection.query(insertQuery, (err, result) =>{
        if (result.length > 0) {
            req.session.email=email;
            res.redirect(`/inbox`);
        }
        else  {
            res.render('Login',{message: "Email or Password is incorrect"});
        }
    })


})
module.exports = router;