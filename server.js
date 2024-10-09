const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const port = 3000;
const  UserRoutes = require('./routes/User.routes')

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDb', )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



// Middleware
app.use(express.json());
app.use(session({
  secret: 'fasdkljio234jkohvsdjk',
  resave: false,
  saveUninitialized: true,
}));

  
// Use routes
app.use('/user',UserRoutes); 



















// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});