const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  addMovieFunction,
  getMovieList,
  getMovieListCount,
  bookMovieForWatching,
  getBookedMovies,
  renderProductPage,
} = require("../controllers/UserController");

const express = require('express');
const payment_route = express();
const path = require('path');
const bodyParser = require('body-parser');
payment_route.use(bodyParser.json());
payment_route.use(bodyParser.urlencoded({ extended:false }));
const router = require("express").Router();
const paymentController = require('../controllers/paymentController');

router.get("/liked/:email", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.post("/add-movie", addMovieFunction);
router.get("/get-movie", getMovieList);
router.get("/get-movie-count", getMovieListCount);
router.post("/bookMovieForWatching", bookMovieForWatching);
router.post("/getBookedMovies", getBookedMovies);
router.get("/product",renderProductPage);



payment_route.set('view engine','ejs');
payment_route.set('views',path.join(__dirname, '../views'));


payment_route.get('/product', paymentController.renderProductPage);
payment_route.post('/createOrder', paymentController.createOrder);

module.exports = router;
