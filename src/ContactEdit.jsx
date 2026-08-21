import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import db from './db.js'

function ContactEdit () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const docRef = doc(db, 'contacts', id)
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email)
      }
    })
  }, [id])

  function submitHandler (e) {
    e.preventDefault()
    const docRef = doc(db, 'contacts', id)
    updateDoc(docRef, {
      firstName,
      lastName,
      email
    }).then(() => {
      navigate(`/contacts/${id}`)
    })
  }

  function deleteHandler () {
    const docRef = doc(db, 'contacts', id)
    deleteDoc(docRef).then(() => {
      navigate('/')
    })
  }

  return (
    <div className="container">
      <h1>Edit Contact</h1>
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
        <button type="submit">Update Contact</button>
      </form>
      <button onClick={deleteHandler} className="delete">Delete Contact</button>
    </div>
  )
}

export default ContactEdit