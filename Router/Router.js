const express = require("express");
const Router = express.Router()
const bcrypt = require('bcrypt');
const User = require("../Models/user");
const  jwt  = require("jsonwebtoken");
const auth = require("../middleware/auth");
const key = "sonu1234"

Router.get('/',(req,res)=>{

    res.send("server start correctly")

})

Router.post('/resgition', async (req, res) => {
    console.log("appio working");
    
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const userdata = await User.create({
          Name: name,
          email: email,
          password: hashedPassword,
      });
      res.json({ data: userdata, success: true });
    } catch (error) {
      console.error("Error during user creation:", error);
      res.status(402).json({ data: "Something went wrong", success: false });
    }
});


Router.post('/login', async (req, res) => {
  
    const {email, passwords } = req.body;

    try {
      const user = await User.findOne({ email });
     
      if (!user) {
      return  res.json({ message :"user name is wrong" ,success : false})
       
      }
      
     
      const isPasswordMatch = await bcrypt.compare(passwords, user.password);
      
      
      if (!isPasswordMatch) {
      return  res.json({ message :"passwrod is wrong" ,success : false})
       
      }

      const token = jwt.sign({_id: user._id.toString()} , key)
  
      user.tokens =token
      await user.save()

      if(user.isAdmin)
      {
        res.json({ data: user, token, isAdmin : user.isAdmin  ,  success: true });

      }
      else
      {
        res.json({ data: user, token, isAdmin : user.isAdmin  ,  success: true });
      }

    } 
    catch (error) {
      console.error("Error during user creation:", error);
      res.status(402).json({ data: "Something went wrong", success: false });
    }
});

Router.get('/profile', auth, (req, res) => {
  console.log("api working");
  res.json({ data: req.user, success: true });
});





module.exports = Router