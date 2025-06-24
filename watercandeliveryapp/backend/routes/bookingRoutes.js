import express from 'express'
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, createBooking)
router.get('/my', protect, getMyBookings)
router.get('/all', protect, getAllBookings)
router.put('/:id/status', protect, updateBookingStatus)
router.delete('/:id', protect, cancelBooking)

export default router
