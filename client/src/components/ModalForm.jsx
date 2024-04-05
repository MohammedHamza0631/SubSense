import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Datepicker } from 'flowbite-react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

function ModalForm () {
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [endDate, setEndDate] = useState(new Date())

  const handleSubmit = event => {
    event.preventDefault()

    const formattedData = {
      id: uuidv4(),
      reminder_title: title,
      end_date_time: endDate ? endDate.toISOString() : ''
    }

    console.log(formattedData)

    // Send data to backend with axios (add your logic here)
    // ... your axios code ...
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setTitle('')
    setEndDate(new Date()) // Reset to the current date
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
      <Modal show={openModal} size='md' onClose={onCloseModal} popup>
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
                  placeholder='Subscription Name'
                  required={true}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='endDate' value='End Date' />
                </div>
                <Datepicker
                  minDate={new Date()}
                  id='endDate'
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </div>

              <div>
                <Button type='submit'>Submit</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalForm
