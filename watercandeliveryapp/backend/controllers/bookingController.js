import Booking from '../models/Booking.js'

// @desc    Create a new booking (User)
// @route   POST /api/bookings
// @access  Private (User)
export const createBooking = async (req, res) => {
  try {
    const { product, quantity, deliveryAddress, scheduledDate } = req.body

    const booking = new Booking({
      user: req.user.id,
      product,
      quantity,
      deliveryAddress,
      scheduledDate,
    })

    const savedBooking = await booking.save()
    res.status(201).json(savedBooking)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
// @access  Private (User)
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all bookings (for admin/merchant)
// @route   GET /api/bookings/all
// @access  Private (Merchant/Admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email')
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update booking delivery or payment status
// @route   PUT /api/bookings/:id/status
// @access  Private (Merchant/Delivery)
export const updateBookingStatus = async (req, res) => {
  try {
    const { deliveryStatus, paymentStatus } = req.body
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    if (deliveryStatus) booking.deliveryStatus = deliveryStatus
    if (paymentStatus) booking.paymentStatus = paymentStatus

    const updated = await booking.save()
    res.json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private (User or Admin)
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    booking.deliveryStatus = 'Cancelled'
    await booking.save()

    res.json({ message: 'Booking cancelled' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
