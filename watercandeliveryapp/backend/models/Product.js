import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: Number,
  price: { type: Number, required: true },
  image: String,
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
