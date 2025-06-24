import express from 'express'
import Invoice from '../models/Invoice.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Create Invoice
router.post('/', protect, async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body)
    res.status(201).json(invoice)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Get All Invoices
router.get('/', protect, async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('user booking')
    res.json(invoices)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
