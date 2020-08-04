const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const cookie = require('cookie-parser');
const jwt =  require('jsonwebtoken');
const auth = require('./middleware/auth');

dotenv.config({path: './.env'});

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookie());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));


//-----------HOME PAGE----------------------------------------------------------
app.get("/api", async (req,res) => {
    let user = await User.find().sort({score: -1, minutes: 1, seconds: 1});
    let users = [];
    for(let i=0; i<10; i++){
        users.push(user[i]);
    }
    console.log(users);
    res.json({top10: users});
    //res.json({city: 'manchester'});
});

//-----------REGISTER PAGE----------------------------------------------------------
app.post("/register", async (req, res) => {
    let {userName, userEmail, userPassword, confirmPass} = req.body;
    let hashedPass = await bcrypt.hash(userPassword, 8);
    let userCheck = await User.find({username: userName});
    let emailCheck = await User.find({email: userEmail});

    if(userCheck.length>0){
        res.send('That username is already taken');
    }else if(emailCheck.length>0){
        res.send('That email is already taken');
    }else{
        if(userPassword == confirmPass){
            await User.create(
                {   
                    username: userName,
                    email: userEmail,
                    password: hashedPass,
                    score: Math.floor(Math.random()*10+1),
                    minutes: Math.floor(Math.random()*10+1),
                    seconds: Math.floor(Math.random()*59+1)
                }
            );
            res.send('User registered');
        }else{
            res.send("Passwords don't match");
        }
    }
});

//-----------LOGIN PAGE----------------------------------------------------------
app.post("/login", async (req,res) => {
    let {userEmail, userPassword} = req.body;
    let user = await User.find({email: userEmail});
    if(user.length > 0){
        let isMatch = await bcrypt.compare(userPassword, user[0].password);
        if(isMatch || userPassword == user[0].password){
            let token = jwt.sign( {id: user[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
            let cookieOpts = {
                expires: new Date(                       
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            };
            res.cookie('jwt', token, cookieOpts);
            res.send('logged in');
        }else{
            res.send('password wrong try again');
        }
    }else{
        res.send('Email not found please register');
    }
});

// ---------LOGOUT PAGE-------------------------------------------------------------
app.post("/logout", auth.logOut, (req,res) => {
    res.send('Logged out');
});

//----------PAGE HIDDEN--------------------------------------------------------------
app.get("/hidden", async (req,res) => {
    if(req.cookies.jwt){
        res.json({loggin: true});
    }else{
        res.json({loggin: false});
    }
});

//----------QUIZ BUILD---------------------------------------------------------------

app.post("/questions", async (req,res) => {
    let {amount, category, difficulty} = req.body;
    let apiInfo = [amount, category, difficulty];
    res.json({urlData: apiInfo});
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});