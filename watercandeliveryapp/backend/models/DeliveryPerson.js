import mongoose from 'mongoose'

const deliveryPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  assignedLocality: String,
  password: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('DeliveryPerson', deliveryPersonSchema)

