//server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Env variables (to transfer)
const  PORT = process.env.PORT || 5000

//Mongo connection setup 
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

//Define User Model
const User= mongoose.model('User', 
{username: String, password: String,});

app.use(cors());
//Express middleware to parse JSON
app.use(express.json());

//Signup Route
app.post('/signup', async(req, res) => {
    try{
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ userame, password: hashedPassword});
        await  user.save()
        res.status(201).json({message: 'User Registered succesfully'})
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
})

// // Assuming you already have a User model defined
// const User = require('./models/user');
 
// app.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;
 
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }
 
//     // Create a new user
//     const newUser = new User({ email, password });
//     await newUser.save();
 
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

//Login Route
app.post('/login', async(req,res)=>
{try{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user || !(await bcrypt.compare(password, user.password))){
        return res.status(401),json({error: 'Invalid Credential'})
    }

    //Generate JWT Tokens
    const token = jwt.sign({userId: user._id}, '<THE_SECRET_KEY>', {expiresIn: '1h'});

        res.status(200).json({token});
}catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
}
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
  
