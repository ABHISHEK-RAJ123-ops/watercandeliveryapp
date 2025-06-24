import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  subject: String,
  message: String,
  status: { type: String, enum: ['Open', 'Resolved'], default: 'Open' },
}, { timestamps: true })

export default mongoose.model('Issue', issueSchema)
