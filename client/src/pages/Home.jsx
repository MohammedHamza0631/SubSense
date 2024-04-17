import React from 'react'
import { Button } from 'flowbite-react'
import ReminderCard from '../components/ReminderCard'
import { Link } from 'react-router-dom'

const Home = ({ reminders, user, handleReminderDelete, setLoading }) => {
  if (!user) {
    return (
      <div className='center-div'>
        <div className='w-full max-w-lg px-4 py-6 text-center bg-gray-200 rounded-lg'>
          <h1 className='font-bold text-3xl'>Welcome to SubSense</h1>
          <h2 className='text-lg sm:text-xl md:text-2xl font-semibold py-2'>
            Please{' '}
            <Link to='/login' className='text-blue-500'>
              Login
            </Link>{' '}
            or{' '}
            <Link to='/signup' className='text-blue-500'>
              Signup
            </Link>{' '}
            to add reminders
          </h2>
        </div>
      </div>
    )
  } else {
    // User is logged in
    return (
      <>
        {/* // Display the reminders if there are any */}
        {reminders.length > 0 ? (
          <div className='mx-2 sm:mx-4 md:mx-8 lg:mx-12 my-4 sm:my-6 md:my-8 lg:my-10 center-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8'>
            {reminders.map(reminder => (
              <ReminderCard
                key={reminder.id}
                {...reminder}
                handleDelete={handleReminderDelete}
                setLoading={setLoading}
              />
            ))}
          </div>
        ) : (
          // If there are no reminders, display a message
          <div className='center-div'>
            <div className='w-full max-w-lg px-4 py-6 text-center bg-gray-200 rounded-lg'>
              <h2 className='text-lg sm:text-xl md:text-2xl font-semibold py-2'>
                No reminders found. Please add a reminder
              </h2>
              
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Home
