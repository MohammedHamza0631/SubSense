import { Link } from 'react-router-dom'
import ModalForm2 from './ModalForm2'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const NavBar = ({ setReminders, user, setUser }) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const onCloseModal = () => {
    setOpenModal(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setUser('')
    setReminders([])
    setOpenModal(false)
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between lg:justify-around px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-6'>
      <h1 className='text-lg md:text-xl font-extrabold'>
        <Link to='/'>SubSense</Link>
      </h1>
      <div className='flex items-center space-x-4'>
        {user ? (
          <>
            <ModalForm2 setReminders={setReminders} />
            <div>
              <div
                className='text-sm md:text-md font-semibold cursor-pointer'
                onClick={() => {
                  setOpenModal(true)
                }}
              >
                Logout
              </div>
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
                    <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                      Do you want to Logout?
                    </h3>
                    <div className='flex justify-center gap-4'>
                      <Button color='failure' onClick={handleLogout}>{'Yes'}</Button>
                      <Button color='gray' onClick={() => setOpenModal(false)}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </>
        ) : (
          <>
            <Link to='/login' className='text-sm md:text-md font-semibold'>
              Login
            </Link>
            <Link to='/signup' className='text-sm md:text-md font-semibold'>
              SignUp
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
