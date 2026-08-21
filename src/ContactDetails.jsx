import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import db from './db.js'

function ContactDetails () {
  const [contact, setContact] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const docRef = doc(db, 'contacts', id)
    getDoc(docRef).then(docSnap => {
      if (docSnap.exists()) {
        setContact({ id: docSnap.id, ...docSnap.data() })
      }
    })
  }, [id])

  if (!contact) {
    return <p>Loading...</p>
  }

  return (
    <div className="container">
      <h1>{contact.firstName} {contact.lastName}</h1>
      <p>Email: {contact.email}</p>
      <div className="actions">
        <Link to="/">Back</Link>
        <button onClick={() => navigate(`/contacts/${id}/edit`)}>Edit</button>
      </div>
    </div>
  )
}

export default ContactDetails