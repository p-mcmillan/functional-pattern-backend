// review-routes.js

const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router
  .route('/')
  .get(reviewController.allReviews)
  .post(reviewController.addReview);
router;

module.exports = router;
