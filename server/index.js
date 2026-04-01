require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const productRoutes = require('./routes/products')
const collectionRoutes = require('./routes/collections')
const orderRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blog')
const searchRoutes = require('./routes/search')
const contactRoutes = require('./routes/contact')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/collections', collectionRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/contact', contactRoutes)

app.use(errorHandler)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    )
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
