import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'flowbite-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({ setUser, setReminders, setLoading }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const cursorRef = useRef(null)
  useEffect(() => {
    cursorRef.current.focus()
  }, [])

  const fetchReminders = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://doctorxeno.pythonanywhere.com/api/reminder/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`
        }
      })
      setReminders(response.data)
    } catch (error) {
      console.error('Error fetching reminders:', error)
      // Handle the error appropriately (e.g., display an error message)
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('https://doctorxeno.pythonanywhere.com/auth/login/', {
        username,
        password
      })

      if (response.status === 200) {
        const token = response.data.data.token

        localStorage.setItem('authToken', token)
        toast.success('Login successful!', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        setUser(token)
        fetchReminders()
        // Redirect to a protected page
        navigate('/')
      } else {
        throw new Error('Login Failed - Check your credentials')
      }
    } catch (error) {
      setError(error)
      if (error.response && error.response.status === 404) {
        toast.error('Invalid username or password', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
      } else {
        toast.error('An error occurred. Please try again.', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
      }
    }
  }

  return (
    <div>
      <form className='login' onSubmit={handleSubmit}>
        <h1 className='text-center mb-4 font-bold'>Login</h1>

        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          ref={cursorRef}
          required
          className='form-input'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className='form-input'
        />
        <div className='flex items-center justify-center rounded-lg'>
          <Button className='text-center' type='submit' color='dark'>
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
