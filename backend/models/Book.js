
const mongoose = require("mongoose"); 

const Book = new mongoose.Schema({ 
  book:{
    type : String,
    // required: true
  },
  author: {
    type: String,
    // required: true, 
  },
  price: {
    type: Number,
    // required: true, 
  },
  description:{
    type: String,
    // required: true,
  },
  image:{
    type: String,
    // required: true,
  },
});


// eslint-disable-next-line no-undef
module.exports = mongoose.model("book", Book); 