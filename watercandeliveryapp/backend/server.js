// server.js
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan' // Optional logging
import connectDB from './config/db.js'

// Route imports
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import productRoutes from './routes/productRoutes.js'
import invoiceRoutes from './routes/invoiceRoutes.js'

// Optional: error handling middleware
import errorHandler from './middleware/errorHandler.js'

dotenv.config()
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev')) // Logs requests to console (optional but useful)

// Root route
app.get('/', (req, res) => {
  res.send(' Water Can Delivery API is running')
})

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/products', productRoutes)
app.use('/api/invoices', invoiceRoutes)

// 404 handler for unmatched routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})

// Global error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})
