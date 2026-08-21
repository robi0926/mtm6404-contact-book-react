import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import db from './db.js'

function ContactNew () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function submitHandler (e) {
    e.preventDefault()
    addDoc(collection(db, 'contacts'), {
      firstName,
      lastName,
      email
    }).then(docRef => {
      navigate(`/contacts/${docRef.id}`)
    })
  }

  return (
    <div className="container">
      <h1>New Contact</h1>
      <form onSubmit={submitHandler} className="form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default ContactNew