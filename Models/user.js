const mongoose = require('mongoose')
const user = new mongoose.Schema({
    
        Name: {
          type: String,
          required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
          type: String,
          required: true,
      
      },
        rolls: {
        type: String,
        required: true,
        default :"user"
        },
        tokens: [
          {
            type: String,
            required: true,
            default: "",
          },
        ]
        ,

        isAdmin: {
          type: Boolean,
          default: false,
        },

    
        visitHistory: [{ timestamp: { type: Number } }],
      },
      { timestamps: true }
)





const User = mongoose.model("fooduser", user);

module.exports = User;
