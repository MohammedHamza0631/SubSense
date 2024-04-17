// ModalForm2.jsx
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

function ModalForm2 ({ setReminders }) {
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [endDate, setEndDate] = useState(null)
  const [timeError, setTimeError] = useState(null)
  const handleSubmit = async event => {
    event.preventDefault()

    const formattedData = {
      reminder_title: title,
      end_date_time: endDate.toISOString()
    }
    console.log(formattedData)
    // Send data to backend with axios later
    try {
      setTimeError(null)
      const response = await axios.post(
        'https://doctorxeno.pythonanywhere.com/api/reminder/',
        formattedData,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`
          }
        }
      )

      setReminders(prevState => [...prevState, response.data])
      onCloseModal()
    } catch (error) {
      console.error('Error creating reminder:', error)
      if (error.response && error.response.status === 400) {
        // Specific handling for 400 errors
        const errorData = error.response.data
        if (errorData.end_date_time) {
          // Set error state for the DatePicker component
          setTimeError(errorData.end_date_time[0])
        }
      }
    }
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setTitle('')
    setEndDate(null)
  }
  return (
    <>
      <Button
        className='rounded-xl'
        color='dark'
        onClick={() => setOpenModal(true)}
      >
        Create
      </Button>
      <Modal
        dismissible
        show={openModal}
        size='md'
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='space-y-6'>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='title' value='Title' />
                </div>
                <TextInput
                  id='title'
                  type='text'
                  placeholder='Reminder Title'
                  required={true}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className='px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                />
              </div>

              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='endDate' value='End Date and Time' />
                </div>

                <DatePicker
                  id='endDate'
                  placeholderText='dd/mm/yyyy_hh:mm am/pm'
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  showTimeSelect
                  timeFormat='HH:mm'
                  timeIntervals={15}
                  minDate={new Date()}
                  timeCaption='Time'
                  dateFormat='dd/MM/yyyy h:mm aa'
                  className='border-2 border-gray-200 rounded-lg w-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent '
                />
                <p className='text-red-500 text-sm'>{timeError}</p>
              </div>

              <div className='flex justify-center w-full'>
                <Button color='dark' type='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalForm2
