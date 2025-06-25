import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function BookingForm() {
  const { token } = useContext(AuthContext)
  const [form, setForm] = useState({ product: '', quantity: 1, deliveryAddress: '', scheduledDate: '' })
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => toast.error('Failed to load products'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/bookings', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success('Booking placed!')
      setForm({ product: '', quantity: 1, deliveryAddress: '', scheduledDate: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} required>
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p._id} value={p.name}>{p.name}</option>
        ))}
      </select>
      <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" />
      <input type="text" value={form.deliveryAddress} onChange={e => setForm({ ...form, deliveryAddress: e.target.value })} placeholder="Delivery Address" />
      <input type="date" value={form.scheduledDate} onChange={e => setForm({ ...form, scheduledDate: e.target.value })} placeholder="Scheduled Date" />
      <button type="submit">Place Order</button>
    </form>
  )
}
