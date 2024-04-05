import React from 'react'
import { useState } from 'react'
import { Card, Badge, Button } from 'flowbite-react'
import Countdown from 'react-countdown'
import axios from 'axios'

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
    console.log(`https://doctorxeno.pythonanywhere.com/api/reminder/${id}/`)
    setLoading(true)
    try {
      await axios.delete(
        `https://doctorxeno.pythonanywhere.com/api/reminder/${id}/`
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
    <div>
      <Card className='w-[230px] h-[150px] rounded-md mx-2 border'>
        <div onClick={DeleteReminder} className='relative w-fit top-1 right-1'>
          <Badge color='failure'>Delete</Badge>
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
