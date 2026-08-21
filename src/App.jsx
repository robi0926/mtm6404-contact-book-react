import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Contacts from './Contacts.jsx'
import ContactDetails from './ContactDetails.jsx'
import ContactNew from './ContactNew.jsx'
import ContactEdit from './ContactEdit.jsx'
import './App.css'

function Nav () {
  return (
    <nav>
      <Link to="/">Contacts</Link>
    </nav>
  )
}

function App () {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetails />} />
        <Route path="/contacts/new" element={<ContactNew />} />
        <Route path="/contacts/:id/edit" element={<ContactEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App