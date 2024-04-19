import React from 'react'
import { useState } from 'react'
import { Card, Badge, Button, Modal } from 'flowbite-react'
import Countdown from 'react-countdown'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const Completionist = () => <span className='text-red-600'>Time's up!</span>
const ReminderCard = ({
  id,
  reminder_title,
  end_date_time,
  handleDelete,
  setLoading
}) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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
      setOpenModal(false)
    } catch (error) {
      console.error('Error deleting reminder:', error)
    }
  }

  const onCloseModal = () => {
    setOpenModal(false)
  }

  if (isDeleted) {
    return null
  }

  return (
    <div>
      <Card className='w-[230px] h-[150px] rounded-2xl mx-2 border relative'>
        <div className='flex items-start justify-end px-1 pt-1 cursor-pointer'>
          <MdDelete
            onClick={() => setOpenModal(true)}
            className='absolute text-xl hover:text-2xl hover:text-red-600 transition-all'
          />

          <Modal
            show={openModal}
            dismissible={true}
            size='md'
            onClose={onCloseModal}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-zinc-400 dark:text-gray-200' />
                <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                  Do you want to delete this reminder?
                </h3>
                <div className='flex justify-center gap-4'>
                  <Button color='failure' onClick={DeleteReminder}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color='gray' onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
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
