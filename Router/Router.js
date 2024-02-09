const express = require("express");
const Router = express.Router()
const bcrypt = require('bcrypt');
const User = require("../Models/user");

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
  
    const {email, password } = req.body;
 
    try {
      const user = await User.findOne({ email });
    
      
      if (!user) {
        throw new Error('User not found');
      }
  
      if (!user.password) {
        throw new Error('User password not set'); // Handle the case where password is not set
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error('Invalid password');
      }
  
      console.log('Password match:', isPasswordMatch);
      

      res.json({ data: "succesfully ", success: true });
    } 
    catch (error) {
      console.error("Error during user creation:", error);
      res.status(402).json({ data: "Something went wrong", success: false });
    }
});



module.exports = Router