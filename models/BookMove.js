const mongoose = require("mongoose");

const bookedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  movie: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
    },
  ],
});

module.exports = mongoose.model("booked", bookedSchema);
