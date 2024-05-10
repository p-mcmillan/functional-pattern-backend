// reviewControler.js

const knex = require('knex')(require('../knexfile'));
const { handleReviewSubmission } = require('../Services/nodemailer');
const { v4: uuidv4 } = require('uuid');

//GET ALL REVIEWSF
const allReviews = (_request, response) => {
  knex('reviews')
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) =>
      response.status(400).send(`Error retrieving Users: ${error}`)
    );
};

//ADD NEW REVIEW
// const addReview = (req, res) => {
//   //validation that all things exist in request
//   if (
//     !req.body.contact_name ||
//     !req.body.contact_email ||
//     !req.body.rating ||
//     !req.body.review
//   ) {
//     return res
//       .status(400)
//       .send(
//         'Please make sure to provide all review information in your request'
//       );
//   }
//   //require valid email address
//   if (
//     !req.body.contact_email.includes('@') ||
//     !req.body.contact_email.includes('.')
//   ) {
//     return res.status(400).send('Please include a valid email');
//   }

//   const id = uuidv4(); // Generate a UUID for the review

//   const rating = parseInt(req.body.rating);

//   // Prepare the review object to insert into the database
//   const reviewData = {
//     id: id,
//     contact_name: req.body.contact_name,
//     contact_email: req.body.contact_email,
//     rating: req.body.rating,
//     review: req.body.review,
//   };

//   console.log(
//     reviewData,
//     'Prepare the review object to insert into the database'
//   );

//   // INSERT NEW REVIEW INTO DATABASE
//   knex('reviews')
//     .insert(reviewData)
//     .then(() => {
//       console.log('Review data inserted successfully:', reviewData);
//       res.status(201).send({ id, ...req.body });

//       // Now that reviewData is defined, call handleReviewSubmission
//       handleReviewSubmission(reviewData);
//     })
//     .catch((err) => {
//       console.error('Error inserting review data:', err);
//       // Detailed error message including the error code, message, and stack trace
//       res
//         .status(500)
//         .send(
//           `Error creating review: ${err.code} - ${err.message}\n${err.stack}`
//         );
//     });
//   next();
// };

const addReview = (req, res, next) => {
  // Validation that all required fields exist in the request
  if (
    !req.body.contact_name ||
    !req.body.contact_email ||
    !req.body.rating ||
    !req.body.review
  ) {
    return res
      .status(400)
      .send(
        'Please make sure to provide all review information in your request'
      );
  }

  // Validate email address format
  if (
    !req.body.contact_email.includes('@') ||
    !req.body.contact_email.includes('.')
  ) {
    return res.status(400).send('Please include a valid email');
  }

  const id = uuidv4(); // Generate a UUID for the review
  const rating = parseInt(req.body.rating);

  // Prepare the review object to insert into the database
  const reviewData = {
    id: id,
    contact_name: req.body.contact_name,
    contact_email: req.body.contact_email,
    rating: req.body.rating,
    review: req.body.review,
  };

  console.log(
    reviewData,
    'Prepare the review object to insert into the database'
  );

  // INSERT NEW REVIEW INTO DATABASE
  knex('reviews')
    .insert(reviewData)
    .then(() => {
      console.log('Review data inserted successfully:', reviewData);
      res.status(201).send({ id, ...req.body });

      // Now that reviewData is defined, call handleReviewSubmission
      handleReviewSubmission(reviewData);
    })
    .catch((err) => {
      console.error('Error inserting review data:', err);
      // Detailed error message including the error code, message, and stack trace
      res
        .status(500)
        .send(
          `Error creating review: ${err.code} - ${err.message}\n${err.stack}`
        );
    });
};

module.exports = {
  allReviews,
  addReview,
};
