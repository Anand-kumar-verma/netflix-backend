const BookMove = require("../models/BookMove");
const MovieModel = require("../models/MovieModel");
const User = require("../models/UserModel");
const { use } = require("../routes/UserRoutes");
module.exports.renderProductPage = async (req, res) => {
  console.log("inside the function");
  try {
    // res.render("product");
    return res.status(200).json({
      msg: "go to this page",
      url: "https://netflix-frontend-sigma.vercel.app/",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.getBookedMovies = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await BookMove.findOne({ email }).populate("movie");
    if (user) {
      return res.json({ msg: "success", movies: user });
    } else return res.json({ msg: "No movie added" });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addMovieFunction = async (req, res) => {
  try {
    const { image, name, genres } = req.body;
    const obj = new MovieModel({
      image,
      name,
    });
    console.log("name");
    const movie = await obj.save();
    genres?.forEach(async (element) => {
      await MovieModel.findByIdAndUpdate(
        { _id: movie._id },
        { $push: { genres: element } }
      );
    });

    if (movie) {
      return res.json({ msg: "success", movies: movie });
    } else return res.json({ msg: "Something went wrong." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.getMovieList = async (req, res) => {
  try {
    const response = await MovieModel.find({});
    if (response) {
      return res.json({ msg: "success", movies: response });
    } else return res.json({ msg: "Something went wrong." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};
module.exports.getMovieListCount = async (req, res) => {
  try {
    const response = await MovieModel.countDocuments({});
    if (response) {
      return res.json({ msg: "success", movies: response });
    } else return res.json({ msg: "Something went wrong." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};
module.exports.bookMovieForWatching = async (req, res) => {
  try {
    const { email, m_id } = req.body;
    const user = await BookMove.findOne({ email });
    if (user) {
      const respinse = await BookMove.findOneAndUpdate(
        { email },
        { $addToSet: { movie: m_id } }
      );
    } else {
      console.log("inside the else");
      const obj = new BookMove({
        email,
      });
      const response = await obj.save();
      await BookMove.findByIdAndUpdate(
        { _id: response._id },
        { $push: { movie: m_id } }
      );
    }
    return res.json({ msg: "Movie booked successfully" });
  } catch (error) {
    console.log(e);
    return res.json({ msg: "Error Movie booked successfully" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};
