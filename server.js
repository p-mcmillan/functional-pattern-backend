// server.js

const express = require('express')
const helmet = require('helmet')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 9929

const { handleFormSubmission, handleReviewSubmission } = require('./Services/nodemailer')
const reviewRoutes = require('./routes/review-routes')

const corsOptions = {
  origin: 'https://www.nycbiomechanics.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Real-IP', 'X-Forwarded-For', 'X-Forwarded-Proto'],
  credentials: true,
}

app.use((req, res, next) => {
  console.log('Request Method:', req.method)
  console.log('Request URL:', req.url)
  console.log('Request Headers:', req.headers)
  console.log('Request Body:', req.body)
  next()
})

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin)
  next()
})
//middleware
app.use(express.static('public'))
app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

//Node Mailer//
app.post('/form', handleFormSubmission)
app.post('/reviews', handleReviewSubmission)

//DB//
app.use('/reviews', cors(corsOptions), reviewRoutes)
//app.use('/reviews', reviewRoutes, (req, res) => {})

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})
