let express = require("express");
let app = express();
let L = require("./Login.js");
let I = require("./Inbox.js");
let body = require("body-parser");
let session = require('express-session');
let cookieParser = require('cookie-parser');
app.use(body.urlencoded({extended: false}));
app.use(cookieParser());
app.use(body.json());
app.use("/",L);
app.use(session({secret: 'your secret', saveUninitialized: true, resave: false}));
app.use("/inbox",I);
app.set('view engine', "ejs");

app.listen(8000);