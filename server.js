const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");
const paymentRoute = require('./routes/paymentRoute');

const app = express();

app.use(cors());
app.use(express.json());

// mongodb+srv://lovebabbar3:D7W857uJ2QOHHc5K@cluster0.c0k4xvu.mongodb.net/AuthApp
mongoose
  .connect("mongodb+srv://vermaanand278:zzGT2jlm6ONJcEeH@cluster10.w0j0ukt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster10/anand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.use('/',paymentRoute);
app.get('/hoome',(req,res)=>{
  res.status(200).json({
    msg:`<h1>This is home route</h1>`
  })
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
