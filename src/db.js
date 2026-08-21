import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDGWr24NnB_RhQ4D6x8jh6FWt_nHYSQ_wg",
  authDomain: "contact-book-44dc4.firebaseapp.com",
  projectId: "contact-book-44dc4",
  storageBucket: "contact-book-44dc4.firebasestorage.app",
  messagingSenderId: "232251364290",
  appId: "1:232251364290:web:e29bc6085f7be52dc47c5b"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db