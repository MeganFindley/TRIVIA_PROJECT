const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

dotenv.config({path: './.env'});

const app = express();

app.use(express.urlencoded());
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"));

app.get("/", (req,res) => {
    res.send("Hello Backend");
});

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
                    score: null
                }
            );
            res.send('User registered');
        }else{
            res.send("Passwords don't match");
        }
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});