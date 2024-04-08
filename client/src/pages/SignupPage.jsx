import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'flowbite-react'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const cursorRef = useRef(null)

  useEffect(() => {
    cursorRef.current.focus()
  }, [])

  return (
    <div>
      <form className='register'>
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
