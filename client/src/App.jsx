import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import axios from 'axios'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'
function App () {
  const [reminders, setReminders] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(localStorage.getItem('authToken') || '')

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(
          'https://doctorxeno.pythonanywhere.com/api/reminder/',
          {
            headers: {
              Authorization: `Token ${user}`
            }
          }
        )
        setReminders(response.data)
      } catch (error) {
        console.error('Error fetching reminders:', error)
        // Handle the error appropriately (e.g., display an error message)
      } finally {
        setLoading(false)
      }
    }
    fetchReminders()
  }, [])

  const handleReminderDelete = reminderId => {
    setReminders(prevState =>
      prevState.filter(reminder => reminder.id !== reminderId)
    )
    setLoading(false)
  }

  return (
    <>
      <NavBar setReminders={setReminders} user={user} setUser={setUser} />
      <Routes>
        <Route
          path='/'
          element={
            loading ? (
              <div className='text-center'>
                <Spinner
                  color='info'
                  aria-label='Extra large Center-aligned Info spinner example'
                  size='xl'
                />
              </div>
            ) : (
              <Home
                reminders={reminders}
                handleReminderDelete={handleReminderDelete}
                setLoading={setLoading}
                user={user}
              />
            )
          }
        />
        <Route
          path='/login'
          element={
            <LoginPage
              setUser={setUser}
              setReminders={setReminders}
              setLoading={setLoading}
            />
          }
        />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </>
  )
}

export default App
