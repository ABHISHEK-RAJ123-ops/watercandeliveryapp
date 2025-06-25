// routes/productRoutes.js
import express from 'express'
import Product from '../models/Product.js'
import { protect } from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/role.js'

const router = express.Router()

// 🔐 Create Product – only accessible by merchants
router.post(
  '/',
  protect,
  authorizeRoles('merchant'),
  async (req, res) => {
    try {
      const product = await Product.create(req.body)
      res.status(201).json(product)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
)

// 🌐 Get All Products – public access
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

export default router


