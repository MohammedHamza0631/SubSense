import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'flowbite-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const cursorRef = useRef(null)

  useEffect(() => {
    cursorRef.current.focus()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/signup/', {
        username,
        password
      })

      if (response.status === 201) {
        toast.success('You are now Registered. Please log in.', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
        navigate('/login')
      } else {
        throw new Error('Registration Failed')
      }
    } catch (error) {
      setError(error)
      if (error.response && error.response.status === 422) {
        toast.error('Username taken. Please try again', {
          style: {
            background: '#333',
            color: '#fff'
          }
        })
      } else {
        toast.error('Registration Failed', {
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
      <form className='register' onSubmit={handleSubmit}>
        <h1 className='text-center mb-4 font-bold'>SignUp</h1>

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
            SignUp
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage
