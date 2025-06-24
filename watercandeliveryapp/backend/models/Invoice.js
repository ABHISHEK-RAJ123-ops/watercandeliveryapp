import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  issuedDate: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model('Invoice', invoiceSchema) 
