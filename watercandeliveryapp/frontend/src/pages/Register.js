import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/users/register', form)
      toast.success('Registration successful')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="text" placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  )
}
