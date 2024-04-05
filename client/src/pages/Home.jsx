import React from 'react'
import { Button } from 'flowbite-react'
import ReminderCard from '../components/ReminderCard'

const Home = ({ reminders, handleReminderDelete, setLoading }) => {
  return (
    <>
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
        // <div className=' mx-0 my-10 px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4'>
        //   {reminders.map(reminder => (
        //     <ReminderCard
        //       key={reminder.id}
        //       {...reminder}
        //       handleDelete={handleReminderDelete}
        //       setLoading={setLoading}
        //     />
        //   ))}
        // </div>
        // <div className='flex items-center justify-center'>
        //   <div className='w-1/2 h-1/2 px-4 py-4 text-center bg-gray-200 rounded-lg'>
        //     <h1 className='text-3xl font-extrabold'>Welcome to SubSense</h1>
        //     <h2 className='text-2xl py-2 font-bold'>
        //       All your subscriptions in one place
        //     </h2>
        //   </div>
        //   </div>
        <div className='center-div'>
          <div className='w-full max-w-lg px-4 py-6 text-center bg-gray-200 rounded-lg'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-extrabold'>
              Welcome to SubSense
            </h1>
            <h2 className='text-lg sm:text-xl md:text-2xl font-semibold py-2'>
              All your subscriptions in one place
            </h2>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
