const Razorpay = require("razorpay");
require("dotenv").config()
const renderProductPage = async(req,res)=>{

  try {
      
      res.render('product');

  } catch (error) {
      console.log(error.message);
  }

}

const createOrder = async (req, res) => {
  const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

  const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
  });
  try {
    // const amount = req.body.amount*100
    const amount = 500;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Order Created",
          order_id: order.id,
          amount: 5,
          key_id: RAZORPAY_ID_KEY,
          product_name: req.body.name,
          description: req.body.description,
          contact: "8707329034",
          name: "Anand Kumar Verma",
          email: "vermaanand278@gmail.com",
        });
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  renderProductPage,
  createOrder,
};
