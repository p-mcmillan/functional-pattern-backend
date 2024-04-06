const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT

const { handleFormSubmission } = require('./Services/nodemailer')
const reviewRoutes = require('./routes/review-routes')

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin)
  next()
})

//middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cors(corsOptions))

app.post('/api/form', handleFormSubmission)
app.use('/api/reviews', reviewRoutes)

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})
