import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import db from './db.js'

function Contacts () {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('lastName'))
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = []
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() })
      })
      setContacts(data)
    })
    return () => unsubscribe()
  }, [])

  function searchHandler (e) {
    setSearch(e.target.value)
  }

  const filtered = contacts.filter(contact => {
    const full = contact.firstName + ' ' + contact.lastName
    return full.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="container">
      <div className="header">
        <h1>Contacts</h1>
        <button onClick={() => navigate('/contacts/new')}>+ New Contact</button>
      </div>
      <input
        type="text"
        placeholder="Search contacts..."
        value={search}
        onChange={searchHandler}
        className="search"
      />
      <ul className="contact-list">
        {filtered.map(contact => (
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>
              {contact.lastName}, {contact.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Contacts