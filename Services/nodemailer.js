const nodemailer = require('nodemailer');
require('dotenv').config();

const USER = process.env.MAILER_USER;
const PASSWORD = process.env.MAILER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: USER,
    // pass: PASSWORD,
    user: '1',
    pass: '2',
  },
});

function sendMail(data, callback) {
  const mailOptions = {
    from: data.email,
    to: 'info@nycbiomechanics.com',
    subject: `A customer has contact you form the NYC Biomechanics website`,
    text: `• Your Name: ${data.firstName} ${data.lastName} \n • Email: ${data.email} \n • Phone: ${data.phoneNumber} \n • Message: "${data.message}"`,
  };
  console.log(mailOptions, 'mailoptions');

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback('error');
    } else {
      console.log('Email sent:', info.response);
      callback('success');
    }
  });
}

// function sendMailReply(data, callback) {
//   const mailOptions = {
//     from: `auto-reply@nycbiomechanics.com`,
//     to: `${data.email}`,
//     subject: `Thanks  so  much for contacting NYC Biomechanics website`,
//     text: `•`,
//   }
//   console.log(mailOptions, 'mailoptions')

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error)
//       callback('error')
//     } else {
//       console.log('Email sent:', info.response)
//       callback('success')
//     }
//   })
// }

function handleFormSubmission(req, res) {
  console.log('Received POST request to /api/form');
  const data = req.body;
  console.log(data, 'Processing form data...');

  console.log(req.body, 'api data');
  console.log('Received data:', data);

  res.json({ message: 'Data received successfully' });

  // Send Mail From Form
  sendMail(data, (error, response, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent:', info.response);
      res.send('success');
    }
    res.send(response); // Send response to the client
  });

  // sendMailReply(data, (error, response, info) => {
  //   if (error) {
  //     console.log(error)
  //     res.send('error')
  //   } else {
  //     console.log('Email sent:', info.response)
  //     res.send('success')
  //   }
  //   res.send(response) // Send response to the client
  // })
}

//REVIEW FORM

function sendReview(reviewData, callback) {
  const mailOptions = {
    from: reviewData.contact_email,
    to: 'info@nycbiomechanics.com',
    subject: `A Customer has just submitted review on NYC Biomechanics website`,
    text: `• Name: ${reviewData.contact_name} \n • Email: ${reviewData.contact_email} \n • Rating: ${reviewData.rating}/5 Stars \n • Message: ${reviewData.review} \n • Review ID: ${reviewData.id} "`,
  };
  console.log(mailOptions, 'mailoptions');

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback('error');
    } else {
      console.log('Email sent:', info.response);
      callback('success');
    }
  });
}

function handleReviewSubmission(req, res) {
  //console.log('Received POST request to /api/reviews')
  const reviewData = req.body;
  //console.log('Review Data:', reviewData) // Logging reviewData

  res.json({ message: 'Data received successfully' });

  // Send Mail From Review Form
  sendReview(reviewData, (error, response, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent:', info.response);
      res.send('success');
    }

    res.send(response); // Send response to the client
  });
}

//1 ON 1 TRAINING NEW CLIENT QUESTIONNAIRE
function sendSignUp(signUpData, callback) {
  const mailOptions = {
    from: signUpData.contact_email,
    to: 'info@nycbiomechanics.com',
    subject: `NEW CLIENT QUESTIONNAIRE`,
    text: `
    • Name: ${signUpData.first_name} ${signUpData.last_name} \n
    • Phone Number: ${signUpData.phoneNumber} \n
    • Email: ${signUpData.contact_email} \n
    • Age: ${signUpData.age} \n
    • Gender: ${signUpData.gender}\n
    • Occupation: ${signUpData.occupation}\n
    • Chronic Pain: ${signUpData.chronicPain}\n
    • Injury: ${signUpData.injury}\n
    • Scoliosis: ${signUpData.scoliosis}\n
    • Activities: ${signUpData.activities}\n
    • Willingness to Stop Activities Rating: ${
      signUpData.activitiesRating
    }/5 Stars\n
    • Completed FP Program: ${signUpData.FPprogram}\n
    • How They Found Us: ${signUpData.foundUs}\n
    • FP Goals: ${signUpData.goals}\n
    • Training Times: ${signUpData.tainingTimes}\n
    • Grains Eater: ${signUpData.isGrains}\n
    • Plant Eater 🌱: ${signUpData.isVegan}\n
    • Willingness to stop Eating Grains Rating: ${
      signUpData.grainRating
    }/5 Stars\n
    • Drugs ${signUpData.drugUsage} \n
    • Alcohol ${signUpData.alcoholUsage} \n
    • Fitness Professional: ${signUpData.fitnessPro}\n
    • Other Training: ${signUpData.otherTraining.join(', ')}\n
    • Nature${signUpData.nature}\n
    • Sunlight ${signUpData.sun}
  `,
  };
  console.log(mailOptions, 'mailoptions');

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      callback('error');
    } else {
      console.log('Email sent:', info.response);
      callback('success');
    }
  });
}

function handleSignUpSubmission(req, res) {
  console.log('Received POST request to /sign-up');
  const signUpData = req.body;
  console.log('Sign Data:', signUpData); // Logging reviewData

  res.json({ message: 'Data received successfully' });

  // Send Mail From 1 ON 1 TRAINING NEW CLIENT QUESTIONNAIRE //
  sendSignUp(signUpData, (error, response, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent:', info.response);
      res.send('success');
    }

    res.send(response); // Send response to the client
  });
}

module.exports = {
  sendMail,
  handleFormSubmission,
  handleReviewSubmission,
  handleSignUpSubmission,
};
