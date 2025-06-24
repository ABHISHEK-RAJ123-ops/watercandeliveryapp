import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending',
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Out for delivery', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)
