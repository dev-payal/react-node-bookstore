
const mongoose = require("mongoose"); 

const User = new mongoose.Schema({ 
  userName:{
    type : String,
    required: true
  },
  email: {
    type: String,
    required: true, // All fields are optional unless you specify otherwise
  },
  password: {
    type: String,
    required: true,
  }
});


// eslint-disable-next-line no-undef
module.exports = mongoose.model("user", User); // Export the Schema as a mongoose model