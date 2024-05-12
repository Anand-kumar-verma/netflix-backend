const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  genres: {
    type: [{ type: "String" }],
  },
});

module.exports = mongoose.model("movie", movieSchema);
