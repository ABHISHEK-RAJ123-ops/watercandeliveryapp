import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'

export default function InvoiceList() {
  const { token } = useContext(AuthContext)
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/invoices', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setInvoices(res.data)
      } catch (err) {
        console.error('Error fetching invoices:', err)
      }
    }
    fetchInvoices()
  }, [token])

  return (
    <div>
      <h2>My Invoices</h2>
      <ul>
        {invoices.map(inv => (
          <li key={inv._id}>
            Amount: ₹{inv.amount} | Paid: {inv.paid ? 'Yes' : 'No'} | Date: {new Date(inv.issuedDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
