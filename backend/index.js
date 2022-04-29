const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const PORT = 4000;
//Middleware
app.use(cors());
app.use(express.json());

//Routing
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/books');
app.use('/api/v1', authRouter);
app.use('/user/bookstore', bookRouter);

//Connetion with database
mongoose.connect(process.env.SERVER_DB_ADDRESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((_e) => console.log("MongoDB ready"))
  .catch(console.error);


app.listen( PORT, () => {
  console.log(`Server is running at port ${PORT}`);
}); 