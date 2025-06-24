import express from 'express'
import Product from '../models/Product.js'
import { protect } from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/role.js'

const router = express.Router()

router.post('/', protect, authorizeRoles('merchant'), async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

export default router

