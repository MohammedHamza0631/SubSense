import { Link } from 'react-router-dom'
import ModalForm from './ModalForm'
import ModalForm2 from './ModalForm2'
import { useNavigate } from 'react-router-dom'

const NavBar = ({ setReminders, user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    setUser('')
    setReminders([])
    
    navigate('/')
  }
  return (
    <div className='flex items-center justify-around px-4 py-2 md:px-6 md:py-4 lg:px-8 lg:py-6'>
      <h1 className='text-lg md:text-xl font-extrabold'>
        <Link to='/'>SubSense</Link>
      </h1>
      <div className='flex items-center space-x-4'>
        {user ? (
          <>
            <ModalForm2 setReminders={setReminders} />
            <div onClick={handleLogout}>
              <Link to='/logout' className='text-sm md:text-md font-semibold'>
                Logout
              </Link>
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
        {/* <Link to='/login' className='text-sm md:text-md font-semibold'>
          Login
        </Link>
        <Link to='/signup' className='text-sm md:text-md font-semibold'>
          SignUp
        </Link>
        <ModalForm2 setReminders={setReminders} /> */}
      </div>
    </div>
    // <div className='flex items-center justify-center gap-80 px-6 md:px-[200px] py-4 m-10'>
    //   <h1 className='text-lg md:text-xl font-extrabold'>
    //     <Link to='/'>SubSense</Link>
    //   </h1>
    //   <div className='flex items-center justify-center space-x-2 md:space-x-4'>
    //     {/* <ModalForm2 /> */}
    //     <Link to='/login' className='text-md md:text-md font-semibold'>
    //       Login
    //     </Link>
    //     <Link to='/signup' className='text-md md:text-md font-semibold'>
    //       SignUp
    //     </Link>
    //     <ModalForm2 setReminders={setReminders} />
    //   </div>
    // </div>
  )
}

export default NavBar
