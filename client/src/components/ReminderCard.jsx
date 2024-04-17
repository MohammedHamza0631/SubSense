import React from 'react'
import { useState } from 'react'
import { Card, Badge, Button } from 'flowbite-react'
import Countdown from 'react-countdown'
import axios from 'axios'
import {MdDelete} from 'react-icons/md'

const Completionist = () => <span className='text-red-600'>Time's up!</span>
const ReminderCard = ({
  id,
  reminder_title,
  end_date_time,
  handleDelete,
  setLoading
}) => {
  const [isDeleted, setIsDeleted] = useState(false)

  const DeleteReminder = async () => {
    
    setLoading(true)
    try {
      await axios.delete(
        `https://doctorxeno.pythonanywhere.com/api/reminder/${id}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`
          }
        }
      )
      setIsDeleted(true) // Hide the card after successful deletion
      handleDelete(id)
    } catch (error) {
      console.error('Error deleting reminder:', error)
      // Handle the error (e.g., display an error message)
    }
  }

  if (isDeleted) {
    return null
  }
  return (
    <div className=' w-full h-full'>
      <Card className=' rounded-2xl mx-2 border relative'>
        <div
          onClick={DeleteReminder}
          className='flex items-start justify-end px-1 pt-1 cursor-pointer'
        >
          <MdDelete className='absolute text-xl hover:text-2xl hover:text-red-600 transition-all'></MdDelete>
        </div>
        <div className='p-4'>
          <h1 className='text-lg text-center font-semibold'>
            {reminder_title}
          </h1>
          <hr className='my-1' />
          <p className='mt-3 text-center text-sm text-gray-600'>
            <Countdown date={end_date_time}>
              <Completionist />
            </Countdown>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default ReminderCard
