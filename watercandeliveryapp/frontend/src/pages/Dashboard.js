import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { token, user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '', quantity: '' })
  const [bookingForm, setBookingForm] = useState({ productId: '', quantity: 1, deliveryDate: '', deliveryAddress: '' })
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return navigate('/login')

    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/bookings/my', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBookings(res.data)
      } catch (err) {
        console.error('Failed to fetch bookings')
      }
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Failed to fetch products')
      }
    }

    fetchBookings()
    fetchProducts()
  }, [token, navigate])

  const handleProductSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/products', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setForm({ name: '', description: '', price: '', quantity: '' })
      alert('Product added')
    } catch (err) {
      alert('Error adding product')
    }
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/bookings', bookingForm, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Booking placed')
    } catch (err) {
      alert('Error placing booking')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map(b => (
            <li key={b._id}>
              Product: {b.product?.name || 'N/A'} | Quantity: {b.quantity} | Date: {new Date(b.deliveryDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      <h2>Available Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(p => (
            <li key={p._id}>
              {p.name} - ₹{p.price} ({p.description})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}

      {user?.role === 'merchant' && (
        <>
          <h3>Add Product</h3>
          <form onSubmit={handleProductSubmit}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input placeholder="Quantity" type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
            <button type="submit">Add Product</button>
          </form>
        </>
      )}

      {user?.role === 'user' && (
        <>
          <h3>Book a Product</h3>
          <form onSubmit={handleBookingSubmit}>
            <select value={bookingForm.productId} onChange={e => setBookingForm({ ...bookingForm, productId: e.target.value })}>
              <option value="">Select a product</option>
              {products.map(p => (
                <option key={p._id} value={p._id}>{p.name}</option>
              ))}
            </select>
            <input type="number" placeholder="Quantity" value={bookingForm.quantity} onChange={e => setBookingForm({ ...bookingForm, quantity: e.target.value })} />
            <input type="date" value={bookingForm.deliveryDate} onChange={e => setBookingForm({ ...bookingForm, deliveryDate: e.target.value })} />
            <input type="text" placeholder="Delivery Address" value={bookingForm.deliveryAddress} onChange={e => setBookingForm({ ...bookingForm, deliveryAddress: e.target.value })} />
            <button type="submit">Place Booking</button>
          </form>
        </>
      )}
    </div>
  )
}

